var track;
var player1, playerImg, playerImg2, playerImg3, playerImg4, playerImg5, playerImg6, playerImg7, playerImg8;
var image1, image2, image3, image4, image5;
var spd, spdImg;
var gameOver, gameOverImg;
var getReady, getReadyImg;
var play, playImg;
var restart, restartImg;
var home, homeImg;
var mask, maskImg, sanitizer, sanitizerImg;
var obstaclesGroup;
var death, lifelineSound, bg;
var score = 0;

var gameState = "START";

function preload()
{
	track = loadImage("track.jpg");
	image1 = loadImage("CV1.png");
	image2 = loadImage("CV2.png");
	image3 = loadImage("CV3.png");
	image4 = loadImage("CV3-FINAL.png");
	image5 = loadImage("CV4.png");
	playerImg = loadImage("scoot.png");
	playerImg2 = loadImage("scoot-2.png");
	playerImg3 = loadImage("scoot-3.png");
	playerImg4 = loadImage("scoot-4.png");
	playerImg5 = loadImage("scoot-5.png");
	playerImg6 = loadImage("scoot-6.png");
	playerImg7 = loadImage("scoot-7.png");
	playerImg8 = loadImage("scoot-8.png");
	spdImg = loadImage("spd-1.png");
	gameOverImg = loadImage("gameOver.png");
	getReadyImg = loadImage("getReady.png");
	playImg = loadImage("play.png");
	restartImg = loadImage("restart.png");
	homeImg = loadImage("home.png");
	maskImg = loadImage("masks.png");
	sanitizerImg = loadImage("sanitizer.png");
	death = loadSound("death.wav");
	lifelineSound = loadSound("lifeline.wav");
	bg = loadSound("bg.wav");
}

function setup() {

	rectMode(CENTER);
	createCanvas(700, 600);


	//player = new People(400, 650, 20, 20);

	player1 = createSprite(350, 3800, 20, 20);
	player1.addAnimation("front", playerImg);
	player1.addAnimation("back", playerImg2);
	player1.addAnimation("nw", playerImg3);
	player1.addAnimation("ne", playerImg4);
	player1.addAnimation("right", playerImg5);
	player1.addAnimation("left", playerImg6);
	player1.addAnimation("se", playerImg7);
	player1.addAnimation("sw", playerImg8);
	player1.scale = 0.3;


	gameOver = createSprite(350, 3750);
	gameOver.addImage(gameOverImg);
	gameOver.visible = false;

	getReady = createSprite(350, 3750);
	getReady.addImage(getReadyImg);
	getReady.visible = true;

	play = createSprite(350, 3900);
	play.addImage(playImg);
	play.scale = 0.15;
	play.visible = true;

	restart = createSprite(350, 3900);
	restart.addImage(restartImg);
	restart.scale = 0.3;
	restart.visible = false;

	home = createSprite(450, 3900);
	home.addImage(homeImg);
	home.scale = 0.2;
	home.visible = false;

	obstaclesGroup = new Group();
	lifelinesGroup = new Group();
  
}


