var time, date, hour, minutes; //Clock
var inputalarm; //Entered alarm time
var spanval; //Display alarm time
var defaultMusic = new Audio("Wham - Wake Me Up Before You Go Go.mp3");
var music = new Audio();
var uploadedMusic;

function clock() {
  date = new Date();
  hour = date.getHours();
  minutes = date.getMinutes();

  if (hour < 10) hour = "0" + hour;
  if (minutes < 10) minutes = "0" + minutes;

  time = hour + ":" + minutes;
  $(".clock").html(initVisualizer());
  $(".displayTime").html(time);
}

if (uploadedMusic === undefined) {
  music = defaultMusic;
}

$(".uploadedMusic").on("change", function () {
  uploadedMusic = document.querySelector(".uploadedMusic").files[0];
  music.src = URL.createObjectURL(uploadedMusic);
});

setInterval(function setAlarm() {
  inputalarm = $("#time").val();
  spanval = $("span").html();
  $("#setAlarm").on("click", function () {
    $(this).html("Set Alarm");
    $(this).addClass("active");
    $("#setAlarm").html("Stop Alarm");
    $("span").html(inputalarm);
  });

  if (spanval == time) {
    music.play();
    music.volume = 0.01;
    initVisualizer();
  }
}, 1000);

$(document).ready(function () {
  $("#setAlarm").on("click", function () {
    if ($(this).hasClass("active")) {
      setTimeout(function () {
        $("#setAlarm").html("Set Alarm");
        $("#setAlarm").removeClass("active");
      }, 10);
    }
    $("span").html("");
    $("#time").val("");
    music.pause();
    music.currentTime = 0;
  });
  setInterval("clock()", 1000);
});

//
var canvas,
  ctx,
  source,
  context,
  analyser,
  fbcarray,
  bars,
  barX,
  barWidth,
  barHeight,
  barRotate;

function initVisualizer() {
  context = new AudioContext();
  analyser = context.createAnalyser();
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  source = context.createMediaElementSource(music);
  source.connect(analyser);
  analyser.connect(context.destination);
  frameLooper();
}

function frameLooper() {
  window.requestAnimationFrame(frameLooper);
  fbcarray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbcarray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ccff";
  bars = 7;

  for (i = 0; i < bars; i++) {
    barX = 80 + i * 20;
    barWidth = 9;
    barHeight = -(fbcarray[i] / 2);

    ctx.fillRect(barX, canvas.height, barWidth, barHeight);
  }
}
