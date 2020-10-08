var knife,knifeImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var fruit,fruitGroup,fruitImage1,fruitImage2,fruitImage3,fruitImage4,chooseFruit;
var enemy,enemyGroup,enemyImage1,enemyImage2,chooseEnemy;
var gameOver,gameOverImage;
var fruitPopSound,dieSound;
var PLAY = 1;
var END = 2;
var gameState = PLAY;
var position
function preload(){
  knifeImage = loadImage("sword.png");
  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");
  enemyImage1 = loadImage("alien1.png");
  enemyImage2 = loadImage("alien2.png");
  fruitPopSound = loadSound("knifeSwooshSound.mp3");
  dieSound = loadSound("gameover.mp3");
  gameOverImage = loadImage("gameover.png")
}

function setup() {
  createCanvas(400,400)
  
  knife = createSprite(200,200,20,20)
  knife.addImage(knifeImage);
  knife.scale = 0.5;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
}

function draw(){
  background('chocolate');
  if(gameState === PLAY) {
    if(knife.isTouching(fruitGroup)) {
      score = score + 2;
      fruitGroup.destroyEach();
      fruitPopSound.play();
    }
    //if(knife.is)

    //knife.debug = true

    knife.x = World.mouseX;
    knife.y = World.mouseY;

    fill('blue');
    textSize(20);
    text('score: ' + score,160,30);

    drawSprites();

    if(frameCount % 100 === 0 && frameCount != 0) {
      spawnFruit();
    }

    if(frameCount % 110 === 0 && frameCount != 0) {
      spawnEnemy();
    }
    
    if(knife.isTouching(enemyGroup)) {
      dieSound.play();
      
      gameState = END;
    }
  } else {
    knife.x = 200;
    knife.y = 200;
    knife.changeImage(gameOverImage);
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
  }
}

function spawnFruit() {
  fruit = createSprite(400,Math.round(random(0,400)),20,20);
  position = Math.round(random(1,2));
  fruit.lifetime = 80;
  fruit.scale = 0.2;
  if(position === 1) {
    fruit.x = 0;
    if(score<4) {
      fruit.velocityX = 5;
    } else {
      fruit.velocityX = 8;
    }
  } else {
    fruit.x = 400;
    if(score<4) {
      fruit.velocityX = -5;
    } else {
      fruit.velocityX = -8;
    }
  }
  fruitGroup.add(fruit);
  chooseFruit = Math.round(random(1,4));
  //console.log(chooseFruit);
  switch(chooseFruit) {
    case 1: fruit.addImage(fruitImage1);
      break;
    case 2: fruit.addImage(fruitImage2);
      break;
    case 3: fruit.addImage(fruitImage3);
      break;
    case 4: fruit.addImage(fruitImage4);
      break;
  }
}

function spawnEnemy() {
  position = Math.round(random(1,2));
  enemy = createSprite(400,Math.round(random(0,400)),20,20);
  enemy.lifetime = 80;
  //consolle.log()
  if(position === 1){
    enemy.x = 400 
    if(score<10) {
      enemy.velocityX = -5;
    }
    else
    {
      enemy.velocityX = -10;
    }
  }
  else if(position === 2){
    enemy.x = 0;
    if(score<10) {
      enemy.velocityX = 5;
    }
    else
    {
      enemy.velocityX = 10;
    }
  }
  
  enemyGroup.add(enemy);
  chooseEnemy = Math.round(random(1,2));
  switch(chooseEnemy){
    case 1: enemy.addImage(enemyImage1);
      break;
    case 2: enemy.addImage(enemyImage2);
      break;
  }
}
