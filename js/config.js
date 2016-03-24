var length2Mass = {
  beseres2011: {
    reference: 'BeseresPollack et al 2011 for Aransas Bay',
    calcMass: function(L){
      return Math.pow(L/(Math.pow(10, 1.846)), (1/0.258));
    }
  },
  bushek: {
    reference: 'Bushek unpublished data (for NJ?)',
    calcMass: function(L){
      return (Math.pow(L,2.4503) * 0.00003); // 4 zeros
    }
  },
  geigerUnpubTampa: {
    reference: 'Geiger unpublished data Tampa Bay',
    calcMass: function(L){
      return Math.pow(L,2.2476) * 0.00006; // Only 1/4 sites said this was for Tampa Bay
    }
  },
  geigerUnpubIndian: {
    reference: 'Geiger unpublished data Indian River',
    calcMass: function(L){
      return Math.pow(L,1.8228) * 0.0003; // Note: 3 0s, not 4
    }
  },
  grayUnpub: {
    reference: 'Gray unpublished data',
    calcMass: function(L){
      return Math.pow(L,3.04436) * 0.00000415879; // Note: 5 0s
    }
  },
  grizzle2008: {
    reference: 'Grizzle et al. 2008',
    calcMass: function(L){
      return Math.pow(L,2.1727) * 0.00003; // Note: 4 0s
    }
  },
  harding2010: {
    reference: 'Harding et al. 2010',
    calcMass: function(L){
      return Math.pow(L,2.2995) * 0.000049216; // Note: 4 0s          ***********
    }
  },
  liddel2007: {
    reference: 'Liddel 2007 in Lane et al. 2010',
    calcMass: function(L){
      return Math.pow(L,2.3512) * 0.00003; // Note: 4 0s          
    }
  },  
  luckenbachRoss2009: {
    reference: 'Luckenbach & Ross 2009',
    calcMass: function(L){
      return Math.pow(L,1.9352) * 0.0003; //         
    }
  },
  mann2009: {
    reference: 'Mann et al. 2009, corrected for proportion',
    calcMass: function(L){
      return Math.pow(L,2.15) * 0.00007; //       
    }
  },
  rossLuckenbach2009: {
    reference: 'Ross & Luckenbach 2009',
    calcMass: function(L){
      return Math.pow(L,2.45) * 0.00001; //         
    }
  },
  southworth2010: {
    reference: 'Southworth et al. 2010',
    calcMass: function(L){
      return Math.pow(L,2.743) * 0.0000096318; //         
    }
  }  
}

