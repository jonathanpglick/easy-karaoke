

export function trackPage() {
  var gtagUA = (window.hasOwnProperty('gtagUA')) ? window.gtagUA : '';
  track('config', gtagUA, {'page_path': String(window.location)});
}

export function trackEvent() {
  track.apply(null, arguments);
}

export function track() {
  if (typeof gtag == 'function') {
    gtag.apply(null, arguments);
  }
  else {
    console.log.apply(null, arguments);
  }
}

