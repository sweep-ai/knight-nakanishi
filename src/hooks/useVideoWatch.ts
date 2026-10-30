import { useEffect, type RefObject } from "react";
import { getSessionId, trackEvent } from "@/lib/sweep";

const PREFIX = "video";
const HEARTBEAT_SEC = 15;
const MILESTONES = [25, 50, 75, 90, 100];

type WatchState = {
  started: boolean;
  ended: boolean;
  reached: Record<string, boolean>;
  watchedSeconds: number;
  lastHeartbeat: number;
};

const emptyState = (): WatchState => ({
  started: false,
  ended: false,
  reached: {},
  watchedSeconds: 0,
  lastHeartbeat: 0,
});

function loadState(key: string): WatchState {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) return { ...emptyState(), ...JSON.parse(raw) };
  } catch {
    /* ignore broken storage */
  }
  return emptyState();
}

function saveState(key: string, state: WatchState) {
  try {
    sessionStorage.setItem(key, JSON.stringify(state));
  } catch {
    /* private mode */
  }
}

function videoSrc(video: HTMLVideoElement): string {
  const source = video.querySelector("source");
  return video.currentSrc || source?.src || video.src || "";
}

/**
 * Sweep watch-time tracker for a native video element.
 * Events match the guide snippet: video_play, video_pause, video_25/50/75/90/100,
 * video_watch_heartbeat, video_complete. Posts through /api/sweep-event and
 * reuses this funnel's visitor and session ids.
 */
export function useVideoWatch(videoRef: RefObject<HTMLVideoElement | null>, enabled = true, index = 0) {
  useEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    if (!video) return;

    const src = videoSrc(video);
    const sessionId = getSessionId();
    const stateKey = `sweep_vt_${sessionId}_${src || index}`;
    const state = loadState(stateKey);
    let lastTime = video.currentTime || 0;

    const percentComplete = () => {
      if (!video.duration || Number.isNaN(video.duration)) return 0;
      return Math.min(100, Math.round((video.currentTime / video.duration) * 100));
    };

    const payload = (extra: Record<string, unknown> = {}) => ({
      video_src: src,
      video_index: index,
      current_time: Math.round(video.currentTime * 10) / 10,
      duration: video.duration || null,
      percent: percentComplete(),
      watched_seconds: Math.round(state.watchedSeconds * 10) / 10,
      ...extra,
    });

    const send = (eventName: string, metadata: Record<string, unknown>) => {
      void trackEvent(eventName, metadata, undefined, { keepalive: true });
    };

    const onPlay = () => {
      if (state.started) return;
      state.started = true;
      saveState(stateKey, state);
      send(`${PREFIX}_play`, payload());
    };

    const onPause = () => {
      if (!video.ended) send(`${PREFIX}_pause`, payload());
    };

    const onTime = () => {
      const t = video.currentTime;
      const delta = t - lastTime;
      if (!video.paused && delta > 0 && delta < 1.5) state.watchedSeconds += delta;
      lastTime = t;

      const pct = percentComplete();
      let dirty = false;
      for (const milestone of MILESTONES) {
        if (pct >= milestone && !state.reached[milestone]) {
          state.reached[milestone] = true;
          dirty = true;
          send(`${PREFIX}_${milestone}`, payload());
        }
      }
      if (state.watchedSeconds - state.lastHeartbeat >= HEARTBEAT_SEC) {
        state.lastHeartbeat = state.watchedSeconds;
        dirty = true;
        send(`${PREFIX}_watch_heartbeat`, payload());
      }
      if (dirty) saveState(stateKey, state);
    };

    const onEnded = () => {
      if (state.ended) return;
      state.ended = true;
      saveState(stateKey, state);
      send(`${PREFIX}_complete`, payload());
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnded);

    if (!video.paused && !state.started) onPlay();

    return () => {
      saveState(stateKey, state);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnded);
    };
  }, [videoRef, enabled, index]);
}
