var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1sN95ta5lfqeznMRJxx6F8Uub5BB-03t5W6VsIgS_9j0/pubhtml';

$(document).ready( function() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   parseNumbers: true } );
});
  
function showInfo(data, tabletop) {
  var source   = $("#details").html();
  var template = Handlebars.compile(source);

  $.each( tabletop.sheets("Details").all(), function(i, detail) {
    var html = template(detail);
    $("#content").append(html);
  });

  $(".loading").hide();
}

$(document).ready( function() {
  $("#filters :checkbox").prop("checked", false);
  $("#showAll").prop("checked", true);
  $("#filters :checkbox").not("#showAll").click(function() {
    $("#showAll").prop("checked", false);
  });
  $("#filters #showAll").click(function() {
    $("#filters :checkbox").not("#showAll").prop("checked", false);
  });
  $("#filters :checkbox").click(function() {
    $(".well").hide();
    $("#filters :checkbox:checked").each(function() {
      $("." + $(this).val()).show();
    });
  });
});