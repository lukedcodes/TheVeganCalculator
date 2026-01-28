////
// Kill Counter
////
var counts = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
var rate = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

function StartKillCounter() {
	var millions = [ 90000, 45895, 2262, 1244, 857, 691, 533, 515, 345, 292, 65, 63, 23, 16, 4, 4, 3, 2 ];
	var perSecond = 8;
	for (var i = 0; i < counts.length; ++i) 
		rate[i] = millions[i] * 1000000 / 365 / 24 / 60 / 60 / perSecond;
	setInterval(NewCounts, 1000 / perSecond);
}

function NewCounts() {
	var num, thous, str;
	for (var i = 0; i < counts.length; ++i) {
		counts[i] += rate[i];
		num = Math.round(counts[i]);
		str = "";
		while (num > 1000) {
			thous = num % 1000;
			if (thous < 10)
				thous = "00" + thous;
			else if (thous < 100)
				thous = "0" + thous;
			str = "," + thous + str;
			num = Math.floor(num / 1000);
		}
		str = num + str;
		document.getElementById("count" + i).innerHTML = str;
	}
}

StartKillCounter();
////
// Kill Counter END
////


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


////
// Popup
////
$(".counter-info").on('click', function() {
	$(".counter-info-popup" ).fadeIn( 600, function() {});
});
$('.counter-info-close').on('click', function() {
	$(".counter-info-popup" ).fadeOut( 200, function() {});
});
////
// Popup
////