var fish = {
  atlantic: [{"coast":"Atlantic","type":"crustacean","species":"azteceus","commonName":"Brown Shrimp","juvMeanM2":0.034,"juvStDevM2":0.008,"juvMeanHa":340,"juvMeanAcre":138,"juvStDevAcre":34,"rYears":0.50,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":0.2,"stDevProductionGM2":0.1,"meanProductionKgHa":2,"meanProductionKgAcre":1,"stDevProductionKgAcre":0.4,"abundanceWeight":1},
{"coast":"Atlantic","type":"fish","species":"Mycteroptera microlepis","commonName":"Gag","juvMeanM2":0.014,"juvStDevM2":0.009,"juvMeanHa":140,"juvMeanAcre":57,"juvStDevAcre":36,"rYears":4.00,"meanNumIndR":0.002,"indMeanAcreAgeR":"10","meanProductionGM2":23.3,"stDevProductionGM2":15,"meanProductionKgHa":233,"meanProductionKgAcre":94,"stDevProductionKgAcre":61,"abundanceWeight":1},
{"coast":"Atlantic","type":"fish","species":"Lutjanus griseus","commonName":"Gray Snapper","juvMeanM2":0.01,"juvStDevM2":0.007,"juvMeanHa":100,"juvMeanAcre":40,"juvStDevAcre":28,"rYears":5.00,"meanNumIndR":0.002,"indMeanAcreAgeR":"6","meanProductionGM2":5.6,"stDevProductionGM2":3.9,"meanProductionKgHa":56,"meanProductionKgAcre":23,"stDevProductionKgAcre":16,"abundanceWeight":1},
{"coast":"Atlantic","type":"fish","species":"Gobiosoma bosc","commonName":"Naked Goby","juvMeanM2":24.863,"juvStDevM2":6.877,"juvMeanHa":248630,"juvMeanAcre":100619,"juvStDevAcre":27830,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":28,"stDevProductionGM2":7.7,"meanProductionKgHa":280,"meanProductionKgAcre":113,"stDevProductionKgAcre":31,"abundanceWeight":1},
{"coast":"Atlantic","type":"fish","species":"Orthopristis chrysoptera","commonName":"Pigfish","juvMeanM2":0.026,"juvStDevM2":0.027,"juvMeanHa":260,"juvMeanAcre":105,"juvStDevAcre":109,"rYears":1.00,"meanNumIndR":0.019,"indMeanAcreAgeR":"75","meanProductionGM2":3.5,"stDevProductionGM2":3.6,"meanProductionKgHa":35,"meanProductionKgAcre":14,"stDevProductionKgAcre":15,"abundanceWeight":1},
{"coast":"Atlantic","type":"fish","species":"Lagodon rhomboides","commonName":"Pinfish","juvMeanM2":0.009,"juvStDevM2":0.224,"juvMeanHa":90,"juvMeanAcre":36,"juvStDevAcre":906,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":0.7,"stDevProductionGM2":18.3,"meanProductionKgHa":7,"meanProductionKgAcre":3,"stDevProductionKgAcre":74,"abundanceWeight":1},
{"coast":"Atlantic","type":"fish","species":"Archosargus probatocephalus","commonName":"Sheepshead","juvMeanM2":0.072,"juvStDevM2":0.048,"juvMeanHa":720,"juvMeanAcre":291,"juvStDevAcre":194,"rYears":2.00,"meanNumIndR":0.050,"indMeanAcreAgeR":"202","meanProductionGM2":59.6,"stDevProductionGM2":39.7,"meanProductionKgHa":596,"meanProductionKgAcre":241,"stDevProductionKgAcre":161,"abundanceWeight":1},
{"coast":"Atlantic","type":"fish","species":"Gobiesox strumosus","commonName":"Skilletfish","juvMeanM2":6.837,"juvStDevM2":2.184,"juvMeanHa":68370,"juvMeanAcre":27669,"juvStDevAcre":8840,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":22.2,"stDevProductionGM2":7.1,"meanProductionKgHa":222,"meanProductionKgAcre":90,"stDevProductionKgAcre":29,"abundanceWeight":1},
{"coast":"Atlantic","type":"fish","species":"Paralichthys lethostigma","commonName":"Southern Flounder","juvMeanM2":0.001,"juvStDevM2":0.008,"juvMeanHa":10,"juvMeanAcre":5,"juvStDevAcre":32,"rYears":1.00,"meanNumIndR":0.001,"indMeanAcreAgeR":"3","meanProductionGM2":0.6,"stDevProductionGM2":3.7,"meanProductionKgHa":6,"meanProductionKgAcre":2,"stDevProductionKgAcre":15,"abundanceWeight":1},
{"coast":"Atlantic","type":"fish","species":"Chasmodes bosquianus","commonName":"Striped Blenny","juvMeanM2":5.824,"juvStDevM2":1.431,"juvMeanHa":58240,"juvMeanAcre":23568,"juvStDevAcre":5791,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":19.4,"stDevProductionGM2":4.7,"meanProductionKgHa":194,"meanProductionKgAcre":79,"stDevProductionKgAcre":19,"abundanceWeight":1},
{"coast":"Atlantic","type":"fish","species":"Fundulus majalis","commonName":"Striped Killifish","juvMeanM2":0.015,"juvStDevM2":0.019,"juvMeanHa":150,"juvMeanAcre":62,"juvStDevAcre":77,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":0.06,"stDevProductionGM2":0.07,"meanProductionKgHa":0.6,"meanProductionKgAcre":0.4,"stDevProductionKgAcre":0.4,"abundanceWeight":1},
{"coast":"Atlantic","type":"fish","species":"Opsanus tau","commonName":"Toadfish","juvMeanM2":1.187,"juvStDevM2":0.4,"juvMeanHa":11870,"juvMeanAcre":4809,"juvStDevAcre":1623,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":114.7,"stDevProductionGM2":38.5,"meanProductionKgHa":1147,"meanProductionKgAcre":476,"stDevProductionKgAcre":160,"abundanceWeight":1}]
,
  gulfOfMexico: [{"coast":"Gulf of Mexico","type":"crustacean","species":"Callinectes sapidus","commonName":"Blue Crab","juvMeanM2":7.418,"juvStDevM2":6.731,"juvMeanHa":74180,"juvMeanAcre":29997,"juvStDevAcre":27241,"rYears":0.75,"meanNumIndR":3.227,"indMeanAcreAgeR":"13058","meanProductionGM2":4.9,"stDevProductionGM2":4.5,"meanProductionKgHa":49,"meanProductionKgAcre":20,"stDevProductionKgAcre":18,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"crustacean","species":"Farfantepenaeus aztecus","commonName":"Brown Shrimp","juvMeanM2":1.036,"juvStDevM2":0.627,"juvMeanHa":10360,"juvMeanAcre":4195,"juvStDevAcre":2539,"rYears":0.50,"meanNumIndR":0.007,"indMeanAcreAgeR":"27","meanProductionGM2":7,"stDevProductionGM2":4.2,"meanProductionKgHa":70,"meanProductionKgAcre":28,"stDevProductionKgAcre":17,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Ctenogobius boleosoma","commonName":"Darter Goby","juvMeanM2":0.234,"juvStDevM2":0.169,"juvMeanHa":2340,"juvMeanAcre":946,"juvStDevAcre":682,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":0.5,"stDevProductionGM2":0.3,"meanProductionKgHa":5,"meanProductionKgAcre":2,"stDevProductionKgAcre":1,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Hypsoblennius hentz","commonName":"Feather Blenny","juvMeanM2":0.074,"juvStDevM2":0.02,"juvMeanHa":740,"juvMeanAcre":298,"juvStDevAcre":81,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":0.2,"stDevProductionGM2":0.1,"meanProductionKgHa":2,"meanProductionKgAcre":1,"stDevProductionKgAcre":0.4,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Hypsoblennius ionthas","commonName":"Freckled Blenny","juvMeanM2":0.392,"juvStDevM2":0.269,"juvMeanHa":3920,"juvMeanAcre":1586,"juvStDevAcre":1087,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":1.3,"stDevProductionGM2":0.9,"meanProductionKgHa":13,"meanProductionKgAcre":5,"stDevProductionKgAcre":4,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Bathygobius soporator","commonName":"Frillfin Goby","juvMeanM2":0.024,"juvStDevM2":0.009,"juvMeanHa":240,"juvMeanAcre":97,"juvStDevAcre":36,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":2,"stDevProductionGM2":0.7,"meanProductionKgHa":20,"meanProductionKgAcre":8,"stDevProductionKgAcre":3,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Gobiosoma bosc","commonName":"Naked Goby","juvMeanM2":1.92,"juvStDevM2":0.488,"juvMeanHa":19200,"juvMeanAcre":7770,"juvStDevAcre":1973,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":2.2,"stDevProductionGM2":0.6,"meanProductionKgHa":22,"meanProductionKgAcre":9,"stDevProductionKgAcre":2,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Orthopristis chrysoptera","commonName":"Pigfish","juvMeanM2":0.044,"juvStDevM2":0.018,"juvMeanHa":440,"juvMeanAcre":177,"juvStDevAcre":72,"rYears":1.00,"meanNumIndR":0.031,"indMeanAcreAgeR":"127","meanProductionGM2":5.8,"stDevProductionGM2":2.4,"meanProductionKgHa":58,"meanProductionKgAcre":23,"stDevProductionKgAcre":10,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Lagodon rhomboides","commonName":"Pinfish","juvMeanM2":0.415,"juvStDevM2":0.209,"juvMeanHa":4150,"juvMeanAcre":1680,"juvStDevAcre":846,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":33.2,"stDevProductionGM2":16.7,"meanProductionKgHa":332,"meanProductionKgAcre":134,"stDevProductionKgAcre":68,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Prionotus spp.","commonName":"Sea Robin","juvMeanM2":0.012,"juvStDevM2":0.015,"juvMeanHa":120,"juvMeanAcre":50,"juvStDevAcre":60,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":2.2,"stDevProductionGM2":2.7,"meanProductionKgHa":22,"meanProductionKgAcre":9,"stDevProductionKgAcre":11,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Archosargus probatocephalus","commonName":"Sheepshead","juvMeanM2":0.139,"juvStDevM2":0.101,"juvMeanHa":1390,"juvMeanAcre":563,"juvStDevAcre":408,"rYears":2.00,"meanNumIndR":0.097,"indMeanAcreAgeR":"391","meanProductionGM2":145.1,"stDevProductionGM2":104.8,"meanProductionKgHa":1451,"meanProductionKgAcre":587,"stDevProductionKgAcre":424,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Bairdiella chrysoura","commonName":"Silver Perch","juvMeanM2":0.501,"juvStDevM2":0.481,"juvMeanHa":5010,"juvMeanAcre":2027,"juvStDevAcre":1945,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":41,"stDevProductionGM2":39.5,"meanProductionKgHa":410,"meanProductionKgAcre":166,"stDevProductionKgAcre":160,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Gobiesox strumosus","commonName":"Skilletfish","juvMeanM2":0.959,"juvStDevM2":0.42,"juvMeanHa":9590,"juvMeanAcre":3883,"juvStDevAcre":1698,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":3.1,"stDevProductionGM2":1.4,"meanProductionKgHa":31,"meanProductionKgAcre":13,"stDevProductionKgAcre":6,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Chaetodipterus faber","commonName":"Spadefish","juvMeanM2":0.006,"juvStDevM2":0.004,"juvMeanHa":60,"juvMeanAcre":23,"juvStDevAcre":17,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":3,"stDevProductionGM2":2.2,"meanProductionKgHa":30,"meanProductionKgAcre":12,"stDevProductionKgAcre":9,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Leiostomus xanthurus","commonName":"Spot","juvMeanM2":0.342,"juvStDevM2":0.167,"juvMeanHa":3420,"juvMeanAcre":1385,"juvStDevAcre":674,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":17.9,"stDevProductionGM2":8.7,"meanProductionKgHa":179,"meanProductionKgAcre":72,"stDevProductionKgAcre":35,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"crustacean","species":"Menippe mercenaria","commonName":"Stone Crab","juvMeanM2":1.936,"juvStDevM2":0.214,"juvMeanHa":19360,"juvMeanAcre":7834,"juvStDevAcre":865,"rYears":3.00,"meanNumIndR":0.068,"indMeanAcreAgeR":"276","meanProductionGM2":61.4,"stDevProductionGM2":6.8,"meanProductionKgHa":614,"meanProductionKgAcre":27,"stDevProductionKgAcre":25,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Chasmodes bosquianus","commonName":"Striped Blenny","juvMeanM2":0.076,"juvStDevM2":0.039,"juvMeanHa":760,"juvMeanAcre":307,"juvStDevAcre":158,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":0.2,"stDevProductionGM2":0.1,"meanProductionKgHa":2,"meanProductionKgAcre":1,"stDevProductionKgAcre":0.4,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"fish","species":"Opsanus beta","commonName":"Toadfish ","juvMeanM2":1.325,"juvStDevM2":0.527,"juvMeanHa":13250,"juvMeanAcre":3798,"juvStDevAcre":2133,"rYears":null,"meanNumIndR":null,"indMeanAcreAgeR":"NA","meanProductionGM2":41.9,"stDevProductionGM2":16.6,"meanProductionKgHa":419,"meanProductionKgAcre":62,"stDevProductionKgAcre":25,"abundanceWeight":1},
{"coast":"Gulf of Mexico","type":"crustacean","species":"Litopanaeus setiferus","commonName":"White Shrimp","juvMeanM2":4.64,"juvStDevM2":2.726,"juvMeanHa":46400,"juvMeanAcre":18680,"juvStDevAcre":11032,"rYears":0.50,"meanNumIndR":0.029,"indMeanAcreAgeR":"118","meanProductionGM2":24.2,"stDevProductionGM2":14.3,"meanProductionKgHa":242,"meanProductionKgAcre":98,"stDevProductionKgAcre":58,"abundanceWeight":1}]
}

//Test mass w/ length 50
// var mysum = 0;
// for (var key in length2Mass) {
//   console.log(length2Mass[key].calcMass(50));
//   mysum += length2Mass[key].calcMass(50);
// }
// console.log(mysum/12);

