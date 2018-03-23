function loadProjects() {
  var projectsDoc = 'https://docs.google.com/spreadsheets/d/1HJBxoYSVZyPrMuXLa5rrk0_5FcMUA9I48B6gltXpbA4/pubhtml';

  $(document).ready(function() {
    Tabletop.init({
      key: projectsDoc,
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

    $('#search-projects').hideseek({
      highlight: true,
      ignore_accents: true,
      nodata: 'No projects found'
    });

  };
};

loadProjects();