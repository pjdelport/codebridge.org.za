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

  $(".single-entry").each(function() {
    if ( $(this).hasClass("organisation") ) {
      $(".type i", this).addClass("fa-building-o")
    } else {
      $(".type i", this).addClass("fa-user-circle")
    }
  });
}

$(document).ready(function() {
  var visibleItems = [];
  $("#filter input").prop("checked", false);

  $("#province-filter .show-all").prop("checked", true);
  $("#type-filter .show-all").prop("checked", true);

  $(".clear-all-button").click(function() {
    $("input.show-all").click();
    $("input:checkbox").each(function(){
      if ( $(this).is(":checked") ) {
        $(this).click();
      }
    });
  });

  $("#filter input").change(function () {
    $(".single-entry").removeClass("active");

    if ($(".only-open:checked") ) {
      $(".single-entry.closed").removeClass("active");
    }

    if ( $("#topic-filter input:checked").length == 0) {
      $(".single-entry").addClass("active");
    } else {
      $("#topic-filter input:checked").each(function() {
        $(".single-entry." + $(this).val()).addClass("active");
      });
    }
    var provinces = ["easterncape","freestate","gauteng","kwazulu-natal","limpopo","mpumalanga","northwest","northerncape","westerncape"];
    var type = ["organisation", "individual"];

    var selectedProvince = $("#province-filter input:checked").val();
    var indexProvince = provinces.indexOf(selectedProvince);
    if (indexProvince >= 0 && selectedProvince != "all-provinces") {
      provinces.splice(indexProvince, 1);
    }

    if (selectedProvince != "all-provinces") {
      $(provinces).each(function() {
        $(".single-entry." + this).removeClass("active");
      });
    }

    var selectedType = $("#type-filter input:checked").val();

    var indexType = type.indexOf(selectedType);
    if (indexType >= 0 && selectedType != "all-type") {
      type.splice(indexType, 1);
    }

    if (selectedType != "all-type") {
      $(type).each(function() {
        $(".single-entry." + this).removeClass("active");
      });
    }

    // number of visible iteams
    $(".visible-count").show();
    $(".visible-count .number-active").text( $(".single-entry.active").length );

    // indication of which filters are used
    $(".filter-used .province").html("");
    $(".filter-used .type").html("");
    $(".filter-used .topic").html("");
    
    $("#province-filter label").each(function() {
      if ( $("input", this).is(":checked") ) {
        $("<div class='single-filter' province='" + $("input", this).val() + "'>" + $(this).text() + "<i class='fa fa-times' aria-hidden='true'></i></div>").appendTo(".filter-used .province");
      }
    });

    $("#type-filter label").each(function() {
      if ( $("input", this).is(":checked") ) {
        $("<div class='single-filter' type='" + $("input", this).val() + "'>" + $(this).text() + "<i class='fa fa-times' aria-hidden='true'></i></div>").appendTo(".filter-used .type");
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

    $(".filter-used .province .single-filter").click(function() {
      $("#province-filter input.show-all").click();
    });

    $(".filter-used .type .single-filter").click(function() {
      $("#type-filter input.show-all").click();
    });

    $(".filter-used .topic .single-filter").click(function() {
      var selectedFilter = $(this).attr("topic");
      $('#filter :input[value="' + selectedFilter + '"]').click();
    });

    $(".single-filter").each(function(){
      if ( $(this).attr("province") == "all-provinces" || $(this).attr("type") == "all-type" ) {
        $("i", this).remove();
        $(this).addClass("all");
      }
    });

    if ($("input.only-open").is(":checked") ) {
      $(".single-entry.closed").removeClass("active");
    }
  });
});