function draw() {

  //rectMode(CENTER);

  background(0);



  //player.display();

   //image(track, 0, -displayHeight*3.95,displayWidth,displayHeight*5);
   image(track, -25, -50);
   //image(spdImg, 550, 3975, 125, 115);

   camera.position.y = player1.y;

   if(gameState === "START"){
	   
	   play.visible = true;
	   gameOver.visible = false;
	   player1.visible = false;
	   getReady.visible = true;

	   fill("white");
	   textSize(20);
	   text("All the best 😁👍🏻", 295, 4050);
	   text("Your goal is to reach the hospital 🏥", 200, 4000);
	   text("You're a doctor 👨🏻‍⚕️ and you have to reach", 185, 3650);
	   stroke("black");
  strokeWeight(5);
	   text("Your goal is to reach the hospital ", 200, 4000);
	   text("All the best", 295, 4050);
	   text("As the deadly Coronavirus is spreading,", 190, 3600);
	   text("everyone has to make sure they're safe.", 190, 3625);
	   text("You're a doctor      and you have to reach", 185, 3650);
	   text("the hospital at the end of the road ", 210, 3675);
	   text("Use arrow keys as your control", 210, 4025);
	   text("P.S. - Lifelines give you points", 220, 4085);

   }

   if(gameState === "START" && mousePressedOver(play)){
	   gameState = "PLAY";
	   
   }

   

   if(gameState === "PLAY"){

   if(obstaclesGroup.isTouching(player1)){
	obstaclesGroup.destroyEach();
	death.play();
	lifelinesGroup.destroyEach();
	//player1.destroy();
	gameState = "END";
    }

    if(lifelinesGroup.isTouching(player1)){

	     score = score + 10;
		lifelinesGroup.destroyEach();
		lifelineSound.play();
  
	}

	//bg.loop();

gameOver.visible = false;
play.visible = false;
getReady.visible = false;
player1.visible = true;

//player1.debug = true;

  controls();
  obstacles();
  obstacles2();
  obstacles3();
  obstacles4();
  lifelines();

}

if(gameState === "END"){
	gameOver.visible = true;
	play.visible = false;
	getReady.visible = false;
	player1.visible = false;
	restart.visible = true;
	//home.visible = true;

	fill("white");
	textSize(20);
	text("Haha, better luck next time 😏", 225, player1.y + 250);
	stroke("black");
    strokeWeight(5);
	text("Haha, better luck next time ", 225, player1.y + 250);
	

  }

  if(gameState === "END" && mousePressedOver(restart)){
	reset();
	
}


  drawSprites();

  console.log(gameState);
  //console.log(score);

  

  textSize(20);
  fill("white");
  stroke("black");
  strokeWeight(5);
  text("SCORE : " + score, 550, player1.y - 250);

 
}

function controls(){

	if(keyIsDown(UP_ARROW)){
		player1.y = player1.y - 3.5;
		gameOver.y = gameOver.y - 3.5;
		restart.y = restart.y - 3.5;
		home.y = home.y - 3.5;
		player1.changeAnimation("front", playerImg);
	}

	if(keyIsDown(DOWN_ARROW)){
		player1.y = player1.y + 3.5;
		gameOver.y = gameOver.y + 3.5;
		restart.y = restart.y + 3.5;
		home.y = home.y + 3.5;
		player1.changeAnimation("back", playerImg2);
	}

	if(keyIsDown(RIGHT_ARROW)){
		player1.x = player1.x + 3.5;
		player1.changeAnimation("right", playerImg5);
	}

	if(keyIsDown(LEFT_ARROW)){
		player1.x = player1.x - 3.;
		player1.changeAnimation("left", playerImg6);
	}

	if(keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)){
		player1.changeAnimation("nw", playerImg3);
	}

	if(keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)){
		player1.changeAnimation("ne", playerImg4);
	}

	if(keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)){
		player1.changeAnimation("sw", playerImg8);
	}

	if(keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)){
		player1.changeAnimation("se", playerImg7);
	}

	//camera.position.x = player1.x;
	

	//console.log(player.y);

	

}

function obstacles(){

	if(frameCount % 100 === 0){
	var obstacle = createSprite(100, -500, 20, 20);
	obstacle.shapeColor = "white";
	obstacle.x = Math.round(random(0, 200));
	//obstacle.y = Math.round(random(500, 3850));

	obstacle.velocityY = 10;



	var rand = Math.round(random(1,5));
	switch(rand){
		case 1 :
			obstacle.addImage(image1);
			break;
		case 2 :
			obstacle.addImage(image2);
			break;
		case 3 :
			obstacle.addImage(image3);
			break;
		case 4 :
			obstacle.addImage(image4);
			break;
		case 5 :
			obstacle.addImage(image5);
			break;
	}

	if(rand === 1 || rand === 2){
		obstacle.scale = 0.1;
	} else {

obstacle.scale = 0.35;
	}
obstacle.lifetime = 10000;

obstaclesGroup.add(obstacle);

	}
	
}

