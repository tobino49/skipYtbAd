console.log('skipAds loaded')

function waitYtbAdSkipButton() {
  return new Promise((resolve, reject) => {
    const maxAttempts = 30;
    const interval = 100;
    let attempts = 0;

    function checkElement() {
      attempts++;

      const adSkipButton = document.querySelector('.ytp-ad-skip-button');
      if (adSkipButton) {
        resolve(adSkipButton);
      } else if (attempts < maxAttempts) {
        setTimeout(checkElement, interval);
      } else {
        reject();
      }
    }

    checkElement();
  });
}

async function skipAd(video) {
  video.currentTime = video.duration;
  const adSkipButton = await waitYtbAdSkipButton();
  if(adSkipButton) {
    adSkipButton.click();
  }
  console.log('ad skiped');
}

function detectContainer() {
  const container = document.querySelector('#container.style-scope.ytd-player');
  const video = container.querySelector('video');

  skipAd(video);
}

window.addEventListener('adAppeared', detectContainer);