$(function() {
  var $header = $("[data-component=header]");
  var $window = $(window);
  $window.on("scroll", function() {
    if ($window.scrollTop() > 5) {
      $header.addClass("visible");
    } else {
      $header.removeClass("visible");
    }
  })
});
