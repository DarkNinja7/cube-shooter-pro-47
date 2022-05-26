class Game {
  constructor() {
    this.resetTitle = createElement("h2");
   // this.resetButton = createButton("");
this.resetImg = createImg("assets/reset.png");
 
    this.leftKeyActive = false;
   
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    shooter1 = createSprite(width / 2 - 50, height - 100);
    shooter1.addImage("shooter1", redCube);
    shooter1.scale = 0.25;

    shooter2 = createSprite(width / 2 + 100, height - 100);
    shooter2.addImage("shooter2", blueCube);
    shooter2.scale = 0.07;

    shooters = [shooter1, shooter2];

  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetImg.class("resetImg");
   // this.resetButton.position(width / 2 + 230, 100);
    this.resetImg.position(width/2+230,100);
    this.resetImg.size(50,50);

 
  }

  
  handleResetButton() {
    this.resetImg.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }



  handlePlayerControls() {

   if (keyIsDown(UP_ARROW)) {
   player.positionY += 5;
   player.update();
   }

   if (keyIsDown(LEFT_ARROW) ) {
  this.leftKeyActive = true;
  player.positionX -= 5;
  player.update();
   }

   if (keyIsDown(RIGHT_ARROW)) {
  this.leftKeyActive = false;
  player.positionX += 5;
  player.update();
   }

   
   if (keyIsDown(DOWN_ARROW)) {
    player.positionY -= 5;
    player.update();
    }
    
  }

  play() {
    console.log("play");



    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {

    var index = 0;
    for (var plr in allPlayers) {
      //add 1 to the index for every loop
      index = index + 1;

      //use data form the database to display the cars in x and y direction
      var x = allPlayers[plr].positionX;
      var y = height - allPlayers[plr].positionY;

    /*  var currentlife = allPlayers[plr].life;

      if (currentlife <= 0) {
        cars[index - 1].changeImage("blast");
        cars[index - 1].scale = 0.3;
      }*/

      shooters[index - 1].position.x = x;
      shooters[index - 1].position.y = y;

      if (index === player.index) {
        stroke(10);
        fill("white");
        ellipse(x, y, 60, 60);

    /*    this.handleFuel(index);
        this.handlePowerCoins(index);
        this.handleCarACollisionWithCarB(index);
        this.handleObstacleCollision(index);

        if (player.life <= 0) {
          this.blast = true;
          this.playerMoving = false;
        }*/

        // Changing camera position in y direction
        camera.position.y = shooters[index - 1].position.y;
      }
    }

    if (this.playerMoving) {
      player.positionY += 5;
      player.update();
    }

    // handling keyboard events
    this.handlePlayerControls();






    wall1 = createSprite(770,365,1550,10);
    wall1.shapeColor="white";

    wall2 = createSprite(770,1085,1550,10);
    wall2.shapeColor="white";

    wall3 = createSprite(0,700,10,1550);
    wall3.shapeColor="white";

    wall4 = createSprite(1535,700,10,1550);
    wall4.shapeColor="white";

    wall5 = createSprite(770,600,700,10);
    wall5.shapeColor="white";

    wall6 = createSprite(200,800,100,10);
    wall6.shapeColor="white";

    wall7 = createSprite(1335,800,100,10);
    wall7.shapeColor="white";

    drawSprites();
   
    }
  }

}
