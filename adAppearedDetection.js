const adAppearedEvent = new CustomEvent('adAppeared');

let adHasBeenDetected  = false;

function checkAdAppeared() {
  const adButton = document.querySelector('.ytp-ad-visit-advertiser-button');
  if (adButton && !adHasBeenDetected) {
    adHasBeenDetected = true;
    window.dispatchEvent(adAppearedEvent);
  }
  else if (!adButton && adHasBeenDetected){
    adHasBeenDetected = false;
  }
}

setInterval(checkAdAppeared, 1000);