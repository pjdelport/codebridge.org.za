// Events
function loadEvents() {
  var eventsDoc = 'https://docs.google.com/spreadsheets/d/1Wc7hkoh0T32zDRtcJIVGw1pKqTjHASAlj92vz6Qz5zs/pubhtml';

  $(document).ready(function() {
    Tabletop.init( { key: eventsDoc,
                     callback: showEvents,
                     orderby: 'order',
                     parseNumbers: false } );
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

    $("#events .col-item.approved").each(function() {
      $(this).append( "<p>"+ $(this).index() +"</p>" )
      console.log( $(this).index() );
      if ( $(this).index() < 4 ) {
        $(this).addClass("visible");
      }
    });
  };

};

// Projects
function loadProjects() {
  var projectsDoc = 'https://docs.google.com/spreadsheets/d/1HJBxoYSVZyPrMuXLa5rrk0_5FcMUA9I48B6gltXpbA4/pubhtml';

  $(document).ready(function() {
    Tabletop.init( { key: projectsDoc,
                     callback: showProjects,
                     orderby: 'order',
                     parseNumbers: false } );
  });

  function showProjects(data, tabletop) {
    var source = $("#projects-template").html();
    var template = Handlebars.compile(source);

    $.each( tabletop.sheets("Projects").all(), function(i, detail) {
      var html = template(detail);
      $("#projects").append(html);
    });

    $("#projects .col-item.approved").each(function() {
      if ( $(this).index() < 4 ) {
        $(this).addClass("visible");
      }
    });
  };
};

loadEvents();
loadProjects();