function obstacles2(){

	if(frameCount % 75 === 0){
		var obstacle2 = createSprite(300, -500, 20, 20);
		obstacle2.shapeColor = "red";
		obstacle2.x = Math.round(random(200, 400));
		//obstacle.y = Math.round(random(500, 3850));
	
		obstacle2.velocityY = 10;

		var rand = Math.round(random(1,5));
	switch(rand){
		case 1 :
			obstacle2.addImage(image1);
			break;
		case 2 :
			obstacle2.addImage(image2);
			break;
		case 3 :
			obstacle2.addImage(image3);
			break;
		case 4 :
			obstacle2.addImage(image4);
			break;
		case 5 :
			obstacle2.addImage(image5);
			break;
	}
	
	if(rand === 1 || rand === 2){
		obstacle2.scale = 0.1;
	} else {

obstacle2.scale = 0.35;
	}
obstacle2.lifetime = 10000;

obstaclesGroup.add(obstacle2);

	}

}

function obstacles3(){

	if(frameCount % 50 === 0){
		var obstacle3 = createSprite(500, -500, 20, 20);
		obstacle3.shapeColor = "yellow";
		obstacle3.x = Math.round(random(400, 600));
		//obstacle.y = Math.round(random(500, 3850));
	
		obstacle3.velocityY = 10;

		var rand = Math.round(random(1,5));
	switch(rand){
		case 1 :
			obstacle3.addImage(image1);
			break;
		case 2 :
			obstacle3.addImage(image2);
			break;
		case 3 :
			obstacle3.addImage(image3);
			break;
		case 4 :
			obstacle3.addImage(image4);
			break;
		case 5 :
			obstacle3.addImage(image5);
			break;
	}

	if(rand === 1 || rand === 2){
		obstacle3.scale = 0.1;
	} else {

obstacle3.scale = 0.35;
	}
obstacle3.lifetime = 10000;

obstaclesGroup.add(obstacle3);

	
	}

}

function obstacles4(){

	if(frameCount % 125 === 0){
		var obstacle4 = createSprite(500, -500, 20, 20);
		obstacle4.shapeColor = "blue";
		obstacle4.x = Math.round(random(600, 800));
		//obstacle.y = Math.round(random(500, 3850));
	
		obstacle4.velocityY = 10;

		var rand = Math.round(random(1,5));
	switch(rand){
		case 1 :
			obstacle4.addImage(image1);
			break;
		case 2 :
			obstacle4.addImage(image2);
			break;
		case 3 :
			obstacle4.addImage(image3);
			break;
		case 4 :
			obstacle4.addImage(image4);
			break;
		case 5 :
			obstacle4.addImage(image5);
			break;
	}

	if(rand === 1 || rand === 2){
		obstacle4.scale = 0.1;
	} else {

obstacle4.scale = 0.35;
	}
obstacle4.lifetime = 10000;

obstaclesGroup.add(obstacle4);
	
	}

}

function lifelines(){

	if(frameCount % 125 === 0){
		var lifeline = createSprite(500, -500, 20, 20);
	
		lifeline.x = Math.round(random(0, 800));
		//obstacle.y = Math.round(random(500, 3850));
	
		lifeline.velocityY = 10;

		var rand = Math.round(random(1,2));
	switch(rand){
		case 1 :
			lifeline.addImage(maskImg);
			break;
		case 2 :
			lifeline.addImage(sanitizerImg);
			break;
	}

	lifeline.scale = 0.1;
	
	lifeline.lifetime = 10000;

	lifelinesGroup.add(lifeline);

}

}

function reset(){

	gameState = "PLAY";
	player1.x = 350;
	player1.y = 3800;
	gameOver.x = 350; 
	gameOver.y = 3750;
	restart.x = 350;
	restart.y = 3900;
	score = 0;
	gameOver.visible = false;
	getReady.visible = false;
	play.visible = false;
	restart.visible = false;
	home.visible = false;
	player1.changeAnimation("front", playerImg);

}
