var game=true;
var x =0;
var y =0;
var vel = 10;    // velocita
var codax = [];
var coday = [];
var sx = 10;    //x del serpente
var sy = 20;   //y del serpente
var ax= 460;         //x della mela
var ay = 40;         //y della mela
var eat=1;
var hi=0;
var pausa=true;
var reload=false
var inf=true;
function play(){
  document.getElementById("starter").style.visibility="hidden";
  if(inf)document.getElementById("ist").style.visibility="visible";
  document.getElementById("gameover").style.visibility="hidden";
  document.getElementById("container").style.visibility="visible";

  game=true;
   x =0;
   y =0;
   vel = 10;    // velocita
   codax = [];
   coday = [];
   sx = 10;    //x del serpente
   sy = 20;   //y del serpente
   ax= 460;         //x della mela
   ay = 40;         //y della mela
   eat=1;

  start();
}

function start() {
    var sfondo = document.getElementById("canvas1");
    var context = sfondo.getContext("2d");

    document.addEventListener("keydown", comando);
    //document.addEventListener("keydown", closeist);

    if (game && pausa ) {
      translate(context,sfondo);
      apple(context);
      setTimeout("start()", 100);
      document.getElementById("score").innerHTML='SCORE: '+(eat*10-10);
      if(hi<eat){hi=eat;}
      document.getElementById("hscore").innerHTML='HIGT SCORE: '+ (hi*10-10);
    }else {
      //window.alert(pausa);
      if(game)
      {
        document.getElementById("pa").style.visibility="visible";
        document.getElementById("ist").style.visibility="hidden";
       if(reload){
         pausa=true;
         y=0;
         x=0;
         document.getElementById("pa").style.visibility="hidden";
         reload=false;
         if(inf){document.getElementById("ist").style.visibility="visible";}

        }
       setTimeout("start()", 100);
      }else{
        document.getElementById("gameover").style.visibility="visible";
        document.getElementById("Fscore").innerHTML='SCORE: '+(eat*10-10);
        document.getElementById("Hscore").innerHTML='HIGT SCORE: '+(hi*10-10);
      }              //stampa game OVER

    }
  }




  function comando(evento) {
            //prende i comandi dall'utente
    if(evento.keyCode>36){
      document.getElementById("ist").style.visibility="hidden";
      inf=false;
    }

    switch (evento.keyCode) {

    case 37:          //sinistra
      if (x!=1) {
        x = -1;
        y = 0 ;
      }
      break;
    case 38:            //su
      if (y!=1) {
        x = 0 ;
        y = -1;
      }
      break;
    case 39:            //destra
      if (x!=-1) {
        x = 1 ;
        y = 0 ;
      }
    break;
    case 40:            //giu
      if (y!=-1) {
        x = 0 ;
        y = 1 ;
      }
      break;
    default:
    {
      document.getElementById("ist").style.visibility="hidden";
    }
    }
  } //fine

  ////////////////////////////////////////////////////////////////

  function translate(context, sfondo) {            //sposta snake

    sx=sx +(x*vel); //fine coda
    sy=sy + (y*vel); //fine coda
    context.clearRect(0, 0, 500, 500);
    context.fillStyle = "#ffffff"; //COLORE snake

    for(var i=codax.length-1; i>-1; i--){     // sposta coda
        if (i==0) {
            codax[i]=sx+i;
            coday[i]=sy+i;
        }else {
          codax[i]=codax[i-1];
          coday[i]=coday[i-1];
          if (sx==codax[i] && sy== coday[i]) {
            gameover();
          }
        }
      }

    for(var i=0; i<codax.length; i++){    //crea coda
        context.fillRect(codax[i], coday[i], 10, 10);
    }
    if (sx<=-1 || sx>=sfondo.width+1 || sy<=-1 || sy>=sfondo.height+1 ) {
      gameover();
    }

  } //sposta snake fine

  ///////////////////////////////////////////////////////////////

  function apple(context) {               //genera cibo

      if (ax == sx && ay == sy) {
          ax = Math.floor((Math.random() * 497 + 1) / 10) * 10;
          ay = Math.floor((Math.random() * 497 + 1) / 10) * 10;
          eat++;

      }

      if (eat>codax.length) {
          codax.unshift(sx);
          coday.unshift(sy);
      }
      context.fillStyle = "#FF0000";
      context.fillRect(ax, ay, 10, 10);

  }// fine genera cibo

  //////////////////////////////////////////////////////////////////

  function gameover(){ // gameover
    game=false;
  }
