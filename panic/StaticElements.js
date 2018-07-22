var canv = document.getElementById("staticElements")
var contx = canv.getContext("2d");

class component2{
  constructor(width, height, color, x, y, type){
    this.color = color;
    this.type = type;
    if (type == "image") {
      this.image = new Image();
      this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.endX = 0;
    this.endY = 0;
    this.startX = 0;
    this.startY = 0;
    this.posKeeper = 0;
    this.friendly = true;

  }

    update() {
    contx.globalCompositeOperation="destination-over";

      if (this.type == "image") {
        contx.drawImage(this.image, 
        this.x, 
        this.y,
        this.width, this.height);
      } 
      else {
        contx.fillStyle = this.color;
        contx.fillRect(this.x, this.y, this.width, this.height);

      }
    }

    newPos(){
        this.y += this.speedY;
        this.x += this.speedX;
    }
    crashWith(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width-20);
        var mytop = this.y+20;
        var mybottom = this.y + (this.height-20);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }   
}
heart = new component2(210, 48, "assets/Gucci Gayge Full.png", 20, 20, "image");

function updateBossHealth(badGuy){
	bossHealth.width -= (bossHealth.width/badGuy.health);
	console.log(badGuy.health)
}
function clearBoard() {
    contx.clearRect(0, 0, canv.width, canv.height);
}

function setHealth(){
    switch(player.health){
    case 5:
      heart.image.src = "assets/Gucci Gayge 5_6.png"
      break;
    case 4:
      heart.image.src = "assets/Gucci Gayge 4_6.png"
      break;
    case 3:
      heart.image.src = "assets/Gucci Gayge 3_6.png"
      break;
    case 2:
      heart.image.src = "assets/Gucci Gayge 2_6.png"
      break;
    case 1:
      heart.image.src = "assets/Gucci Gayge 1_6.png"
      break;
    case 0:
      heart.image.src = "assets/Dead Gayge.png"
      break;
  }
}
		bossHealth = new component2(494, 3, "green", 150, 450, "a");

function updatehearts(){
	clearBoard();
	heart.update();
	bossHealth.update();

}
setInterval(updatehearts, 20);