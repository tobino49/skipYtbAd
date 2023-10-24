document.addEventListener('DOMContentLoaded', function() {
  const toggleExtensionButton = document.getElementById('toggleExtensionButton');

  toggleExtensionButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({ toggleExtension: true });
    window.close();
  });
});