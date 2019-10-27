				//cambio nuevo
				const canvas=document.getElementById("myCanvas3");
				const ctx = canvas.getContext("2d");
				canvas.style.background="url('nuevoEscenario4.jpeg')";//imagen de fondo
				//.........................................................
				//variables de Laser,Meteoro,Impacto y Colision
				var LaserHeight=70;//altura del laser
				var LaserWidth=70;//anchura del laser	
				var MeteoroHeight=50;
				var MeteoroWidth=50;
				var origenLaserX=(canvas.width+LaserWidth)-130;
				var origenLaserY=(canvas.height)-43;
				var origenMiraX=174;
				var origenMiraY=125;
				var origenExplosionX=174;
				var origenExplosionY=125;
				var MiraWidth=50;
				var MiraHeight=50;
				var ImpactoTierraWidth=200;
				var ImpactoTierraHeight=200;
				var ExplosionWidth=50;
				var ExplosionHeight=50;
				var impactoX;//variable de dibujos de impacto
				var impactoY;//variable de dibujos de impacto
				var colisionX;//variable de impacto de laser en meteoro eje x
				var colisiony;//variable de impacto de laser en meteoro eje y
				var dx=Math.round(Math.random()*(3.2-1.4)+1.4);//movimiento x del meteoro1
				var dy=-2.5;//movimiento y del meteoro1
				var d2x=Math.round(Math.random()*(-2.1+1)+1);//movimiento x del meteoro2
				var d2y=-2.2;//movimiento y del meteoro2
				var d3x=Math.round(Math.random()*(-2.4+-0.5)+-0.5);//movimiento x del meteoro2
				var d3y=-2.4;//movimiento y del meteoro2
				//.........................................................
				//variables de imagen
				var laser1 = new Image();
				laser1.src = 'laser1.png';
				var mira = new Image();
				mira.src = 'puntoMira.png';
				var meteoro = new Image();
				meteoro.src='meteoro2.png';
				var explosion= new Image();
				explosion.src='explosion.png';
				var torreta0=new Image();
				torreta0.src='0grados.png';
				var torreta45=new Image();
				torreta45.src='45grados.png';
				var torreta90=new Image();
				torreta90.src='90grados.png';
				var impacto=new Image();
				impacto.src='impactotierra.png';
		     	//.........................................................
				var radioLaser=27;//radio de la base refugio
				var meteoro1X=20+Math.round(Math.random()*(295-0));//posición x del meteoro1 dentro del canvas
				var meteoro1Y=0;
				var meteoro2X=20+Math.round(Math.random()*(659-296));
				var meteoro2Y=0;
				var meteoro3X=20+Math.round(Math.random()*(890-660)+660);
				var meteoro3Y=0;
				//.........................................................
				var limite=0;//variable para dibujar impacto en meteoro,probando
				var segundos=4500;//segundos de ataque de meteoros
				var resistencia=190;//impactos de meteoros en base
				var derechaPresionada=false;//variable booleana de boton derecho presionado
				var izquierdaPresionada=false;//variable booleana de boton izquierdo presionado
				var arribaPresionada=false;//variable booleana de boton arriba presionado
				var abajoPresionada=false;//variable booleana de boton abajo presionado
				var espacioPresionada=false;//variable booleana de disparo presionado
				var movimiento=true;//variable booleana que permite movimiento
				var dibujarInicio=true;//variable para dibujar el jeep hacia arriba, explorar uso para el laser
				var colision=false;
				var acierto=false;//acierto de rayo en asteroide
				var Victoria = false;//variable booleana que controla si se ha ganado
				var Derrota = false;//variable booleana que controla si se ha perdido
				//.........................................................
				//variables de sonido 
				var sonidoLaser = new Audio("disparoLaser5.mp3");
				var sonidoColision = new Audio("Sonido_Colision_Meteoro.mp3");
				var sonidoImpacto = new Audio("Sonido_Impacto_Laser.mp3");
				//.........................................................
				//events Listeners de tecla pulsada y suelta
				document.addEventListener("keydown",keyDownHandler, false);
				document.addEventListener("keyup",keyUpHandler, false);
				//funcion de control del evento de tecla pulsada
				function keyDownHandler(e){
					if (e.key=="Right"||e.key=="ArrowRight") {	
						derechaPresionada=true;
					}
					else if(e.key=="Left"||e.key=="ArrowLeft"){
						izquierdaPresionada=true;
					}
					else if(e.key=="Up"||e.key=="ArrowUp"){
						arribaPresionada=true;
					}
					else if(e.key=="Down"||e.key=="ArrowDown"){
						abajoPresionada=true;
					}
					else if(e.key==' '){
						espacioPresionada=true;
						sonidoLaser.play();
						dibujarRayo();
					}
				}
				//funcion de control del evento de tecla levantada
				function keyUpHandler(e){
					if (e.key=="Right"||e.key=="ArrowRight") {
						derechaPresionada=false;
					}
					else if(e.key=="Left"||e.key=="ArrowLeft"){
						izquierdaPresionada=false;
					}
					else if(e.key=="Up"||e.key=="ArrowUp"){
						arribaPresionada=false;
					}
					else if(e.key=="Down"||e.key=="ArrowDown"){
						abajoPresionada=false;
					}
					else if(e.key==' '){
						espacioPresionada=false;
						sonidoLaser.pause();
					}
				}
				//generarMusica
				function generarMusica(){

					document.addEventListener('keydown', teclado, false);
					var reproducir =false;
					let musica = new Audio("musica_laser.mp3");
				  //arranca la música en bucle
				  musica.addEventListener('ended', function() {
				  	this.play();
				  }, false);

				  function resumeAudio () {
				  	if (!reproducir) {
				  		reproducir = true;
				  		musica.play();	
				  	}
				  }
				  function pauseAudio () {
				  	if (reproducir) {
				  		reproducir = false;
				  		musica.pause();
				  	}
				  }
				  function teclado(objeto){
				  	var tecla = objeto.which;
				  	var num;

				  	switch (tecla){
		        		case 77: //m
		        		resumeAudio();
		        		break;
		      			case 78: //n
		      			pauseAudio();
		      			break;
		      		}
		      	}
		      }
				//mecánica de cuenta atras
				function cuentaAtras(){	
					if(segundos>0){	
						contador=segundos-=1.66;
					}
					else{
						segundos=0;
					}
				}
				function Exito(){
					console.log("hola");
					if(Victoria==true){
						alert("MISSION ACCOMPLISHED\nMETEORS DESTROYED");
						document.location.reload();
					}
				}
				function Fracaso(){
					if(Derrota==true){
						alert("MISSION FAILED\nTOO MUCH DAMAGE");
						document.location.reload();
					}
				}
				function dibujarTorreta(){
					ctx.beginPath();
					if((origenMiraX>=820&&origenMiraX<=844)){
						ctx.drawImage(torreta90,origenLaserX,origenLaserY,LaserWidth,LaserHeight)
						ctx.stroke();
					}
					else if((origenMiraX>=600&&origenMiraX<=819)&&(origenMiraY<=540&&origenMiraY>505)){
						ctx.drawImage(torreta0,origenLaserX,origenLaserY,LaserWidth,LaserHeight)
						ctx.stroke();
					}
					else if((origenMiraX>=0&&origenMiraX<=599)&&(origenMiraY<=540&&origenMiraY>505)){
						ctx.drawImage(torreta0,origenLaserX,origenLaserY,LaserWidth,LaserHeight)
						ctx.stroke();
					}
					else if(origenMiraY>540){
						ctx.drawImage(torreta0,origenLaserX,origenLaserY,LaserWidth,LaserHeight)
						ctx.stroke();
					}
					else{
						ctx.drawImage(torreta45,origenLaserX,origenLaserY,LaserWidth,LaserHeight)
						ctx.stroke();
					}
				}
				//colisión de laser con meteoro,trabajando en el
				function dibujarColision(colisionX,colisionY){
					if(colision){
						sonidoColision.play();
						dibujarExplosion();
					}
				}
				//función que dibuja el impacto del meteoro,añadir contador de tiempo
				function dibujarImpacto(impactoX,impactoY){
					ctx.beginPath();
					ctx.drawImage(impacto,impactoX,impactoY,ImpactoTierraWidth,ImpactoTierraHeight);
					ctx.closePath();
				}
				//dibujar mira
				function dibujarMira(){
					ctx.beginPath();
					ctx.drawImage(mira,origenMiraX,origenMiraY,MiraWidth,MiraHeight);
					ctx.closePath();
				}
				//dibujar rayo
				function dibujarRayo(){
					if(espacioPresionada==true){
						ctx.beginPath();
						ctx.moveTo(865,570);
						ctx.lineTo(origenMiraX+25, origenMiraY+24);
						ctx.lineHeight = '30';
						ctx.strokeStyle = "blue";
						ctx.stroke();
					}
				}
				//funcion que dibuja explosión de laser en meteoro
				function dibujarExplosion(colisionX,colisionY){
					ctx.beginPath();
					ctx.drawImage(explosion,colisionX,colisionY,ExplosionHeight,ExplosionWidth);
					ctx.closePath();
				}
				//mecanica de control de escudos
				function controlarDerrota(){			
					if(resistencia<=0){
						Derrota=true;
					}
				}
				function controlarVictoria(){
					if((resistencia>0)&&(segundos==0)){
						Victoria=true;
					}
				}
				//marcador de impactos
				function dibujarContadorImpactos(){
					ctx.font=("14px Arial bolder");
					ctx.fillStyle="black";
					ctx.fillText("Resistance: "+resistencia,canvas.width-100,30+" ");
				}
				//marcador de tiempo
				function dibujarTiempo(){
					cuentaAtras();
					ctx.font=("14px Arial bolder");
					ctx.fillStyle="black";
					ctx.fillText("TIME: "+Math.trunc(segundos/100),canvas.width-300,30+" ");
				}
				//dibujo del Meteoro1
				function dibujarMeteoro1(){
					ctx.beginPath();
							ctx.drawImage(meteoro,meteoro1X,meteoro1Y,MeteoroWidth,MeteoroHeight);//dibujo de huracan1 con imagen
							ctx.closePath();
						}
				//dibujo del Meteoro2
				function dibujarMeteoro2(){
					ctx.beginPath();
							ctx.drawImage(meteoro,meteoro2X,meteoro2Y,MeteoroWidth,MeteoroHeight);//dibujo de huracan1 con imagen
							ctx.closePath();
						}
				//dibujo del Meteoro2
				function dibujarMeteoro3(){
					ctx.beginPath();
							ctx.drawImage(meteoro,meteoro3X,meteoro3Y,MeteoroWidth,MeteoroHeight);//dibujo de huracan1 con imagen
							ctx.closePath();
						}	

						function draw(){
							ctx.clearRect(0,0,canvas.width,canvas.height);
							dibujarTorreta();
							dibujarRayo();
							dibujarMeteoro1();
							dibujarMeteoro2();
							dibujarMeteoro3();
							dibujarColision();
							dibujarMira();
							dibujarContadorImpactos();
							dibujarTiempo();
							controlarVictoria();
							controlarDerrota();
							Exito();
							Fracaso();

							meteoro1X+=dx;
							meteoro1Y-=dy;
							meteoro2X+=d2x;
							meteoro2Y-=d2y;
							meteoro3X+=d3y;
							meteoro3Y-=d3y;
					//choque del meteoro1 con borde superior e inferior
					if((meteoro1Y+40)>=canvas.height){
						colision=true;
						meteoro1Y=0;
						meteoro1X=20+Math.round(Math.random()*(295-0)+20);
						colision=false;
					} 
					//choque del meteoro2 con borde superior e inferior
					if((meteoro2Y+40)>=canvas.height){
						colision=true;
						meteoro2Y=0;
						meteoro2X=20+Math.round(Math.random()*(659-296)+296);//trabajando y adaptando
						colision=false;
					} 
					//choque del meteoro3 con borde superior e inferior
					if((meteoro3Y+40)>=canvas.height){
						colision=true;
						meteoro3Y=0;
						meteoro3X=20+Math.round(Math.random()*(890-660)+660);//trabajando y adaptando
						colision=false;
					} 
					//detección de impacto de meteoro1 con el suelo y dibujo de explosion
					if((meteoro1X>=0&&meteoro1X<=890)&&(meteoro1Y>=canvas.height-45)){
						impactoX=meteoro1X-100;
						impactoY=meteoro1Y-150;
						sonidoColision.play();
						var tiempo=1500;
						resistencia-=10;

						while(tiempo>0){
							tiempo-=0.2;
							dibujarImpacto(impactoX,impactoY);
						}
					}
				//detección de impacto de meteoro2 con el suelo y dibujo de explosion
				if((meteoro2X>=0&&meteoro2X<=890)&&(meteoro2Y>=canvas.height-45)){
					impactoX=meteoro2X-100;
					impactoY=meteoro2Y-150;
					sonidoColision.play();
					var tiempo2=1500;
					resistencia-=10;
					while(tiempo2>0){
						tiempo2-=0.2;
						dibujarImpacto(impactoX,impactoY);
					}
				}
				//detección de impacto de meteoro3 con el suelo y dibujo de explosion
				if((meteoro3X>=0&&meteoro3X<=890)&&(meteoro3Y>=canvas.height-45)){
					impactoX=meteoro3X-100;
					impactoY=meteoro3Y-150;
					sonidoColision.play();
					var tiempo3=1500;
					resistencia-=10;
					while(tiempo3>0){
						tiempo3-=0.2;
						dibujarImpacto(impactoX,impactoY);
					}
				}
					//blanco de laser en meteorito1
					if(((meteoro1X-16)<=origenMiraX)&&(origenMiraX<=(meteoro1X+16))&&((meteoro1Y-16)<=origenMiraY)&&(origenMiraY<=(meteoro1Y+16))
						&&(espacioPresionada==true))
					{	
						limite=300;
						while(limite>0){	
							sonidoImpacto.play();
							limite-=0.60;
							colisionX=origenMiraX;
							colisionY=origenMiraY;
							dibujarExplosion(colisionX,colisionY);
						}
						if(limite<=0){
							meteoro1Y=0;
							meteoro1X=20+Math.round(Math.random()*(295-0)+20);
						}
					}
					//blanco de laser en meteorito2
					if(((meteoro2X-16)<=origenMiraX)&&(origenMiraX<=(meteoro2X+16))&&((meteoro2Y-16)<=origenMiraY)&&(origenMiraY<=(meteoro2Y+16))
						&&(espacioPresionada==true))
					{	
						limite=300;
						while(limite>0){	
							sonidoImpacto.play();
							limite-=0.60;
							colisionX=origenMiraX;
							colisionY=origenMiraY;
							dibujarExplosion(colisionX,colisionY);
						}
						if(limite<=0){
							meteoro2Y=0;
							meteoro2X=20+Math.round(Math.random()*(659-296)+296);
						}
					}
					//blanco de laser en meteorito3
					if(((meteoro3X-16)<=origenMiraX)&&(origenMiraX<=(meteoro3X+16))&&((meteoro3Y-16)<=origenMiraY)&&(origenMiraY<=(meteoro3Y+16))
						&&(espacioPresionada==true))
					{	
						limite=300;
						while(limite>0){	
							sonidoImpacto.play();
							limite-=0.60;
							colisionX=origenMiraX;
							colisionY=origenMiraY;
							dibujarExplosion(colisionX,colisionY);
						}
						if(limite<=0){
							meteoro3Y=0;
							meteoro3X=20+Math.round(Math.random()*(890-660)+660);
						}
					}		
						//movimiento de la mira a la derecha y detección del borde derecho
						if (derechaPresionada&&origenMiraX<canvas.width-MiraWidth) {
								origenMiraX+=10;//10 2
							}
						//movimiento de la mira a la izquierda y detección del borde izquierdo
						else if(izquierdaPresionada&&origenMiraX-MiraWidth>-50){
								origenMiraX-=10;//10	2
							}
						//movimiento de la mira hacia arriba y detección de borde superior
						else if(arribaPresionada&&origenMiraY-MiraHeight>-50){
								origenMiraY-=10;//10 2
							}
							//movimiento de la mira hacia abajo y detección de borde inferior
							else if(abajoPresionada&&origenMiraY<canvas.height-MiraHeight){
								origenMiraY+=10;//10 2
							}
					requestAnimationFrame(draw);//se llama recursivamente
				}
				generarMusica();
				draw();