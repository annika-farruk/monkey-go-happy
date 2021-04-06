
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var survivaltime=1;
var gameState = 1;
var END = 0;
var play = 1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(300,350,600,3);
  ground.velocityX=-5;
  ground.x = ground.width /4;
  console.log(ground.X);
 
  ground.velocityX = -6;
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  
}


function draw() {
  background("white");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate())
  text("Survival Time = "+survivaltime,100,50);
  
  monkey.collide(ground);
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }
  
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    survivaltime=0;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    survivaltime = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);  
  }
  
  if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  
   if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
     obstacleGroup.destroyEach();
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  if(ground.x>400){
     ground.x=300;
     }
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY +0.8;
  
  spawnObstacles();

  drawSprites();
}

function spawnObstacles(){
  if(frameCount%70===0){
    obsticals = createSprite(300,325,50,50);
    banana = createSprite(300,200,20,20);
    obsticals.addImage(obstacleImage);
    banana.addImage(bananaImage);
    obsticals.velocityX = -6;
    banana.velocityX = -6
    obsticals.scale = 0.100;
    banana.scale = 0.100;
    obsticals.x = Math.round(random(600,550));
    obsticals.lifetime = 200;
    obstacleGroup.add(obsticals);
    FoodGroup.add(banana);
  }
}