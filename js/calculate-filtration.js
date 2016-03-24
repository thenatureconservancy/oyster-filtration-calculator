function calculateFiltrationRate(testData) {
  var s = testData.MatagordaBay;
  var summerArray = [s.temp07, s.temp08, s.temp09];
  var currentDensityMarket = s.currentDensityMarket;
  var meanOysterLengthMarket = s.meanOysterLengthMarket;

  function avgTemperature(tempArray) {
    var sum = tempArray.reduce(function(a,b) {
      return a + b;
    });
    return sum/tempArray.length;
  }

  function oysterWeight(shellHeight) {
    return Math.pow(shellHeight/(Math.pow(10, 1.846)), (1/0.258)); // done for example
  }

  function easternOysterFiltrationRate (oysterDensity, shellHeight, temp) {
    var oysWght = oysterWeight(shellHeight);
    var term1 = Math.pow(oysWght,0.58) * 8.02;
    var term2 = Math.exp((-0.015 * (Math.pow((temp-27), 2)))); // Cerco & Noel
    var filtRate = oysterDensity*(term1*term2);
    return filtRate;
  }

  function olympiaOysterFiltrationRate (oysterDensity, shellHeight, temp) {
    var oysWght = oysterWeight(shellHeight);
    var term1 = Math.pow(oysWght,0.26) * 3.6;
    var term2 = Math.exp((-0.01 * (Math.pow((temp-25), 2)))); // Cerco & Noel
    var filtRate = oysterDensity*(term1*term2);
    return filtRate;
  }

  function calculateEstuaryFilterVolume () {
    var estuaryVolLiters = s.volumeM3 * 1000000; // xls units are in m3 * 1000 1m3 = 1000 L
    return (estuaryVolLiters/s.residenceTime)/24;
  }

  function calculateMissingFiltration () {
    return (estuaryFiltVol - currentFiltration);
  }

  function calculateNumberOysters () {
    return missingFiltration/oneOysterFilter;
  }

  function calculateOysterHabitat (neededOysters, oysterDensity) {
    return (neededOysters/oysterDensity) / 10000; // returns ha of habitat
  }

  //var summerTemp = avgTemperature(summerArray);
  // var summerTemp = 30.7;
  // var currentFiltration =  s.currentReefAreaHa*10000 * (easternOysterFiltrationRate(s.currentDensityMarket, s.meanOysterLengthMarket, summerTemp) + easternOysterFiltrationRate(s.currentDensityCulls, s.meanOysterLengthCull, summerTemp));
  // var estuaryFiltVol = calculateEstuaryFilterVolume();
  // var missingFiltration = calculateMissingFiltration();
  // var oneOysterFilter = easternOysterFiltrationRate(1, 54, summerTemp);
  // var neededOysters = calculateNumberOysters();
  // var newOysterHabitat = calculateOysterHabitat(neededOysters, 15);

  // ractive.set('filtRate', currentFiltration);
  // ractive.set('oysterNumber', neededOysters);
  // ractive.set('oysterHabitat', newOysterHabitat);
  // ractive.set('activeModel', {
  //   filtRate: currentFiltration,
  //   oysterNumber: neededOysters,
  //   oysterHabitat: newOysterHabitat
  // })  
  // console.log(newOysterHabitat);
}


  console.log(data[5].CurrentReefArea_a*10000);

      //activeSiteName: '',
      // activeInputs: {
      //   lat : '',
      //   lon : '',
      //   volumeM3 : '',
      //   residenceTime : '',
      //   historicReefAreaHa : '', 
      //   historicTotalDensity : '',
      //   historicMeanOysterLength : '',
      //   historicMeanOysterLengthMarket : '',
      //   historicMeanOysterLengthCull : '',
      //   historicMarketBiomassG : '',
      //   historicCullBiomassG : '',        
      //   currentReefAreaHa : '',
      //   currentTotalDensity : '',
      //   currentDensityMarket : '',
      //   currentDensityCulls : '',
      //   currentMeanOysterLengthMarket : '',   // length = shell height (SH)
      //   currentMeanOysterLengthCull : '',     // length = shell height (SH)
      //   lengthToMassConversion : '',   
      //   temp01 : '',
      //   temp02 : '',
      //   temp03 : '',
      //   temp04 : '',
      //   temp05 : '',
      //   temp06 : '',       
      //   temp07 : '',
      //   temp08 : '',
      //   temp09 : '',
      //   temp10 : '',
      //   temp11 : '',
      //   temp12 : ''
      // },