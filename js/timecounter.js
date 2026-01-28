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