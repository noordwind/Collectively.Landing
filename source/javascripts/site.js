$(function() {

  // sticky header
  var $header = $("[data-component=header]");
  var $window = $(window);
  $window.on("scroll", function() {
    if ($window.scrollTop() > 5) {
      $header.addClass("visible");
    } else {
      $header.removeClass("visible");
    }
  });


  // animated scroll to
  $("[data-role=scroll-to-link]").click(function(e) {
    e.preventDefault();
    $.scrollTo($(e.currentTarget).attr("href"), 300, {
      offset: {
        top: -40
      }
    });
  });


  // high dppx image substitutions
  var queryMatch = window.matchMedia && window.matchMedia("(min-resolution: 144dpi)");
  if (queryMatch && queryMatch.matches) {
    $("[data-2x-src]").each(function(i, el) {
      $(el).attr("src", $(el).data("2x-src"));
    });
  }
});
