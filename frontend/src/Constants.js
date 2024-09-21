export default Object.freeze({
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
  GOOGLE_OAUTH_CLIENT_ID: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_RECAPTCHA_SITE_KEY: process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY,
  GET_TRACKER_STATS: "/api/tracker/",
  DOWNLOAD_HTML_TRACKER: "/api/download/html/",
  DOWNLOAD_PDF_TRACKER: "/api/download/pdf/",
  CREATE_TRACKER: "/api/tracker",
});
