var rainDrop;
var dropSpeed;
var dropGroup;
var rainFloor, rainWallL, rainWallR;
var windSlider;
var dropNumber;

function setup() {
  createCanvas(500, 500);

  //Drop Properties
  dropNumber = 100;
  dropSpeed = 5;

  //Boundaries
  rainFloor = createSprite(250, 500, 500, 5);
  rainFloor.shapeColor = "Black";

  rainWallL = createSprite(0, 250, 5, 500);
  rainWallL.shapeColor = "Black";

  rainWallR = createSprite(500, 250, 5, 500);
  rainWallR.shapeColor = "Black";

  //Creates rain drops
  dropGroup = new Group();
  for (let i = 0; i < dropNumber; i++) {
    rainDrop = createSprite(random(0, 500), random(-500, -100), 2, 10);
    rainDrop.shapeColor = "White";
    rainDrop.velocity.y = dropSpeed + random(-2, 2);
    dropGroup.add(rainDrop);
  }

  //Creates slider
  windSlider = createSlider(-10, 10, 0, 1);
  windSlider.position(10, 10);
  windSlider.style("width", "100px");
}

function draw() {
  background(50, 50, 50);
  drawSprites();

  //Respawns drops
  dropGroup.collide(rainFloor, (a) => {
    a.position.y = random(-100, 0);
    a.velocity.y = dropSpeed;
  });

  dropGroup.collide(rainWallL, (a) => {
    a.position.x = random(480, 490);
  });

  dropGroup.collide(rainWallR, (a) => {
    a.position.x = random(10, 20);
  });

  //Change Attributes of rain drops
  applyWind(windSlider.value());
  rainGravity();
}

function applyWind(wind) {
  //If slider changes, apply value to rain drop velocity
  if (windSlider.value() != 0) {
    for (let i = 0; i < dropNumber; i++) {
      dropGroup.get(i).velocity.x = wind;
    }
  } else {
    for (let i = 0; i < dropNumber; i++) {
      dropGroup.get(i).velocity.x = 0;
    }
  }
}

function rainGravity() {
  //Accelerates rain drops
  for (let i = 0; i < dropNumber; i++) {
    dropGroup.get(i).velocity.y += 0.04;
  }
}
