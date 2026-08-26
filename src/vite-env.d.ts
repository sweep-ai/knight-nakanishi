/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_FUNNEL_ID?: string;
  readonly VITE_QUIZ_SHEET_WEB_APP_URL?: string;
  readonly VITE_ZAPIER_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
