var contentDoc = 'https://docs.google.com/spreadsheets/d/1Wc7hkoh0T32zDRtcJIVGw1pKqTjHASAlj92vz6Qz5zs/pubhtml';
var eventDoc = 'https://04ii3d6qql.execute-api.us-east-1.amazonaws.com/default/meetup-api';

// People
function loadPeople() {
  $(document).ready(function() {
    Tabletop.init({
      key: contentDoc,
      wanted: ["People"],
      orderby: 'municipality',
      callback: showPeople,
    });
  });

  function showPeople(data, tabletop) {
    var source = $("#people-template").html();
    var template = Handlebars.compile(source);

    var allPeople = data.People.elements;
    var cities = [];

    $(allPeople).each(function() {
      cities.push(this.Municipality);
    })

    $("#people-count").text(data.People.elements.length);

    var uniqueCities = $.uniqueSort(cities);

    $(uniqueCities).each(function() {
      $("#people").append("<div class='city-list' city-list='" + this + "'><h2>" + this + "</h2></div>")
    })

    $.each( tabletop.sheets("People").all(), function(i, detail) {
      var html = template(detail);
      $("#people").append(html);
    });

    $("#people .person.approved").each(function() {
      $(this).addClass("visible");
      var personCity = $(this).attr("city");
      $(this).detach().appendTo("div[city-list='" + personCity + "']");
    });

    $("#loading-people").hide();
  };
};

// Events
function loadEvents() {

  $.getJSON(eventDoc, function(data) {
    var source = $("#events-template").html();
    var template = Handlebars.compile(source);

    for (eventDetail of data) {
      var html = template(eventDetail);
      $("#events").append(html);
    }
  });

  $("#loading-events").hide();

};

// Projects
function loadProjects() {
  $(document).ready(function() {
    Tabletop.init({
      key: contentDoc,
      wanted: ["Projects"],
      callback: showProjects,
      orderby: 'featured',
      parseNumbers: false
    });
  });

  function showProjects(data, tabletop) {
    var source = $("#projects-template").html();
    var template = Handlebars.compile(source);

    $("#project-count").text(data.Projects.elements.length);

    $.each( tabletop.sheets("Projects").all(), function(i, detail) {
      var html = template(detail);
      $("#projects").append(html);
    });

    $("#loading-projects").hide();
  };
};

// Tutorials
function loadTutorials() {
  $(document).ready(function() {
    Tabletop.init({
      key: contentDoc,
      wanted: ["Tutorials"],
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

    $("#loading-tutorials").hide();

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

loadPeople();
loadEvents();
loadProjects();
loadTutorials();