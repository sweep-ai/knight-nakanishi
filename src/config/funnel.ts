export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.sweepai.site";

export const FUNNEL_ID =
  import.meta.env.VITE_FUNNEL_ID || "f648cbee-0d37-4464-a0a5-3c8b349644d4";

export const GHL_BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/booking/oHvLoFT0GF89AbUm91OG";

export const FORM_ID = "root-quiz";

export const APPLICANT_STORAGE_KEY = "knight_applicant";

/** Names must match the Sweep OS Steps tab exactly. */
export const funnelEvent = {
  quizPageView: "quiz_page_view",
  quizStart: "quiz_start",
  formSubmit: "form_submit",
  bookingPageView: "booking_page_view",
  callBooked: "call_booked",
  postBookingView: "post_booking_view",
  quizStep: (n: number) => `quiz_step_${n}`,
} as const;
