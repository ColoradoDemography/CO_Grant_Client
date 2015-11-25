

var selectgeonum='';
var $input;      
      
$(document).ready(function() {
  

  $input = $('.typeahead');
  
  $input.typeahead({source: typeaheadplacedata, 
                  autoSelect: true,
                    minLength: 3}); 
  

  //below is prob useless?
  $input.change(function() {

    var current = $input.typeahead("getActive");
             selectgeonum = (current.id);
    if (current) {
        // Some item from your model is active!
        if (current.name == $input.val()) {
            // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
                       selectgeonum = (current.id);
        } else {
            // This means it is only a partial match, you can either add a new item 
            // or take the active if you don't want new items
                       selectgeonum = (current.id);
        }
    } else {
        // Nothing is active so it is a new value (or maybe empty value)
    }
  });
  
  
  //initial setup
  $('#sumlev').val('state');
  $('#statesel').val('8');  
  $('#dataset').val('acs0913');  
  $('#tableSearch').val('');  
  $('#checkmoe').prop('checked', false);  
  
  $('.dontshow').hide();
  
  //load acs0913 tables into box
  loadtables('acs0913','data');
  
  
  //setup events
  $( "#sumlev" ).on( "change", function() {

    if($( this ).val()=='state'){ $('.dontshow').hide();}
    if($( this ).val()=='county'){ $('.dontshow').show();}
    if($( this ).val()=='place'){ $('.dontshow').show();}   
    if($( this ).val()=='tract'){ $('.dontshow').show();}
    if($( this ).val()=='bg'){ $('.dontshow').show();}       
    
});  //end sumlev on change 

  $( "#dataset" ).on( "change", function() {
  $('#tables').empty();

    
    if($(this).val()=='acs0913'){
      loadtables('acs0913','data');
    }
    
    if($(this).val()=='acs0812'){
      loadtables('acs0812','data');
    }
    
    if($(this).val()=='c2010'){
      loadtables('c2010','data');
    }
    
    if($(this).val()=='c2000'){
      loadtables('c2000','sf1');
      loadtables('c2000','sf3');      
    }
    
    if($(this).val()=='c1990'){
      loadtables('c1990','sf1');
      loadtables('c1990','sf3');      
    }
    
    if($(this).val()=='c1980'){
      loadtables('c1980','sf1');
      loadtables('c1980','sf3');      
    }
                      
});  //end dataset on change
  
  $( "#tableSearch" ).on( "keyup", function() {
    
    $( ".toptions" ).each(function( index ) {
      if(($( this ).text().toLowerCase().indexOf($( "#tableSearch" ).val().toLowerCase()))< 0){$( this ).prop('disabled',true);}else{$( this ).prop('disabled',false);}
    });  
  
}); //end table search on key up
  
  }); //end document ready
      
      
      
          function loadtables(db, schema){

             $.ajax({
          url: "meta.php?db="+db+"&schema="+schema,
          dataType: 'json',
          success: showdata
          }); 
      
      function showdata(data){
        
        var showschema='';
        if(db=='c1980'){showschema=schema+" - ";}
        if(db=='c1990'){showschema=schema+" - ";}
        if(db=='c2000'){showschema=schema+" - ";}
        
        var dropdowntables="";
        for(i=0;i<data.length;i++){
          dropdowntables=dropdowntables+"<option class='toptions' >"+showschema+data[i].table_id+": "+data[i].table_title+"</option>";
          
        }
        $('#tables').append(dropdowntables);
      }

    }; //end loadtables

      
      function send(type, api){
        var table, schema, res, subsplit, sumlev, geonum; 

        //if havent selected a table yet
        if($('select[id=tables]').val()==null){alert('Please select a table!'); return 0;}
        
        //sumlev
        var geodescription = $('#sumlev').val();
        if(geodescription=='state'){sumlev='40';}
        if(geodescription=='county'){sumlev='50';}
        if(geodescription=='place'){sumlev='160';}
        if(geodescription=='tract'){sumlev='140';}
        if(geodescription=='bg'){sumlev='150';}        
        
        //selected state
        var state = '&state=' + $('#statesel').val();
        if(geodescription=='state'){state='';} //choosing 1 state is disabled
        
        //dataset
        var dataset = $('#dataset').val();
        
        //selected table text
        var tablestring=$('select[id=tables]').val();
        
        //check for moe checkbox
        var moe='';
        if($('#checkmoe').is(':checked')){moe='&moe=yes';}
        
        if($input.val()==''){geonum='';}else{if(selectgeonum!==''){geonum='&geonum='+selectgeonum}}
        
        //parse option text to get schema and table information
        if(dataset=='c1980' || dataset=='c1990' || dataset=='c2000'){
          
          res = tablestring.split(" - ");
          schema = res[0];

          subsplit=res[1].split(":");
          table=subsplit[0];
          
        }else{
          
          schema='data';
        
          res = tablestring.split(":");
          table=res[0];

        }
        
       //send to demog.php
        window.location.href = api+'.php?limit=99999&db='+dataset+'&schema='+schema+'&table='+table+'&sumlev='+sumlev+'&type='+type+moe+state+geonum;
                
        
      }
     