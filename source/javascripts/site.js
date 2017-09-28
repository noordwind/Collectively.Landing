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


  // contact form
  $("[data-component=contact-form]").on("submit", function(e) {
    e.preventDefault();

    var $form = $(e.currentTarget);
    var $inputs = $form.find("input, textarea");
    var translations = $form.data("translations");

    $inputs.on("change keyup", function(e) {
      $(e.currentTarget).closest(".input").removeClass("with-errors");
    });

    function findInput(attr) {
       return $inputs.filter("[name=" + attr + "]");
    }

    function addError(attr, error) {
      valid = false;
      var $el = findInput(attr).closest(".input");
      $el.addClass("with-errors");
      $el.find(".errors").text(error);
    }

    function setState(state) {
      $form.removeClass("state-loading state-success state-failure");
      if (state) {
        $form.addClass("state-" + state);
      }
    }

    var data = {
      name: $.trim(findInput("name").val()),
      email: $.trim(findInput("email").val()),
      message: $.trim(findInput("message").val())
    };

    var valid = true;

    if (!data.email || data.email.length === 0) {
      addError("email", translations.presence);
    } else if (!data.email.match(/^[^@]+@[^@]+$/)) {
      addError("email", translations.email);
    }
    if (!data.message || data.message.length === 0) {
      addError("message", translations.presence);
    }

    if (valid) {
      $inputs.attr("disabled", true);
      setState("loading");
      $.post($form.attr("action"), data, function() {
        setState("success");
        $inputs.val("");
        setTimeout(setState, 5000);
      }).fail(function(e) {
        var status = e.status === 202 ? "success" : "failure";
        if (status === "success") {
          $inputs.val("");
        }
        setState(status);
        setTimeout(setState, 5000);
      }).always(function() {
        $inputs.attr("disabled", false);
      });
    }
  });
});
