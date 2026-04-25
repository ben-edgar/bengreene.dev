/**
 * Google Apps Script webhook for the feedback form.
 *
 * Public-safe: this file does not include deployment URLs, spreadsheet IDs, or
 * notification email addresses. To enable email notifications, set an Apps
 * Script property named NOTIFICATION_EMAIL.
 *
 * The site reads /feedback?app=... and sends app in the JSON body. This script
 * also accepts e.parameter.app so the web app URL can include ?app=... directly.
 */

var DEFAULT_APP = 'dadtrack';
var MOMTRACK_APP = 'momtrack';
var NOTIFICATION_EMAIL_PROPERTY = 'NOTIFICATION_EMAIL';

function doPost(e) {
  try {
    var data = parseSubmissionData_(e);
    var app = getSubmissionApp_(data, e);
    var timestamp = new Date();

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow(buildFeedbackRow_(timestamp, data, app));

    sendFeedbackNotification_(data, timestamp, app);

    return jsonResponse_({
      success: true,
      message: 'Form submitted successfully',
    });
  } catch (error) {
    return jsonResponse_({
      success: false,
      message: 'Error: ' + error.toString(),
    });
  }
}

function parseSubmissionData_(e) {
  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }

  return (e && e.parameter) || {};
}

function getSubmissionApp_(data, e) {
  if (data && data.app) {
    return parseApp_(data.app);
  }

  return parseApp_(e && e.parameter && e.parameter.app);
}

function parseApp_(app) {
  var normalized = String(app || '').trim().toLowerCase();

  if (normalized === MOMTRACK_APP) {
    return MOMTRACK_APP;
  }

  return DEFAULT_APP;
}

function buildFeedbackRow_(timestamp, data, app) {
  return [
    timestamp,
    data.name || '',
    data.email || '',
    data.comment || '',
    data.platform || '',
    'feedback',
    app,
  ];
}

function sendFeedbackNotification_(data, timestamp, app) {
  var notificationEmail = getNotificationEmail_();

  if (!notificationEmail) {
    return;
  }

  var notification = buildFeedbackNotification_(data, timestamp, app);
  MailApp.sendEmail(notificationEmail, notification.subject, notification.message);
}

function getNotificationEmail_() {
  if (typeof PropertiesService === 'undefined') {
    return '';
  }

  return (
    PropertiesService.getScriptProperties().getProperty(
      NOTIFICATION_EMAIL_PROPERTY,
    ) || ''
  );
}

function buildFeedbackNotification_(data, timestamp, app) {
  var appName = getAppName_(app);

  return {
    subject: 'New ' + appName + ' Feedback Received',
    message:
      'Someone just left feedback for ' + appName + '!\n\n' +
      'Name: ' + (data.name || 'N/A') + '\n' +
      'Email: ' + (data.email || 'N/A') + '\n' +
      'Feedback: ' + (data.comment || 'No feedback provided') + '\n' +
      'Platform: ' + (data.platform || 'N/A') + '\n' +
      'App: ' + appName + '\n\n' +
      'Submitted at: ' + timestamp.toString(),
  };
}

function getAppName_(app) {
  return app === MOMTRACK_APP ? 'MomTrack' : 'DadTrack';
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

if (typeof module !== 'undefined') {
  module.exports = {
    doPost: doPost,
    buildFeedbackNotification_: buildFeedbackNotification_,
    buildFeedbackRow_: buildFeedbackRow_,
    getSubmissionApp_: getSubmissionApp_,
  };
}
