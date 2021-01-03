var dog, happyDog, database, foodS, foodStock,addFood;
var x = 20;
var lastFed,fedTime;
var feed;
var foodObj;

function preload()
{
  dogImage1 = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 800);

  database = firebase.database();

  foodObj = new Food();
  
  dog = createSprite(400,400,40,40);
  dog.addImage(dogImage1);
  dog.scale = 0.3;



  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
  
}


function draw() { 
  
  background("lightgreen");

  foodObj.display();

  fedTime = database.ref("lastFed");
  fedTime.on("value",function(data){
  lastFed = data.val();
  })
  

  text("Food remaining: " + x,400,200);
  textSize(40);

  //if(keyWentDown(UP_ARROW)){
    //  writeStrock(foodS);
      //dog.addImage(dogImage2);
  //}

  

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "pm",350,30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :"+lastFed+"AM",350,30);
  }



  text(" Note:PressUp_ARROWKeyToFeedDragoMilk",400,100)
  drawSprites();
 

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  
  dog.addImage(dogImage2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}


