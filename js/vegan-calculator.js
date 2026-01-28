
var formatNumber = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var kgToLb = function () {
  return v * 2.20462;
};

var lbToKg = function () {
  return v / 2.20462;
};

var gallonToLitre = function () {
  return v * 3.7854;
};

var litreToGallon = function () {
  return v / 3.7854;
};

var sqftToSqm = function () {
  return v * 0.0929;
};

var sqmToSqft = function () {
  return v / 0.0929;
};

function veganCalc () {
  var unit;
  var totalDays = 0;
  var years = $('#years').val();
  var month = $('#months').val();
  
  totalDays = (month) ? totalDays + month*30 : totalDays ;
  totalDays = (years) ? totalDays + years*365 : totalDays ;
  
  // Variables
  var indexes = {
    'gallons': {
      'ipd': {
        'imperial': 1100,
        'metric': 4163.9
      },
      'selector': '.water',
      'index': {
        'imperial': 'Gallons of water:',
        'metric': 'Litres of water:'
      }
    },
    'grains': {
      'ipd': {
        'imperial': 40,
        'metric': 18.1
      },
      'selector': '.grain',
      'index': {
        'imperial': 'lbs of Grain:',
        'metric': 'kg of Grain:'
      }
    },
    'forest': {
      'ipd': {
        'imperial': 30,
        'metric': 2.8
      },
      'selector': '.forest',
      'index': {
        'imperial': 'Sq.ft of Forest:',
        'metric': 'Sq.m of Forest:'
      }
    },
    'co2': {
      'ipd': {
        'imperial': 20,
        'metric': 9.1
      },
      'selector': '.co2',
      'index': {
        'imperial': 'lbs of Co2:',
        'metric': 'kg of Co2:'
      }
    },
    'animals': {
      'ipd': {
        'imperial': 1,
        'metric': 1
      },
      'selector': '.animals',
      'index': {
        'imperial': 'Animal Lives:',
        'metric': 'Animal Lives:'
      }
    }
  }
  
  // Functions
  var years = $('#years').val();
  var months = $('#months').val();
  var unit = $('#unit').val();
  
  //Prints
  $.map(indexes, function (v, i) {
    $(v.selector + ".index").html(v.index[unit]);
    $(v.selector + ".value").html(formatNumber( Math.round(v.ipd[unit] * totalDays) ) );
  });
  $('.intro.index').html("You have saved:");
};