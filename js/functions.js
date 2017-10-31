var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1sN95ta5lfqeznMRJxx6F8Uub5BB-03t5W6VsIgS_9j0/pubhtml';

$(document).ready(function() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   parseNumbers: true } );
});
  
function showInfo(data, tabletop) {
  var source = $("#details").html();
  var template = Handlebars.compile(source);

  $.each( tabletop.sheets("Details").all(), function(i, detail) {
    var html = template(detail);
    $("#content").append(html);
  });

  $(".loading").hide();
}

$(document).ready(function() {
  var visibleItems = [];
  $("#filter input").prop("checked", false);
  $("#province-filter .show-all").prop("checked", true);
  $("#province-filter :checkbox").not(".show-all").click(function() {
    $(".show-all").prop("checked", false);
  });
  $("#province-filter .show-all").click(function() {
    $("#province-filter :checkbox").not(".show-all").prop("checked", false);
  });
  $("#filter input").change(function () {
    visibleItems = $("#filter input:checked").map(function (i) {
      return $(this).val();
    }).get();
    if (visibleItems.length > 0) {
      $(".single-item").hide();
      $("." + visibleItems.join('.')).show();
      console.log(visibleItems.length);
    }
    else {
      $(".single-item").hide();
    }
  });
});
