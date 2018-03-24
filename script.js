var reset = false;
var sound = new Audio('newlev.mp3');
sound.load();
function setVisible(show, element){
  $(element).css("display",((show)?"block":"none"));
}
function setTime(){
  setVisible(false,"#setTime");
  var hr = $('#hrs').val();
  if(isNaN(hr))hr = 0;
  var min = $('#mins').val();
  if(isNaN(min))min = 0;
  var sec = $('#secs').val();
  if(isNaN(sec))sec = 0;
  $("#hrs").val("");
  $("#mins").val("");
  $("#secs").val("");
  setTimer(Date.now()+sec*1000+min*1000*60+hr*1000*3600);

}
function setCount(){

  var stuff = Date.parse($("#date").val())-(new Date()).getTimezoneOffset();
  setVisible(false,"#countDwn");
  $("#date").val("");
  setTimer(stuff);
}
function setTimer(unix){
  reset = false;
  update();
  function update(){
    //difference in seconds
    var diff = (unix - Date.now())/1000;
    var h = Math.floor(diff/3600);
    var m = Math.floor((diff%3600)/60);
    var s =  Math.floor((diff%3600)%60);
    $("#timer").html(h + ":" + Math.floor(m/10) + m%10 + ":" + Math.floor(s/10)+s%10);
    if (diff>0 && !reset) requestAnimationFrame(update);
    else if (reset) $("#timer").html("0:00:00");
    else end();
  }
}
function end(){
  $("#timer").html("TIME'S UP");
  sound.play()
  update();
  function update(){
    setTimeout(function(){

      if(!reset){
        sound.play();
        requestAnimationFrame(update);
      }
      else $("#timer").html("0:00:00");
    },2000);

  }
}
