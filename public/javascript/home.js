// Userlist data array for filling in info box
//var dboard = require('dashboardenv');
var userListData = [];
var dt;
// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  // populateTask();

  $(document).on('click', '.gang-name', function() {
    if ($(this).hasClass("collapsed")) {
      $(this).nextUntil('tr.gang-name')
        .find('td')
        .show();
      $(this).nextUntil('tr.gang-name')
        .find('td').parent().css("display", "");
      $(this).removeClass("collapsed");
    } else {
      $(this).nextUntil('tr.gang-name')
        .find('td')
        .hide();
      $(this).addClass("collapsed");
    }
  });

});

function buildParam() {
  // var table = $('#tasklist').DataTable();
  var pageJson = new Object();

  if (dt) {
  var info = dt.page.info();
  pageJson.pageNumber=info.page+1;
  pageJson.rowsPerPage=info.length;
} else {
  pageJson.pageNumber=1;
  pageJson.rowsPerPage=10;
}
console.log(JSON.stringify(pageJson));
return pageJson;
}


$(document).ready(function() {
  console.log("here3");

 dt= $('#tasklist').DataTable( {
    "ajax": {
        url: env.getUrl('dboard/tlist'),
        //very important , obtain data from a property in the source object.
        //make it empty if it is a plain array of data, not array of object
        dataSrc : "taskList",
        type: "POST",
        data:  function ( json ) {  return JSON.stringify( buildParam() );},
        crossDomain: true,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        "processData": true,
    },
    "processing": true,
    "serverSide": true,
    "ordering": false,
    "searching": true,
    "destroy" : true,
    "columns": [
        {
              "class": "details-control",
              "orderable": false,
              "data": null,
              "defaultContent": ""
        },
        { "data": "name" },
        { "data": "createDate" },
        { "data": "status" }
    ]
} );
  // $('#tasklist').dataTable( {
  //      "processing": true,
  //      "serverSide": true,
  //      "ajax": {
  //     dataSrc : "",
  //      "url": env.getUrl('dboard/list'),
  //      "dataType": "jsonp"
  //      },
  //      "columns": [
  //        { "data": "name"},
  //        { "data": "createDate"},
  //        { "data": "status"},
  //        { "data": "status"}
  //      ]
  //  } );
} );



// function populateTask() {
//   console.log("env.getUrl('dboard/list')" + env.getUrl('dboard/list'));
//   var data;
//   $.getJSON(env.getUrl('dboard/list'), function(data) {
//      dt=$('#tasklist').DataTable({
//       data: data,
//       ServerSide: true,
//       'sAjaxSource': env.getUrl('dboard/list'),
//       columns: [{
//         "class": "details-control",
//         "orderable": false,
//         "data": null,
//         "defaultContent": ""
//       }, {
//         data: 'name'
//       }, {
//         data: 'createDate'
//       }, {
//         data: 'status'
//       }],
//        "order": [[1, 'asc']]
//     });
//   });
//
// }


var detailRows = [];

$('#tasklist tbody').on( 'click', 'tr td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = dt.row( tr );
    var idx = $.inArray( tr.attr('id'), detailRows );

    if ( row.child.isShown() ) {
        tr.removeClass( 'details' );
        row.child.hide();

        // Remove from the 'open' array
        detailRows.splice( idx, 1 );
    }
    else {
        tr.addClass( 'details' );
        row.child( format( row.data() ) ).show();

        // Add to the 'open' array
        if ( idx === -1 ) {
            detailRows.push( tr.attr('id') );
        }
    }
} );

// On each draw, loop over the `detailRows` array and show any child rows
dt.on( 'draw', function () {
    $.each( detailRows, function ( i, id ) {
        $('#'+id+' td.details-control').trigger( 'click' );
    } );
} );


      // Functions =============================================================

      // Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';
  console.log(env.getUrl('dboard/list'));
  // jQuery AJAX call for JSON
  $.getJSON(env.getUrl('dboard/list'), function(data) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function() {
          tableContent += '<tr class=\'gang-name\'>';
          tableContent += '<td>' + this.name + '</td>';
          tableContent += '<td>' + this.createDate + '</td>';
          tableContent += '<td>' + this.status + '</td>';
          tableContent += '</tr>';

          tableContent += '<tr class=\'members a\' style=\'display:none;\'>';
          tableContent += '<td colspan=\'3\'>' + this.status + '</td>';
          tableContent += '</tr>';
        });

          $("#tasklist tbody").append(tableContent);
          // Inject the whole content string into our existing HTML table
          //        $('#tasklist table tbody').html(tableContent);
        });
        //    $('#tasklist tbody tr td').each(function() {
        //    	alert("hereree")
        //        if ($(this).text() == "my task1") {
        //            $(this).parent().addClass("gang-name");
        //        }
        //    });
      };

function format ( d ) {
          return 'Full name: '+d.name+' '+d.status+'<br>'+
              'Salary: '+d.status+'<br>'+
              'The child row can contain any data you wish, including links, images, inner tables etc.';
}
