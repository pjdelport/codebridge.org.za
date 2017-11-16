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
  $(".single-entry").addClass("active");
}

$(document).ready(function() {
  var visibleItems = [];
  $("#filter input").prop("checked", false);

  $("#province-filter .show-all").prop("checked", true);
  $("#collaboration-filter .show-all").prop("checked", true);

  $("#filter input").change(function () {
    $(".single-entry").removeClass("active");
    if ( $("#topic-filter input:checked").length == 0) {
      $(".single-entry").addClass("active");
    } else {
      $("#topic-filter input:checked").each(function() {
        $(".single-entry." + $(this).val()).addClass("active");
      });
    }

    var provinces = ["easterncape","freestate","gauteng","kwazulu-natal","limpopo","mpumalanga","northwest","northerncape","westerncape"];
    var collaboration = ["open", "closed"];

    var selectedProvince = $("#province-filter input:checked").val();
    var indexProvince = provinces.indexOf(selectedProvince);
    if (indexProvince >= 0 && selectedProvince != "all-collaboration") {
      provinces.splice(indexProvince, 1);
    }

    if (selectedProvince != "all-provinces") {
      $(provinces).each(function() {
        $(".single-entry." + this).removeClass("active");
      });
    }

    var selectedCollaboration = $("#collaboration-filter input:checked").val();

    var indexCollaboration = collaboration.indexOf(selectedCollaboration);
    if (indexCollaboration >= 0 && selectedCollaboration != "all-collaboration") {
      collaboration.splice(indexCollaboration, 1);
    }

    if (selectedCollaboration != "all-collaboration") {
      $(collaboration).each(function() {
        $(".single-entry." + this).removeClass("active");
      });
    }

    // number of visible iteams
    $(".visible-count").show();
    $(".visible-count .number-active").text( $(".single-entry.active").length );

    // indication of which filters are used
    $(".filter-used .province").html("");
    $(".filter-used .collaboration").html("");
    $(".filter-used .topic").html("");
    
    $("#province-filter label").each(function() {
      if ( $("input", this).is(":checked") ) {
        $("<div class='single-filter' province='" + $("input", this).val() + "'>" + $(this).text() + "<i class='fa fa-times' aria-hidden='true'></i></div>").appendTo(".filter-used .province");
      }
    });

    $("#collaboration-filter label").each(function() {
      if ( $("input", this).is(":checked") ) {
        $("<div class='single-filter' collaboration='" + $("input", this).val() + "'>" + $(this).text() + "<i class='fa fa-times' aria-hidden='true'></i></div>").appendTo(".filter-used .collaboration");
      }
    });

    $("#topic-filter label").each(function() {
      if ( $("input", this).is(":checked") ) {
        $("<div class='single-filter' topic='" + $("input", this).val() + "'>" + $(this).text() + "<i class='fa fa-times' aria-hidden='true'></i></div>").appendTo(".filter-used .topic");
      }
    });

    if ( $("#topic-filter input:checked").length == 0 ) {
      $("<div class='single-filter all' topic='all-topics'>Any topic</div>").appendTo(".filter-used .topic");
    };

    $(".filter-used .province .single-filter").click( function() {
      $("#province-filter input.show-all").click();
    });

    $(".filter-used .collaboration .single-filter").click( function() {
      $("#collaboration-filter input.show-all").click();
    });

    $(".filter-used .topic .single-filter").click( function() {
      var selectedFilter = $(this).attr("topic");
      $('#filter :input[value="' + selectedFilter + '"]').click();
    });

    $(".single-filter").each(function(){
      if ( $(this).attr("province") == "all-provinces" || $(this).attr("collaboration") == "all-collaboration" ) {
        $("i", this).remove();
        $(this).addClass("all");
      }
    });  
  });
});
