const urlChangeEvent = new CustomEvent("urlchange", {
  bubbles: true, // Permet la propagation de l'événement dans le DOM
  cancelable: true // Permet d'annuler l'événement si nécessaire
});

let previousURL = window.location.href;
function checkURLChange() {
  const currentURL = window.location.href;
  if (currentURL !== previousURL) {
    // L'URL entière a changé, déclenchez l'événement personnalisé "urlchange"
    window.dispatchEvent(urlChangeEvent);
    // Mettez à jour la variable pour stocker la version précédente de l'URL
    previousURL = currentURL;
  }
}

setInterval(checkURLChange, 1000);