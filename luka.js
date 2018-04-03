$(document).ready(function() {
  $('#ko').prepend('<h1>Memory game</h1>');
  $('#score').hide();
  var nivo = 1 ;
  var wrap;
  var x;
  var provera;
  var puni_niz;
  var brojevi;
  var kliknute;
  var kraj = 0;
  var kontrola_dva;
  var clock;
  var vreme;
  var glavni;
  var loop;
  var frontline;
  var oduzimac;
  var sirina;
  var upisano;
  var poreni = 0;

novi_nivo();

function novi_nivo() {;
  console.log('došao u novi_nivo');
//  $('#ko').prepend('<h1>Memory game</h1>');

  kraj =0;
  nivo++;
  console.log('Promenjen nivo u 206');
  console.log('Nivo je'+nivo);
  $('div').remove('.glavni');


  provera = 0;
   x = nivo * nivo;
  puni_niz = 1;
   brojevi = new Array;
 kontrola_dva = 0;
 kliknute = new Array;
 wrap = $("#wrap");
 clock = $('#clock');
 vreme = nivo*nivo*5;
 frontline = $('#frontline');
 oduzimac = 400 / vreme;
 sirina = 400;
 pozivac(vreme);
 pravi();

}




function pravi() {
  wrap.css({"height": nivo*100+"px", "width": nivo*100+"px"});
// formiram niz sa brojevima koji idu na kvadrate
for (var i = 0; i < x; i++) {
// ukoliko je neparan broj...
  if (x%2 === 1) {
    brojevi.push(puni_niz);
    puni_niz++
    if (puni_niz === (((nivo*nivo)-1)/2)+1) {
      puni_niz = 1;
    }
// ukoliko je paran broj ...
  }else {
    brojevi.push(puni_niz);
    puni_niz++;
    if (puni_niz === ((nivo*nivo)/2)+1) {
      puni_niz = 1;
    }
  }
}
// ukoliko je neparan broj članova niza, brišem zadnji element niza...
if (x%2 === 1) {
  brojevi.pop();
}

//Pravim class i punim ih brojevima

for (var i = 0; i < nivo*nivo; i++) {
  wrap.append("<div class='glavni'>  <div class='zadnji'></div>   <div class='prednji'>Memory</div> </div>");

  }


// evo kako dodati OTV klasi pod nekim rednim brojem
var srednji = (nivo*nivo+1)/2-1;
$('.glavni:eq('+srednji+')').addClass('otv');


//var zadnji = $('.zadnji');
var zadnji = $('.glavni').find('.zadnji');

for (var i = 0; i < nivo*nivo; i++) {

  if (x%2 === 0) {
    var random = Math.floor((Math.random() * brojevi.length));
    zadnji[i].append(brojevi[random]);

    brojevi.splice(random, 1);
  }else {
    if (i != (nivo*nivo+1)/2-1 ) {
      var random = Math.floor((Math.random() * brojevi.length));
      zadnji[i].append(brojevi[random]);

      brojevi.splice(random, 1);
    }
  }

    }
igra();
}







function igra() {

  //brisanje_niza();
  glavni = $(".glavni").not('.otv');
  glavni.click(function() {


  $(this).find('.prednji').css({"transform": "perspective(900px) rotateY(180deg)"});
  $(this).find('.zadnji').css({"transform": "perspective(900px) rotateY(0deg)"});
  provera++;
  kliknute.push($(this));

  if (provera === 2) {
    glavni.off();


    if (kliknute[0].offset().left==kliknute[1].offset().left && kliknute[0].offset().top==kliknute[1].offset().top) {

      kliknute.pop();
      provera = 1;
      igra();
    }else{
    if (kliknute[0].html() === kliknute[1].html()) {

      kliknute[0].find(".prednji").parent().addClass('otv');
      kliknute[1].find(".prednji").parent().addClass('otv');
      poreni = poreni + 1;


      setTimeout(function () {
        kraj++;
        luka();

        brisanje();
        provera = 0;
      },1000);




    }else {
      setTimeout(function() {
        kliknute[0].find('.prednji').css({"transform": "perspective(900px) rotateY(0deg)"});
        kliknute[0].find('.zadnji').css({"transform": "perspective(900px) rotateY(180deg)"});
        kliknute[1].find('.prednji').css({"transform": "perspective(900px) rotateY(0deg)"});
        kliknute[1].find('.zadnji').css({"transform": "perspective(900px) rotateY(180deg)"});
        brisanje();
      },1500);
      //igra();
      provera = 0;


    }

      setTimeout(function () {
        igra();
      }, 1500);

  }
}
  })
}
function brisanje() {
    kliknute.length = 0;
}
function luka() {
//Neparan broj
if (x%2 ===1) {
  if (kraj === (nivo*nivo-1)/2) {
gotov_nivo();
  }
}
if (x%2 === 0) {
if (kraj === (nivo*nivo)/2) {
gotov_nivo();
}
}
}
function pozivac(y) {

loop = setInterval(function () {
  y--;
  sirina = sirina - oduzimac;
  frontline.css({'width':sirina});

  frontline.text(y);

  if (y===0) {

    gubitak();
  }
},1000);
}


function gubitak() {

  clearInterval(loop);
  glavni.off();
//  $('header').html('<h1>Game over</h1>');

  $("#wrap").hide();
  $('#h').append('<p style="text-align:center; margin-top: 30px; font-size: 30px;">You opened '+poreni+' couples</p>');
  $('#rezultat').show();
  $('#rezultat').animate({'marginTop': '30px'}, 1000);
  $("#klikni").on('click', function(){
      var username = $('#text').val();
    if (username != "") {
      $("#klikni").off();
      username = $('#text').val();
      $("#rezultat").fadeOut('slow');
      $("#score").show();
      $("#score").animate({'marginTop': '10px'}, 1000);
      $.post('obrada.php', {'parovi': poreni, 'ime': username}, function(data) {
        $("#score").html(data);
      });
    }

  });
}


function gotov_nivo() {
  console.log("Došao u gotov nivo");
  $('header').find('h1').fadeOut('slow');
  $('header').html('<h1>Level completed</h1> <h3>Go to new level</h3>').hide();
  $('header').fadeIn('slow');
  clearInterval(loop);

  novi_nivo();
//  $('header').on('click', function() {
//    novi_nivo();
//  });

}

});
