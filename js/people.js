var contentDoc = 'https://docs.google.com/spreadsheets/d/1Wc7hkoh0T32zDRtcJIVGw1pKqTjHASAlj92vz6Qz5zs/pubhtml';

function loadPeople() {
  $(document).ready(function() {
    Tabletop.init({
      key: contentDoc,
      wanted: ["People"],
      callback: showPeople,
      orderby: 'title',
      parseNumbers: false
    });
  });

  function showPeople(data, tabletop) {
    var source = $("#people-template").html();
    var template = Handlebars.compile(source);

    $.each( tabletop.sheets("People").all(), function(i, detail) {
      var html = template(detail);
      $("#people").append(html);
    });

    $("#search-people").hideseek({
      highlight: true,
      ignore_accents: true,
      nodata: 'No people found'
    });

    $(".people-content .loading").hide();
    $(".search-box").show();
    $(".list-actions").show();

  };
};

loadPeople();