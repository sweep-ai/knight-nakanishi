// Google Apps Script Web App URL (deploy your sheet script as "Web app" and paste the URL here).
// Leave empty to skip sending quiz data to the sheet.
// Example: "https://script.google.com/macros/s/AKfycbx.../exec"
export const QUIZ_SHEET_WEB_APP_URL =
  (typeof import.meta !== "undefined" && (import.meta as unknown as { env?: { VITE_QUIZ_SHEET_WEB_APP_URL?: string } }).env?.VITE_QUIZ_SHEET_WEB_APP_URL) ||
  "";
