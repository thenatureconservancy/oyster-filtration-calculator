var OysterApp = {
  initMap: function() {
   L.mapbox.accessToken = 'pk.eyJ1IjoiZG1hamthIiwiYSI6IlNuSHVNb0UifQ.zIkArM4rtyvdtMZjZEesBA';
    map = L.mapbox.map('map', 'dmajka.m431fjbc').setView([40.68, -97.63], 4);

    var markers = L.mapbox.featureLayer()
        .loadURL('./data/oyster_2016_01_25.geojson')
        .addTo(map);
        markers.on('ready', function(layer) {
          addPopups();
          changeMarkerColor();
        });   

    function addPopups() {
      markers.eachLayer(function(layer) {
          var pt = layer.feature.properties;
          var ptid = pt.id;
          var content = '<div class="popup"><div class="projectname"><h2>'+pt.noaaname+', '+pt.state+'<\/h2></div>' +
          '<button type="button" id='+"'"+pt.id+"'"+ 'class="btn btn-primary map-load-data" data-toggle="modal" data-target="#map-modal">Use this site</button>'+
          '</div>';
          layer.bindPopup(content); 
      }); 
    }

    function changeMarkerColor() {
      markers.eachLayer(function(layer) {
        layer.setIcon(L.mapbox.marker.icon({'marker-color': '#d06740', 'marker-symbol': 'star', 'marker-size': 'small'}));    
        });   
    }
  },

  loadSite: function(){
    map.on('popupopen', function(e) {
      var markerInfo2 = e.popup._source.feature.properties;
      var markerInfo = $.extend({}, markerInfo2);
      // console.log(markerInfo);
      // console.log(e);
        // ractive.set('goalData', ractive.get('goalReset'));
      $('#map').on('click', '#'+markerInfo.id, function() {
        if (ractive.get('siteType') === 'existing') {
          //console.log(markerInfo);
          ractive.set('activeSite', null);                  
          ractive.set('activeSite', markerInfo);
          ractive.set('activeSite.bayresidencetime_d_historic', markerInfo['bayresidencetime_d']);
          ractive.set('activeSite.tsummeravg_historic', markerInfo['tsummeravg']);
          ractive.set('goalData', null);
          ractive.set('goalData.goalfiltrationprcnt', 50);        
          ractive.set('goalData.goalculllength', 0);
          ractive.set('goalData.goalmarketlength', 0); 
          ractive.set('goalData.goalculldensity', 0);
          ractive.set('goalData.goalmarketdensity', 0);          
        } else if (ractive.get('siteType') === 'custom') {
          ractive.set('activeSite', null);
          //ractive.set('activeSite', ractive.get('activeReset'));
          ractive.set('activeSite.length2massequation', markerInfo.length2massequation);          
          ractive.set('activeSite.length2massrefname', markerInfo.length2massrefname);
          ractive.set('activeSite.length2massreferencefull', markerInfo.length2massreferencefull);          
          ractive.set('activeSite.ecoregion', markerInfo.ecoregion);
          ractive.set('activeSite.tsummeravg', Math.round(markerInfo.tsummeravg));
          ractive.set('activeSite.oystertype', markerInfo.oystertype);
          ractive.set('activeSite.currentreefarea_ha', 0);
          ractive.set('activeSite.currentcullmeanlength_mm', 0);
          ractive.set('activeSite.currentculldensity_ind_m2', 0);
          ractive.set('activeSite.currentmarketmeanlength_mm', 0);
          ractive.set('activeSite.currentmarketdensity_ind_m2', 0);                                                  
          ractive.set('goalData.goalfiltrationprcnt', 50);        
          ractive.set('goalData.goalculllength', 0);
          ractive.set('goalData.goalmarketlength', 0); 
          ractive.set('goalData.goalculldensity', 0);
          ractive.set('goalData.goalmarketdensity', 0);            
        }

        OysterApp.loadFishData(markerInfo['fishdatacoast']);
        var fishLength = ractive.get('goalData.fish.length');
        if (fishLength) {
          for (var i = 0; i< fishLength; i++) {
            var fishstring = 'goalData.fish.'+i+'.abundanceWeight';     
            ractive.set(fishstring, 1);
          }
        }
        map.closePopup();                 
      });
    });
  },

  loadFishData: function(fishdatacoast) {
    // if Northern Gulf of Mexico, Floridian, Carolinian
    //console.log(ecoregion);
    // ractive.set('goalData.fish', 'your mom');    
    //ractive.set('goalData.fish', fish.atlantic); // Not sure I initially had this.
    if (fishdatacoast === 'Atlantic' ) {
      ractive.set('goalData.fish', null);
      ractive.set('goalData.fish', fish.atlantic);
    } else if (fishdatacoast === 'Gulf of Mexico') {
      ractive.set('goalData.fish', null);
      ractive.set('goalData.fish', fish.gulfOfMexico);      
    } else {
      //console.log('not GoM or south Atlantic');
      ractive.set('goalData.fish', null);
    }
  },

  format: function ( num ) {
    if ( num > 1000000000 ) return ( num / 1000000000 ).toFixed( 1 ) + ' Bil';
    if ( num > 1000000 ) return ( num / 1000000 ).toFixed( 1 ) + ' Mil';
    if ( num > 1000 ) return ( Math.floor( num / 1000 ) ) + ',' + ( num % 1000 ).toFixed(3);   
    return num;
  },

  easternOysterFiltrationRate: function(oysterDensity, shellHeight, temp) {
    if (oysterDensity < 0.01) {
      return 0;
    } else {
      var oysWght = oysterWeight(shellHeight);
      var term1 = Math.pow(oysWght,0.58) * 8.02;
      var term2 = Math.exp((-0.015 * (Math.pow((temp-27), 2)))); // Cerco & Noel
      var filtRate = oysterDensity*(term1*term2);
      return filtRate;  
    }
  },

  olympiaOysterFiltrationRate: function(oysterDensity, shellHeight, temp) {
    var oysWght = oysterWeight(shellHeight);
    var term1 = Math.pow(oysWght,0.26) * 3.6;
    var term2 = Math.exp((-0.01 * (Math.pow((temp-25), 2)))); // Cerco & Noel
    var filtRate = oysterDensity*(term1*term2);
    return filtRate;
  },

  calculateFiltrationRate: function (oysterType, oysterDensity, length, length2RefName, temp){
    var oysWeight, term1, term2, filtRate;
    if (oysterType === 'Eastern') {
      if (oysterDensity < 0.01) {
        return 0;
      } else {
        oysWeight = length2Mass[length2RefName].calcMass(length);
        term1 = Math.pow(oysWeight,0.58) * 8.02;
        term2 = Math.exp((-0.015 * (Math.pow((temp-27), 2)))); // Cerco & Noel
        filtRate = oysterDensity*(term1*term2);
        return filtRate;
      }

    } else if (oysterType === 'Olympia') {
      oysWeight = length2Mass[length2RefName].calcMass(length);
      term1 = Math.pow(oysWeight,0.26) * 3.6;
      term2 = Math.exp((-0.01 * (Math.pow((temp-25), 2)))); // Cerco & Noel
      filtRate = oysterDensity*(term1*term2);
      return filtRate;
    }
  },

  calculateOneOysterFilt: function (oysterType, length, length2RefName, temp) {
    var oysWeight, term1, term2, filtRate;
    if (oysterType === 'Eastern') {
      oysWeight = length2Mass[length2RefName].calcMass(length);
      term1 = Math.pow(oysWeight,0.58) * 8.02;
      term2 = Math.exp((-0.015 * (Math.pow((temp-27), 2)))); // Cerco & Noel
      filtRate = 1*(term1*term2);
      return filtRate;
    } else if (oysterType === 'Olympia') {
      oysWeight = length2Mass[length2RefName].calcMass(length);
      term1 = Math.pow(oysWeight,0.26) * 3.6;
      term2 = Math.exp((-0.01 * (Math.pow((temp-25), 2)))); // Cerco & Noel
      filtRate = 1*(term1*term2);
      return filtRate;
    }
  },

  initTour() {

  },

  init: function() {
    this.initMap();
    this.loadSite();
    $('#map-modal').on('shown.bs.modal', function () { // chooseLocation is the id of the modal.
        //map.invalidateSize();
				setTimeout(function() {
				    map.invalidateSize();
				  }, 50);
     });
    $(function () {
      $('[data-toggle="popover"]').popover({
          trigger: "click hover"
        })
      }
    );

    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $('#intro-modal').modal('show')


    var MyRactive = Ractive.extend({
      getComputed: function() {
        var out = {},
            comp = this.viewmodel.computations
        for ( c in comp ) {
            out[c] = comp[c].value
        }
        return out;
      }
    })

    ractive = new MyRactive({
      el: '#oyster-calculator',
      template: '#template',
      append: false,
      data: {
          siteType: 'existing',
          activeSite: {
            bayvolume_1000m3: 0,
            bayresidencetime_d: 0,
            tsummeravg: 0,
            oystertype: 'Eastern',
            currentreefarea_ha: 0,
            currentcullmeanlength_mm: 0,
            currentculldensity_ind_m2: 0,
            currentmarketmeanlength_mm: 0,
            currentmarketdensity_ind_m2: 0,
            length2massrefname: 'geigerUnpubIndian',
          },
          activeReset: {
            bayvolume_1000m3: 0,
            bayresidencetime_d: 0,
            bayresidencetime_d_historic: 0,
            bayfiltervol: 0,
            bayfiltervolhistoric: 0,
            historicfiltration: 0,
            tsummeravg: 0,
            oystertype: 'Eastern',
            currentreefarea_ha: 0,
            currentcullmeanlength_mm: 0,
            currentculldensity_ind_m2: 0,
            currentmarketmeanlength_mm: 0,
            currentmarketdensity_ind_m2: 0,
            length2massrefname: 'geigerUnpubIndian',
          },
          allData: '',
          goalData: {
            oystertype: 'Eastern',
            temp: 0,
            bayfiltervol: 0,
            fish: null,
            goalculllength: 0,            
            goalculldensity: 0,
            goalculloneoysterrate: 0,
            goalmarketlength: 0,
            goalmarketdensity: 0,
            goalmarketoneoysterrate: 0,
            length2massrefname: 'geigerUnpubIndian',
            goalfiltration: 0,
            goalfiltrationprcnt: 50,
            currentfiltration: 0,
            reefAreaNeeded: 0
          },
          goalReset: {
            oystertype: 'Eastern',
            temp: 0,
            bayfiltervol: 0,
            currentfiltration: 0,
            fish: null,
            goalculllength: 0,            
            goalculldensity: 0,
            goalculloneoysterrate: 0,
            goalmarketlength: 0,
            goalmarketdensity: 0,
            goalmarketoneoysterrate: 0,
            goalfiltration: 0,
            length2massrefname: 'geigerUnpubIndian',
            goalfiltration: 0,
            goalfiltrationprcnt: 50,
            currentfiltration: 0,
            reefAreaNeeded: 0            
          },

          format: function (num) {
            if ( num > 10000000000000000000000000 ) return 0;
            if ( num > 1000000000 ) return ( num / 1000000000 ).toFixed( 1 ) + ' B';
            if ( num > 1000000 ) return ( num / 1000000 ).toFixed( 1 ) + ' M';
            //if ( num > 1000 ) return ( Math.floor( num / 1000 ) ) + ',' + ( num % 1000 ).toFixed(1);
            //if ( num > 1000 ) return (formatThousands(num));            
            if ( num < 0 ) return 0;
            if ( isNaN(num) === true ) return 0;
            // if (isNan(num) === false) return 999;
            return num.toFixed(0);
          }
      },
      computed: {
        bayFilterVol: function () {
          var estuaryVolLiters, bayVol;
          estuaryVolLiters = this.get('activeSite.bayvolume_1000m3') * 1000000; // xls units are in m3 * 1000 1m3 = 1000 L
          bayVol = estuaryVolLiters/this.get('activeSite.bayresidencetime_d')/24;
          ractive.set('activeSite.bayfiltervol', bayVol);
          //ractive.set('activeSite.bayfiltervolhistoric', bayVol);          
          return bayVol;          
        },
        bayFilterVolHistoric: function () {
          var estuaryVolLiters, bayVol;
          estuaryVolLiters = this.get('activeSite.bayvolume_1000m3') * 1000000; // xls units are in m3 * 1000 1m3 = 1000 L
          bayVol = estuaryVolLiters/this.get('activeSite.bayresidencetime_d_historic')/24;
          ractive.set('activeSite.bayfiltervolhistoric', bayVol);
          return bayVol;          
        },        
        oysterWeight: function () {
          var estuaryVolLiters = this.get('activeSite.bayvolume_1000m3') * 1000000; // xls units are in m3 * 1000 1m3 = 1000 L
          return (estuaryVolLiters/this.get('activeSite.bayresidencetime_d'))/24;          
        },
        historicFiltration: function () {
          var filtration;
          if (this.get('activeSite.historicmeanlength_mm')) {
            filtration =  this.get('activeSite.historicreefarea_ha') * 10000 * (OysterApp.calculateFiltrationRate(this.get('activeSite.oystertype'), this.get('activeSite.historictotaldensity_ind_m2'), this.get('activeSite.historicmeanlength_mm'), this.get('activeSite.length2massrefname'), this.get('activeSite.tsummeravg_historic')));
            ractive.set('activeSite.historicfiltration', filtration);
            return filtration;
          } else if (this.get('activeSite.historiccullmeanlength_mm')) {
            filtration = this.get('activeSite.historicreefarea_ha') * 10000 * ((OysterApp.calculateFiltrationRate(this.get('activeSite.oystertype'), this.get('activeSite.historicculldensity_ind_m2'), this.get('activeSite.historiccullmeanlength_mm'), this.get('activeSite.length2massrefname'), this.get('activeSite.tsummeravg_historic')) 
              + (OysterApp.calculateFiltrationRate(this.get('activeSite.oystertype'), this.get('activeSite.historicmarketdensity_ind_m2'), this.get('activeSite.historicmarketmeanlength_mm'), this.get('activeSite.length2massrefname'), this.get('activeSite.tsummeravg_historic')))));
            ractive.set('activeSite.historicfiltration', filtration);
            return filtration;
            }
        },
        historicFiltrationPrcnt: function () {
          var filtration;
          if (this.get('activeSite.historicmeanlength_mm')) {
            filtration =  this.get('activeSite.historicreefarea_ha') * 10000 * (OysterApp.calculateFiltrationRate(this.get('activeSite.oystertype'), this.get('activeSite.historictotaldensity_ind_m2'), this.get('activeSite.historicmeanlength_mm'), this.get('activeSite.length2massrefname'), this.get('activeSite.tsummeravg_historic')));
          } else if (this.get('activeSite.historiccullmeanlength_mm')) {
            filtration = this.get('activeSite.historicreefarea_ha') * 10000 * ((OysterApp.calculateFiltrationRate(this.get('activeSite.oystertype'), this.get('activeSite.historicculldensity_ind_m2'), this.get('activeSite.historiccullmeanlength_mm'), this.get('activeSite.length2massrefname'), this.get('activeSite.tsummeravg_historic')) 
              + (OysterApp.calculateFiltrationRate(this.get('activeSite.oystertype'), this.get('activeSite.historicmarketdensity_ind_m2'), this.get('activeSite.historicmarketmeanlength_mm'), this.get('activeSite.length2massrefname'), this.get('activeSite.tsummeravg_historic')))));
            }
          var estuaryVolLiters, bayVol;
          estuaryVolLiters = this.get('activeSite.bayvolume_1000m3') * 1000000; // xls units are in m3 * 1000 1m3 = 1000 L
          bayVol = estuaryVolLiters/this.get('activeSite.bayresidencetime_d_historic')/24;
          return filtration/bayVol;             
        },
        currentFiltration: function () {
          var filtration, oneOysterCull, oneOysterMarket, filtrationGoal;
          if ((this.get('activeSite.currentculldensity_ind_m2') !== null) || (this.get('activeSite.currentmarketdensity_ind_m2') !== null) || (this.get('goalData.goalmarketdensity')) || (this.get('goalData.goalculldensity'))) {
            if (this.get('activeSite.currentculldensity_ind_m2') === null) {
              console.log("null, dude");
            }
            filtration = this.get('activeSite.currentreefarea_ha') * 10000 * ((OysterApp.calculateFiltrationRate(this.get('activeSite.oystertype'), this.get('activeSite.currentculldensity_ind_m2'), this.get('activeSite.currentcullmeanlength_mm'), this.get('activeSite.length2massrefname'), this.get('activeSite.tsummeravg')) 
              + (OysterApp.calculateFiltrationRate(this.get('activeSite.oystertype'), this.get('activeSite.currentmarketdensity_ind_m2'), this.get('activeSite.currentmarketmeanlength_mm'), this.get('activeSite.length2massrefname'), this.get('activeSite.tsummeravg')))));
            ractive.set('goalData.currentfiltration', filtration);
            ractive.set('activeSite.currentfiltration', filtration);

            goalOneOysterCull = OysterApp.calculateOneOysterFilt(this.get('activeSite.oystertype'),this.get('goalData.goalculllength'), this.get('activeSite.length2massrefname'), this.get('activeSite.tsummeravg'));
            goalOneOysterMarket = OysterApp.calculateOneOysterFilt(this.get('activeSite.oystertype'),this.get('goalData.goalmarketlength'), this.get('activeSite.length2massrefname'), this.get('activeSite.tsummeravg'));             
            ractive.set('goalData.goalculloneoysterrate', goalOneOysterCull);
            ractive.set('goalData.goalmarketoneoysterrate', goalOneOysterMarket);
            filtrationGoal = (this.get('activeSite.bayfiltervol') * (this.get('goalData.goalfiltrationprcnt')/100)) - this.get('activeSite.currentfiltration');
            ractive.set('goalData.goalfiltration', filtrationGoal);
            return filtration;
          } else if (this.get('activeSite.currentmeanlength_mm')) {
            filtration = this.get('activeSite.currentreefarea_ha') * 10000 * (OysterApp.calculateFiltrationRate(this.get('activeSite.oystertype'), this.get('activeSite.currenttotaldensity_ind_m2'), this.get('activeSite.currentmeanlength_mm'), this.get('activeSite.length2massrefname'), this.get('activeSite.tsummeravg')));
            ractive.set('activeSite.currentfiltration', filtration);
            return filtration; 
          } else {
            //console.log('zero');
            ractive.set('activeSite.currentculldensity_ind_m2', 0);
            ractive.set('activeSite.currentmarketdensity_ind_m2', 0);                        
            ractive.set('goalData.currentfiltration', 0);
            ractive.set('activeSite.currentfiltration', 0);
            ractive.set('goalData.goalculloneoysterrate', 0);
            ractive.set('goalData.goalmarketoneoysterrate', 0);            
            return 0;
          }
        },
        sumFishIndiv: function () {
          var fishArray = this.get('goalData.fish');
          var goalFiltrationHa = this.get('goalData.goalfiltration');
          // console.log(this.get('goalData'));
          var sum = 0;
          for (var key in fishArray) {
            if (fishArray[key].abundanceWeight === 0){
              var indivSum = 0;
            } else if (fishArray[key].abundanceWeight === 1) {
              var indivSum = (fishArray[key].juvMeanHa * goalFiltrationHa)/(10000*(this.get('goalData.goalmarketdensity')*this.get('goalData.goalmarketoneoysterrate')+(this.get('goalData.goalculldensity')*this.get('goalData.goalculloneoysterrate'))));
            } else if (fishArray[key].abundanceWeight === 2) {
              var indivSum = ((fishArray[key].juvMeanHa + (fishArray[key].juvStDevAcre/0.404686)) * goalFiltrationHa)/(10000*(this.get('goalData.goalmarketdensity')*this.get('goalData.goalmarketoneoysterrate')+(this.get('goalData.goalculldensity')*this.get('goalData.goalculloneoysterrate'))));
            }
            sum += +indivSum;
          }
          return sum;
        },
        sumFishBiomass: function () {
          var fishArray = this.get('goalData.fish');
          var goalFiltrationHa = this.get('goalData.goalfiltration');
          var sum = 0;

          for (var key in fishArray) {
            if (fishArray[key].abundanceWeight === 0){
              var indivSum = 0;
            } else if (fishArray[key].abundanceWeight === 1) {
              var indivSum = (fishArray[key].meanProductionKgHa * goalFiltrationHa)/(10000*(this.get('goalData.goalmarketdensity')*this.get('goalData.goalmarketoneoysterrate')+(this.get('goalData.goalculldensity')*this.get('goalData.goalculloneoysterrate'))));
            } else if (fishArray[key].abundanceWeight === 2) {
              var indivSum = ((fishArray[key].meanProductionKgHa + (fishArray[key].stDevProductionKgAcre/0.404686)) * goalFiltrationHa)/(10000*(this.get('goalData.goalmarketdensity')*this.get('goalData.goalmarketoneoysterrate')+(this.get('goalData.goalculldensity')*this.get('goalData.goalculloneoysterrate'))));
            }
            sum += +indivSum;
          }
          return sum;
        }
      } // end computed
    }); // end ractive
  } // end init
}; // end oyster app

OysterApp.init();
//Not sure yet why this isn't working on init
$('#map-reset').on('click', function(){
  //console.log('reset');
  ractive.set('goalData', null);
  ractive.set('goalData.goalfiltrationprcnt', 50);  
  ractive.set('goalData.goalculllength', 0);
  ractive.set('goalData.goalmarketlength', 0); 
  ractive.set('goalData.goalculldensity', 0);
  ractive.set('goalData.goalmarketdensity', 0); 
  ractive.set('activeSite', ractive.get('activeReset'));
  ractive.set('activeSite.currentcullmeanlength_mm', 0);
  ractive.set('activeSite.currentculldensity_ind_m2', 0);
  ractive.set('activeSite.currentmarketmeanlength_mm', 0);
  ractive.set('activeSite.currentmarketdensity_ind_m2', 0);     
  ractive.set('goalData.fish', null);  
});

  

$('input[name=siteType]').change(function(){
var value = $( 'input[name=siteType]:checked' ).val();
ractive.set('siteType', value);
});

var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) {
    inputs[i].oninput = function () {
      if (isNumeric(this.value) !== true) {
        this.value = 0;
      }        
    }
}


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
