// Events
function loadEvents() {
  var eventsDoc = 'https://docs.google.com/spreadsheets/d/1Wc7hkoh0T32zDRtcJIVGw1pKqTjHASAlj92vz6Qz5zs/pubhtml';

  $(document).ready(function() {
    Tabletop.init( { key: eventsDoc,
                     callback: showEvents,
                     parseNumbers: false } );
  });

  function showEvents(data, tabletop) {
    var source = $("#events-template").html();
    var template = Handlebars.compile(source);

    $.each( tabletop.sheets("Form").all(), function(i, detail) {
      var html = template(detail);
      $("#events").append(html);
    });

    $(".loading-events").hide();
  };
};

// Projects
function loadProjects() {
  var projectsDoc = 'https://docs.google.com/spreadsheets/d/1HJBxoYSVZyPrMuXLa5rrk0_5FcMUA9I48B6gltXpbA4/pubhtml';

  $(document).ready(function() {
    Tabletop.init( { key: projectsDoc,
                     callback: showProjects,
                     parseNumbers: false } );
  });

  function showProjects(data, tabletop) {
    var source = $("#projects-template").html();
    var template = Handlebars.compile(source);

    $.each( tabletop.sheets("Form").all(), function(i, detail) {
      var html = template(detail);
      $("#projects").append(html);
    });

    $(".loading-projects").hide();
  };
};

loadEvents();
loadProjects();