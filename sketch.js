var dog,dogImg,happyDog, database;
var foodS, foodStock;

function preload()
{
	dogImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500,500);

  dog=createSprite(350,250,60,60);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  
}


function draw() {  
  background(46,139,87);
  drawSprites();

  if(foodS!==undefined){
  textSize(15);
  fill("white");
  text("Note: Press UP_ARROW Key to feed drago milk",100,50);
  text("Food Stock:"+foodS,200,150);
  }

  if(keyWentDown(UP_ARROW)){  
    writeStock(foodS);
    dog.addImage(happyDog);
  }

}
 function readStock(data){
  foodS=data.val();
}
function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


