console.log('skipAds loaded')
skipAd();

function waitForVideoLoad(video) {
  return new Promise(function(resolve) {
    if (video.readyState >= 4) { // La valeur 4 indique que la vidéo est prête à être lue
      console.log('Vidéo chargée');
      resolve();
    } else {
      window.setTimeout(function () {
        waitForDocumentLoad().then(resolve)
      }, 100);
    }
  });
}

function waitForDocumentLoad() {
  return new Promise(async function(resolve) {
    if (document.readyState === "complete") {
      console.log('Document loaded');
      const video = document.querySelector('video');
      await waitForVideoLoad(video);
      resolve();
    } else {
      console.log('Document loading...');
      window.setTimeout(function () {
        waitForDocumentLoad().then(resolve)
      }, 100);
    }
  });
}

function isYoutubeVideoPage(url){
  return url.includes('youtube.com/watch');
}

async function isAnAd(){
  await waitForDocumentLoad();
  return document.querySelector('.ytp-ad-visit-advertiser-button');
}

async function skipAd(){
  if (!isYoutubeVideoPage(window.location.href))
    return

  console.log('Nouvelle vidéo dectée');
  if (await isAnAd()) {
    await waitForDocumentLoad();
    console.log('publicité détectée');
    const container = document.querySelector('#container.style-scope.ytd-player');
    console.log(container);
    if (container) {
      const video = container.querySelector('video');
      video.currentTime+=video.duration;
    };
  }
}

window.addEventListener("urlchange", function(e) {
  console.log('Changement d\'Url');
  skipAd();
});