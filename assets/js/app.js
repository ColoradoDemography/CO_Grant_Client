var selectgeonum = '';
var $input;

var placedata;

$.getJSON("../CO_FS_Data_PHP/geopts.json", function(data) {
    placedata = data;
});

$(document).ready(function() {


    $('#datetimepicker6').datetimepicker({
        format: 'YYYY-MM-DD',
      defaultDate: "2010-01-01"
    });
    $('#datetimepicker7').datetimepicker({
        format: 'YYYY-MM-DD',
        defaultDate: "2016-01-01"
    });
    $("#datetimepicker6").on("dp.change", function(e) {
        $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker7").on("dp.change", function(e) {
        $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
    });


    $('#pfilter').multiselect();
    $('#cfilter').multiselect();
    $('#lfilter').multiselect();





}); //end document ready





function send(type) {
  
    var programs, counties, lgids, startdate, enddate;

  
  //programs
        var aprograms = [];
        $('#pfilter option:selected').each(function(index, brand){
            aprograms.push([$(this).val()]);
        });
        programs=aprograms.join(",")
  
  //counties
        var acounties = [];
        $('#cfilter option:selected').each(function(index, brand){
            acounties.push([$(this).val()]);
        });
        counties=acounties.join(",")
  
  //lgids
        var algids = [];
        $('#lfilter option:selected').each(function(index, brand){
            algids.push([$(this).val()]);
        });
        lgids=algids.join(",")

  
        function parseDate(datetoparse){
          
          var parsedDate = datetoparse.split("-");
          console.log(parsedDate);
          var year=parsedDate[0];
          var month=parsedDate[1];
          var day=parsedDate[2];
          
          function text_mo(totext){
            if(totext='01'){return 'JAN';}
            if(totext='02'){return 'FEB';}
            if(totext='03'){return 'MAR';}
            if(totext='04'){return 'APR';}
            if(totext='05'){return 'MAY';}
            if(totext='06'){return 'JUN';}
            if(totext='07'){return 'JUL';}
            if(totext='08'){return 'AUG';}
            if(totext='09'){return 'SEP';}
            if(totext='10'){return 'OCT';}
            if(totext='11'){return 'NOV';}
            if(totext='12'){return 'DEC';}
          }
          
          
          return day + "-" + text_mo(month) + "-" + year;
        }
        
  //startdate
  startdate = parseDate($("#datetimepicker6").data('date'));
  
  //enddate
  enddate = parseDate($("#datetimepicker7").data('date'));

  
    //send to demog.php
    console.log('http://red-meteor-147235.nitrousapp.com:4000/gather?' + 'start=' + startdate + '&end=' + enddate + '&program=' + programs + '&county=' + counties + '&lgid=' + lgids);

window.location.href = 'http://red-meteor-147235.nitrousapp.com:4000/gather?' + 'start=' + startdate + '&end=' + enddate + '&program=' + programs + '&county=' + counties + '&lgid=' + lgids;
  
}