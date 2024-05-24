document.addEventListener('DOMContentLoaded', (event) => {
  var popup = document.getElementById('popupLayer');
//   var openBtn = document.getElementById('openPopupBtn');
  var closeBtn = document.getElementById('closePopupBtn');

  // Function to set a cookie
  function setCookie(name, value, days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Function to get a cookie
  function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
  }

  // Function to check the current date
  function isAfterCutoffDate() {
      var cutoffDate = new Date('2024-05-25T16:00:00');
      var now = new Date();
      return now >= cutoffDate;
  }

  closeBtn.onclick = function() {
      popup.style.display = 'none';
      setCookie('popupClosed', 'true', 7); // Cookie expires in 7 days
  }

  window.onclick = function(event) {
      if (event.target == popup) {
          popup.style.display = 'none';
      }
  }

  setTimeout(() => { 
    // Check if the cookie is set or if the current date is after the cutoff date
    if (getCookie('popupClosed') !== 'true' && !isAfterCutoffDate()) {
        popup.style.display = 'block';
    }
  }, 1000);
});