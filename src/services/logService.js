import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://fd834fa9713e477e8a958229ca3a43ad@sentry.io/1391641"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
