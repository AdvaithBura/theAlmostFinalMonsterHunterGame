var player, monster1, bow, arrow, playerImg, arrowImg, bowImg, monsterImg, x, ground, button1, text1, arrow2Img, monster3
var gameState = 1;
var arrowState = 1;
var thePosition = 1;
var score = 0;
function preload(){
   playerImg = loadImage("boy.png");
   arrowImg = loadImage("theArrow.png");
   arrow2Img = loadImage("theArrow2.png");
   bowImg = loadImage("bow.png");
   monsterImg = loadImage("monster.png");
}
function setup(){
    createCanvas(1200,400);
    imageMode(CENTER);
    player = createSprite(200,300,100,150);
    player.addImage(playerImg);
    player.scale = 0.13
    //player.debug = true;
    player.setCollider("rectangle", 0,-200,1300,1500);
   // player.visible = false;
    ground = createSprite(600,390,1200,20);

    text1 = createElement("h1","MONSTER HUNTER GAME!");   
    text1.style("color", 'red'); 
    button1 = createButton("Click to play");
    text1.position(400,50);
    button1.position(560,150);
}


function draw(){
    if(gameState === 1){
        player.visible = false;
        ground.visible = false;
        button1.mousePressed(()=>{  
            gameState = 2;
            button1.hide();
            text1.hide();
        })        
    }


    if(gameState ===2){
        player.visible = true;
        ground.visible = true;
      //gravity on player
        player.velocityY = player.velocityY + 0.3;
        player.collide(ground);
        background("white");
        
        text("Score:"+ score, 1000,50);
        if(keyDown(RIGHT_ARROW)){
            player.x = player.x+7
            thePosition = 1
        } 

        if(keyDown(LEFT_ARROW)){
            player.x = player.x -7
            thePosition = 2
        } 

        if(keyWentDown(UP_ARROW)){
        // player.velocityY = -10
        jump();
        }   

    //image(playerImg, player.x,player.y,200,300);
    if(thePosition ===1){
        image(bowImg, player.x+100,player.y,70,150);
    } else{
        image(bowImg, player.x-100,player.y,70,150); 
    }
    //console.log(player.y)
    //var c =ground.y-player.y 

       /* if(player.y >=300){
            player.y = 320
        }*/

    if(keyWentDown("space") && arrowState === 1){
      createArrow();
    }
    if(keyWentUp("space")){
        moveArrow()
    }
    if(arrowState ===2){
    if(arrow.x - player.x >= 600 || player.x-arrow.x >=600){
        arrowState = 1
    }
    }
    if(frameCount % 100 === 0 && frameCount % 200 !== 0){
        monster();
    }   

    if(frameCount % 200 === 0){
        nextMonster();
    }
    
    if(arrow !== undefined){
    collideArrow();
   // console.log(monster.x)
    }
if(monster1 !== undefined){
    if(player.isTouching(monster1)){
gameState = 3;
    }
}

if(monster3 !== undefined){
    if(player.isTouching(monster3)){
        gameState = 3;
    }
}
    if(arrow !== undefined){
     //   console.log(monster1.x-arrow.x);
     if(monster1 !== undefined){
        if(arrow.isTouching(monster1)){
        monster1.destroy();
        monster1.y = -300;
        arrow.destroy();
        arrow.y = -200;
        arrow.x = 3000;
        score++
        }
    }

    if(monster3 !== undefined){
        if(arrow.isTouching(monster3)){
            monster3.destroy()
            arrow.destroy();
            arrow.y = -200;
            arrow.x = 3000;
            monster3.y = -300
            score++
            }
    }
    }
    var button2 = createButton("Click to go to shop");
    button2.position(100,50);
}

if(gameState === 3){
    console.log("You lose!")
}
drawSprites();
}

function jump(){
   /* for(var x = 200; x>=-200; x = x--){
    player.x = player.x - x
    }
    */
   player.velocityY = -11;
}

function monster(){   
    var rand = Math.round(random(1,3))
    var monster = createSprite(1200, 300, 50,50);
    monster1 = monster;
    monster1.addImage(monsterImg);
    monster1.scale = 0.3;
    monster1.velocityX = -5;
}

function nextMonster(){
    var monster2 = createSprite(0, 300, 50,50);
    monster3 = monster2;
    monster3.addImage(monsterImg);
    monster3.scale = 0.3;
    monster3.velocityX = 5;   
}