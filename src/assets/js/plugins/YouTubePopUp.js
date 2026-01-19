!function (o) {
  o.fn.YouTubePopUp = function (e) {
    var u = o.extend({ autoplay: 1 }, e);

    o(this).on("click", function (e) {
      var a = o(this).attr("href");
      var p, t;

      // Detect YouTube URL
      if (a.match(/(youtube.com)/)) {
        p = "v=";
        t = 1;
      }

      // Detect youtu.be or numeric Vimeo
      if (a.match(/(youtu.be)/) || a.match(/(vimeo.com\/)+[0-9]/)) {
        p = "/";
        t = 3;
      }

      // Detect alphabetic Vimeo URLs
      if (a.match(/(vimeo.com\/)+[a-zA-Z]/)) {
        p = "/";
        t = 5;
      }

      var i = a.split(p)[t].replace(/(&)+(.*)/, "");

      // Create embed URLs
      var c;
      if (a.match(/(youtu.be)/) || a.match(/(youtube.com)/)) {
        c = "https://www.youtube.com/embed/" + i + "?autoplay=" + u.autoplay;
      }

      if (a.match(/(vimeo.com\/)+[0-9]/) || a.match(/(vimeo.com\/)+[a-zA-Z]/)) {
        c = "https://player.vimeo.com/video/" + i + "?autoplay=" + u.autoplay;
      }

      // Append popup HTML
      o("body").append(
        '<div class="YouTubePopUp-Wrap YouTubePopUp-animation">' +
        '<div class="YouTubePopUp-Content">' +
        '<span class="YouTubePopUp-Close"></span>' +
        '<iframe src="' + c + '" allowfullscreen></iframe>' +
        '</div>' +
        '</div>'
      );

      // Remove animation class
      if (o(".YouTubePopUp-Wrap").hasClass("YouTubePopUp-animation")) {
        setTimeout(function () {
          o(".YouTubePopUp-Wrap").removeClass("YouTubePopUp-animation");
        }, 600);
      }

      // Close popup
      o(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click(function () {
        o(".YouTubePopUp-Wrap")
          .addClass("YouTubePopUp-Hide")
          .delay(515)
          .queue(function () {
            o(this).remove();
          });
      });

      e.preventDefault();
    });

    // Close on ESC key
    o(document).keyup(function (e) {
      if (e.keyCode == 27) {
        o(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click();
      }
    });
  };
}(jQuery);
