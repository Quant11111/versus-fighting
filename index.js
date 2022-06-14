//screen definition
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
//screen display
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

//class sprite
//(sprite = grah element that can moove on the screen)
class Sprite {
  constructor({ position, velocity, color = "red" }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.color = color;
    //lastKey is to be sure the last key pressed is the one we
    //read even if another one is pressed and identified first in the "if loop"
    //so the contition would be if key.pressed = true and key = lastKey
    //the last imput will now always overwrite the others
    this.lastKey = {
      x: "",
      y: "",
    };
  }

  //methods
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, 50, 150);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}

//player construction
const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
player.draw();

//enemy construction
const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
});
enemy.draw();

//keys states
const keys = {
  q: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  z: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

//screen refreshing
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  //velocity depending on keys pressed

  //player keys
  player.velocity.x = 0;
  if (keys.q.pressed && player.lastKey.x == "q") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey.x == "d") {
    player.velocity.x = 5;
  }
  if (keys.z.pressed && player.velocity.y == 0) {
    player.velocity.y = -20;
  }

  //enemy keys
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey.x == "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey.x == "ArrowRight") {
    enemy.velocity.x = 5;
  }
  if (keys.ArrowUp.pressed && enemy.velocity.y == 0) {
    enemy.velocity.y = -20;
  }
}

animate();

//keys listener
window.addEventListener("keydown", (event) => {
  //player press
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey.x = "d";
      break;
    case "q":
      keys.q.pressed = true;
      player.lastKey.x = "q";
      break;
    case "z":
      keys.z.pressed = true;
      player.lastKey.y = "z";
      break;
  }
  //enemy press
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey.x = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey.x = "ArrowLeft";
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      enemy.lastKey.y = "ArrowUp";
      break;
  }
  console.log(event.key);
  console.log(enemy.velocity.y);
});

window.addEventListener("keyup", (event) => {
  //player unpress
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      // player.velocity.x = 0;
      break;
    case "q":
      keys.q.pressed = false;
      // player.velocity.x = 0;
      break;
    case "z":
      keys.z.pressed = false;
      break;
  }
  //enemy unpress
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      // player.velocity.x = 0;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      // player.velocity.x = 0;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
});
