window.addEventListener('DOMContentLoaded',function(){
  var updatesPerSecond = 20;
  var animalsKilledPerYear = {
    "wild_caught_fish": 970000000000,
    "chickens": 61171973510,
    "farmed_fish": 38000000000,
    "ducks": 2887594480,
    "pigs": 1451856889.38,
    "rabbits": 1171578000,
    "geese": 687147000,
    "turkeys": 618086890,
    "sheep": 536742256.33,
    "goats": 438320370.99,
    "cattle": 298799160.08,
    "rodents": 70371000,
    "other_birds": 59656000,
    "buffalo": 25798819,
    "horses": 4863367,
    "donkeys": 3213400,
    "camels": 3243266.03,
  };

  var secondsPerYear = 365 * 24 * 60 * 60;
  var interval = 1000/ updatesPerSecond;
  var count = 0, start = new Date().getTime();

  function update(intervalCount) {
    for (var subset in animalsKilledPerYear) {
      var numKilled = animalsKilledPerYear[subset];
      var countElement = document.getElementById("akc-" + subset);
      if (countElement) {
        countElement.innerHTML = Math.round(intervalCount * (numKilled/secondsPerYear) / updatesPerSecond).toLocaleString();
      }
    }
  }

  function selfCorrectingTimeoutInterval() {
    update(++count);
    window.setTimeout(selfCorrectingTimeoutInterval, interval - (new Date().getTime() - start - count * interval));
  }
  window.setTimeout(selfCorrectingTimeoutInterval, interval);
});

////
// Timer
////
var sec =0, min=0, hour=0;
setInterval(function(){
	sec++;
	if(sec==60){sec=0; min++;}
	if(min==60){min=0; hour++;}
	var str = 'It has been';
	str+= hour?' ' +hour + (hour==1?' hour':' hours') + ' and':'';
	str+= min?' ' +min+ (min==1?' minute':' minutes') + ' and':'';
	str+= sec?' ' +sec+ (sec==1?' second':' seconds'):'';
document.getElementById('passed').innerHTML=str;
},1000);
////
// Timer Ends
////