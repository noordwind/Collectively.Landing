$(function() {

  var $header = $("[data-component=header]");
  var $window = $(window);
  $window.on("scroll", function() {
    if ($window.scrollTop() > 5) {
      $header.addClass("visible");
    } else {
      $header.removeClass("visible");
    }
  });


  $("[data-role=scroll-to-link]").click(function(e) {
    e.preventDefault();
    $.scrollTo($(e.currentTarget).attr("href"), 300, {
      offset: {
        top: -40
      }
    });
  });

});
