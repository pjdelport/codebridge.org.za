var contentDoc = 'https://docs.google.com/spreadsheets/d/1Wc7hkoh0T32zDRtcJIVGw1pKqTjHASAlj92vz6Qz5zs/pubhtml';

function loadProjects() {
  $(document).ready(function() {
    Tabletop.init({
      key: contentDoc,
      callback: showProjects,
      parseNumbers: false
    });
  });

  function showProjects(data, tabletop) {
    var source = $("#projects-template").html();
    var template = Handlebars.compile(source);

    $.each( tabletop.sheets("Projects").all(), function(i, detail) {
      var html = template(detail);
      $("#projects").append(html);
    });

    $("#search-projects").hideseek({
      highlight: true,
      ignore_accents: true,
      nodata: 'No projects found'
    });

    $(".content .loading").hide();
    $(".search-box").show();

  };
};

loadProjects();