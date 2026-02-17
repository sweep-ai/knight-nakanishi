/**
 * Google Apps Script: Quiz submissions → Google Sheet
 *
 * SETUP:
 * 1. Open your sheet: https://docs.google.com/spreadsheets/d/1IzT65DmboYrgP48zXpyOKKS9m_qB9sVWlErr1ciw5UE/edit
 * 2. Extensions → Apps Script. Replace any code with this file.
 * 3. Add a first row with headers: Timestamp | Name | Email | Phone | Goal | Experience | Biggest Challenge
 * 4. Deploy: Deploy → New deployment → Type: Web app
 *    - Execute as: Me | Who has access: Anyone
 * 5. Copy the Web app URL and add it to your funnel .env as:
 *    VITE_QUIZ_SHEET_WEB_APP_URL=https://script.google.com/macros/s/.../exec
 */

var SPREADSHEET_ID = "1IzT65DmboYrgP48zXpyOKKS9m_qB9sVWlErr1ciw5UE";
var SHEET_NAME = "Sheet1"; // change if your tab has another name

function doPost(e) {
  var result = { success: false, error: null };
  try {
    var body = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : null;
    if (!body || typeof body.name !== "string" || typeof body.email !== "string" || typeof body.phone !== "string") {
      result.error = "Missing name, email, or phone";
      return jsonResponse(result);
    }

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    var row = [
      new Date(),
      (body.name || "").toString().trim(),
      (body.email || "").toString().trim(),
      (body.phone || "").toString().trim(),
      (body.goal || "").toString().trim(),
      (body.experience || "").toString().trim(),
      (body.biggestChallenge || "").toString().trim()
    ];
    sheet.appendRow(row);
    result.success = true;
    return jsonResponse(result);
  } catch (err) {
    result.error = err.toString();
    return jsonResponse(result);
  }
}

function doGet(e) {
  return jsonResponse({ message: "Use POST to submit quiz data." });
}

function doOptions() {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(corsHeaders());
}

function jsonResponse(obj) {
  var headers = corsHeaders();
  headers["Content-Type"] = "application/json";
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
