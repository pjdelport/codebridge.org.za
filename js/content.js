// Events
function loadEvents() {
  var eventsDoc = 'https://docs.google.com/spreadsheets/d/1Wc7hkoh0T32zDRtcJIVGw1pKqTjHASAlj92vz6Qz5zs/pubhtml';

  $(document).ready(function() {
    Tabletop.init({
      key: eventsDoc,
      callback: showEvents,
      orderby: 'featured',
      parseNumbers: false
    });
  });

  function showEvents(data, tabletop) {
    var source = $("#events-template").html();
    var template = Handlebars.compile(source);

    $.each( tabletop.sheets("Events").all(), function(i, detail) {
      var html = template(detail);
      $("#events").append(html);
    });

    $("time.time").each(function() {
      var time = $(this).text();
      cleanTime = time.trim().slice(0, -3);
      $(this).text(cleanTime);
    });

    $("#events .col-item").each(function() {
      var eventDate = $(this).find("time.date").text(),
          eventTime = $(this).find("time.start").text(),
          fullDate = (eventDate.trim() + " " + eventTime.trim()),
          parsedDate = Date.parse(fullDate),
          now = Date.now();
      if (parsedDate < now) {
        $(this).remove();
      };
    });


    $("#events .col-item.approved").each(function() {
      if ( $(this).index() < 6 ) {
        $(this).addClass("visible");
      }
    });

  };

};

// Projects
function loadProjects() {
  var projectsDoc = 'https://docs.google.com/spreadsheets/d/1HJBxoYSVZyPrMuXLa5rrk0_5FcMUA9I48B6gltXpbA4/pubhtml';

  $(document).ready(function() {
    Tabletop.init({
      key: projectsDoc,
      callback: showNewProjects,
      orderby: 'featured',
      parseNumbers: false
    });
  });

  function showNewProjects(data, tabletop) {
    var source = $("#new-projects-template").html();
    var template = Handlebars.compile(source);

    $.each( tabletop.sheets("Projects").all(), function(i, detail) {
      var html = template(detail);
      $("#new-projects").append(html);
    });

    $("#new-projects .col-item.approved").each(function() {
      if ( $(this).index() < 6 ) {
        $(this).addClass("visible");
      }
    });
  };

  $(document).ready(function() {
    Tabletop.init({
      key: projectsDoc,
      callback: showRunningProjects,
      orderby: 'featured',
      parseNumbers: false
    });
  });

  function showRunningProjects(data, tabletop) {
    var source = $("#running-projects-template").html();
    var template = Handlebars.compile(source);

    $.each( tabletop.sheets("Projects").all(), function(i, detail) {
      var html = template(detail);
      $("#running-projects").append(html);
    });

    $("#running-projects .col-item.approved").each(function() {
      if ( $(this).index() < 6 ) {
        $(this).addClass("visible");
      }
    });
  };
};

// Tutorials
function loadTutorials() {
  var tutorialsDoc = 'https://docs.google.com/spreadsheets/d/1k3B8vgoYOUqrMwxUaGgCFIPua6gRBoraBQwdQlStMLc/pubhtml';

  $(document).ready(function() {
    Tabletop.init({
      key: tutorialsDoc,
      callback: showTutorials,
      orderby: 'featured',
      parseNumbers: false
    });
  });

  function showTutorials(data, tabletop) {
    var source = $("#tutorials-template").html();
    var template = Handlebars.compile(source);

    $.each( tabletop.sheets("Tutorials").all(), function(i, detail) {
      var html = template(detail);
      $("#tutorials").append(html);
    });

    $("#tutorials .col-item.approved").each(function() {
      if ( $(this).index() < 6 ) {
        $(this).addClass("visible");
      }
    });

    // Find all YouTube videos
    var $allVideos = $("iframe[src^='//www.youtube.com']"),

        // The element that is fluid width
        $fluidEl = $("body");

    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {

      $(this)
        .data('aspectRatio', this.height / this.width)

        // and remove the hard coded width/height
        .removeAttr('height')
        .removeAttr('width');

    });

    // When the window is resized
    $(window).resize(function() {

      var newWidth = $fluidEl.width();

      // Resize all videos according to their own aspect ratio
      $allVideos.each(function() {

        var $el = $(this);
        $el
          .width(newWidth)
          .height(newWidth * $el.data('aspectRatio'));

      });

    // Kick off one resize to fix all videos on page load
    }).resize();
  };
};

loadEvents();
loadProjects();
loadTutorials();