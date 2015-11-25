var selectgeonum = '';
var $input;

var placedata;

$.getJSON("../CO_FS_Data_PHP/geopts.json", function(data) {
    placedata = data;
});

$(document).ready(function() {


    $('#datetimepicker6').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#datetimepicker7').datetimepicker({
        format: 'YYYY-MM-DD',
        useCurrent: false //Important! See issue #1075
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





function send(type, api) {
    var table, schema, res, subsplit, sumlev, geonum;


    //sumlev
    var geodescription = $('#sumlev').val();
    if (geodescription == 'state') {
        sumlev = '40';
    }
    if (geodescription == 'county') {
        sumlev = '50';
    }
    if (geodescription == 'place') {
        sumlev = '160';
    }
    if (geodescription == 'tract') {
        sumlev = '140';
    }
    if (geodescription == 'bg') {
        sumlev = '150';
    }

    //selected state
    var state = '&state=' + $('#statesel').val();
    if (geodescription == 'state') {
        state = '';
    } //choosing 1 state is disabled

    //dataset
    var dataset = $('#dataset').val();

    //selected table text
    var tablestring = $('select[id=tables]').val();

    //check for moe checkbox
    var moe = '';
    if ($('#checkmoe').is(':checked')) {
        moe = '&moe=yes';
    }

    if ($input.val() == '') {
        geonum = '';
    } else {
        if (selectgeonum !== '') {
            geonum = '&geonum=' + selectgeonum
        }
    } 

    //parse option text to get schema and table information
    if (dataset == 'c1980' || dataset == 'c1990' || dataset == 'c2000') {

        res = tablestring.split(" - ");
        schema = res[0];

        subsplit = res[1].split(":");
        table = subsplit[0];

    } else {

        schema = 'data';

        res = tablestring.split(":");
        table = res[0];

    }

    //send to demog.php
    console.log(window.location.href = api + '.php?limit=99999&db=' + dataset + '&schema=' + schema + '&table=' + table + '&sumlev=' + sumlev + '&type=' + type + moe + state + geonum);


}