var player;
var supullet;
var enemyBullet;
var direction = 4;
var allGameElements = [];
var enemyBullets = [];
var enemyBulletSpiral = [];
var p1bullet = [];
var subnum = 0;
var obje;
var color;
var hearts = [];
var heartX = 20;
var enemy = null;
var enemyPat = true;
var fireCtrl = 0;
var EBS;
var spiralSpeedY = 5;
var spiralSpeedX = 0;
var spirCtrl = 0;
var supullets = []
var bossHealth;
var scrollElements = [];
var scrollX;
var scrollY;
var created = false;
var dmg;
var boss2 = null;
var sprayBulletsArray = [];
var boss2Pet = null;
var b2Bullets;	
var itemChest = null;
var getPreviousPlayerPos = false;
var petDirection = "left";
var mimicBullets = [];
var mpBullets
var moveItem = true;
var spawnOne = false;
var playerMovementSpeed = 4;
var level = 0;
var portal = null;
var d1;
var d2;
var d3;
var bulletsNumber = 1;
var setSpeedArray = [];
var ctx;
var tempSpeedX;
var tempSpeedY;
var noobMinions = [];
var minion = null;
var noobPet = null;
var noobBoss = null;
var spinny = null;
var mimicBullets = [];
var waitToLoad = [];

var pleaseLoadMeFirstBeforeYouStartPlaying = new Image(70, 58.45);
pleaseLoadMeFirstBeforeYouStartPlaying.src = "assets/Player Sprite Dab Red Eyes.png";

var pleaseLoadMeFirstBeforeYouStartPlaying2 = new Image(70, 58.45);
pleaseLoadMeFirstBeforeYouStartPlaying2.src = "assets/Player Sprite.png";

var pleaseLoadMeFirstBeforeYouStartPlaying3 = new Image(70, 58.45);
pleaseLoadMeFirstBeforeYouStartPlaying3.src = "assets/Player Spritefl.png";

waitToLoad.push(pleaseLoadMeFirstBeforeYouStartPlaying);
waitToLoad.push(pleaseLoadMeFirstBeforeYouStartPlaying2);
waitToLoad.push(pleaseLoadMeFirstBeforeYouStartPlaying3);


function circlePath(following) {
    circle.centerX = following.x + following.width / 2;
    circle.centerY = following.y + following.height / 2;
    spinny.x = circle.centerX + Math.cos(circle.angle) * circle.radius;
    spinny.y = circle.centerY + Math.sin(circle.angle) * circle.radius;
    circle.angle += ball.speed;
}

var circle = {
    centerX: 250,
    centerY: 250,
    radius: 200,
    angle: 0
}
var ball = {
    x: 0,
    y: 0,
    speed: 0.1
}

function startGame() {
    myGameArea.start();
    createGif(0, 0, "");
    portal = new component(90, 127.5, "assets/Door (Closed).png", 950, 400, "image");
    player = new component(70, 58.45, "assets/Player Sprite.png", 450, 200, "image");
    allGameElements.push(portal);
    document.getElementById("staticElements").style.opacity = 1;
    // createEnemy(650, 300, 650, 500);
    // createNoobBoss();
    player.health = 6;
    setHealth();

    player.friendly = true;
    allGameElements.push(player);
    pleaseLoadMeFirstBeforeYouStartPlaying.onload = requestAnimationFrame(updateGameArea);
}



var levelChanged = false;

function removeFromAll(removed) {
    index = allGameElements.indexOf(removed);

    if (index > -1) {
        allGameElements.splice(index, 1);
    }
}

function createNoobBoss() {
    noobBoss = new component(170, 229, "assets/The Jackhammer.png", 650, 300, "image");
    noobBoss.health = 10;
    noobBoss.isBoss = true;
    noobBoss.friendly = false;
    allGameElements.push(noobBoss);
    spinny = new component(30, 30, "red", ball.x, ball.y)
    allGameElements.push(spinny);


}

function setLevel() {

    switch (level) {
        case 0:
            removeFromAll(portal);
            portal = null;
            supullets = [];
            bossHealth = new component2(494, 3, "green", 150, 450, "a");
            createPopUp("assets/BIGNIBBA.jpg", "cutScene");
            $('#close').on("click", function() {
                $('#close').hide();
                $('#setting').fadeOut(1000, function() {
                    created = false;
                    createEnemy(650, 300, 650, 500);
                    player.x = 100;
                    player.y = 100;
                    $("#close").remove();
                    $("#setting").remove();
                    level += 1;
                })
            })
            timeUntilGone = 0;
            destroyBoss = false;
            break;
        case 1:
            immunityFrame.frame = 0;
            immunityFrame2.frame = 0;
            supullets = [];
            removeFromAll(portal);
            removeFromAll(itemChest);
            portal = null;
            itemChest = null;
            bossHealth = new component2(494, 3, "green", 150, 450, "a");
            createPopUp("assets/BIGNIBBA.jpg", "cutScene");
            $('#close').on("click", function() {
                $('#close').hide();
                $('#setting').fadeOut(1000, function() {
                    created = false;
                    createEnemy2(750, 300);
                    player.x = 100;
                    player.y = 100;
                    level += 1;
                    $("#close").remove();
                    $("#setting").remove();
                })
            })
           	destroyBoss = false;

            timeUntilGone = 0;
            break;
        case 2:
            immunityFrame.frame = 0;
            immunityFrame2.frame = 0;
            supullets = [];
            removeFromAll(portal);
            removeFromAll(itemChest);
            portal = null;
            itemChest = null;
            bossHealth = new component2(494, 3, "green", 150, 450, "a");
            createPopUp("assets/BIGNIBBA.jpg", "cutScene");
            $('#close').on("click", function() {

                $('#close').hide();
                $('#setting').fadeOut(1000, function() {

                    created = false;
                    createNoobBoss();
                    player.x = 100;
                    player.y = 100;
                    level += 1;
                    $("#close").remove();
                    $("#setting").remove();
                })
            })
        	destroyBoss = false;
            timeUntilGone = 0;

            break;
    }

}

function correspondItem() {
    switch (itemChosen) {
        case 0:
            return dmg;
            break;
        case 1:
            return mspd;
            break;
    }
}
var itemIndex;
var itemsArray = [0, 1];
var itemChosen = -1;

function spawnItems() {
    if (!spawnOne) {
        portal = new component(90, 127.5, "assets/Door (Closed).png", 950, 400, "image");
        allGameElements.push(portal);
        player.x = 550;
        player.y = 400;
        player.speedX = 0;
        player.speedY = 0;
        itemIndex = Math.floor((Math.random() * itemsArray.length))
        itemAcquired();
        $("#itemScreen").fadeIn(1000).delay(4000).fadeOut(1000, function() {
            $("#itemScreen").remove();
        });

        itemChosen = itemsArray[itemIndex];
        itemsArray.splice(itemIndex, 1)
        switch (itemChosen) {
            case 0:
                dmg = new component(50, 50, "assets/Subreme Powerup Pickup.png", 725, 450, "image");
                allGameElements.push(dmg);
                break;
            case 1:
                mspd = new component(60, 32.4, "assets/Ravin' Robo Boy.png", 725, 450, "image");
                allGameElements.push(mspd);
                break;
        }
        spawnOne = true;
    }
}

function itemMoveOutOfChest(subject) {

    subject.y = 550;

}


function resetGif(w, h) {
    document.getElementById("dddeath").src = "assets/death/death.gif";
    document.getElementById("dddeath").width = w;
    document.getElementById("dddeath").height = h;
}

function createGif(w, h, alt) {
	var pParent = document.getElementById("popUpParent");
    var x = document.createElement("IMG");
    x.setAttribute("src", "assets/death/death.gif");
    x.setAttribute("width", w);
    x.setAttribute("height", h);
    x.setAttribute("alt", alt);
    x.setAttribute("class", "ddeath");
    x.setAttribute("id", "dddeath");
    pParent.appendChild(x);
}
//var sup1 = new SuperGif({ gif: document.getElementById('example1') } );
//sup1.load();
var stop = false;

function centerBossY() {
    if (stop == false) {
        if (enemy.y == 400 - enemy.height / 2) {
            enemy.speedY = 0;
            stop = true;
        } else {
            if (enemy.y > 400 - enemy.height / 2) {
                enemy.speedY = -1;
            } else if (enemy.y < 400 - enemy.height / 2) {
                enemy.speedY = 1;
            }

        }
    }
}

function scrollWrapper(x, y) {
    var elmnt = document.getElementById("wrapper");
    elmnt.scrollLeft = x;
    elmnt.scrollTop = y;
}

function createEnemy2(x, y) {
    created = false;
    boss2 = new component(180, 207, "assets/Boss 2 (Medicated Mushroom).png", x, y, "image");
    boss2.friendly = false;
    boss2.health = 10;
    boss2.isBoss = true;
    timeUntilGone = 0;
    allGameElements.push(boss2);

}
var roamNewDirection = 0;
var speedXrandom = 0;
var speedYrandom = 0;

function roam(theEnemy) {
    bounceToggle = true;
    if (roamNewDirection % 150 == 0) {
        speedXrandom = roundTo(Math.random() * 1.5, 2) + 1;
        speedXrandom *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        speedYrandom = roundTo(Math.random() * 1.5, 2) + 1;
        speedYrandom *= Math.floor((Math.random() * 2)) == 1 ? 1 : -1;
        theEnemy.speedX = speedXrandom;
        theEnemy.speedY = speedYrandom;
    }
    roamNewDirection += 1;
}
var jumpCounter = 0;
var tempBossY = 0;
var jumpSetup = false;
var bounceToggle = true;
var goUp = true;
var goDown = true;
var sprayNumber;
var sprayBullets;
var sBX;
var sBY;
var sprayOnce = true;
var chargeUp = 0;
var Boss2Attacking = false;
var Boss2Atk = [1, -1];
var Boss2Action = 0;
var boss2IsAlive = true;
var moveActive = true;
var atkTime = 0;
var immunityFrame = {
    frames: 0
};
var immunityFrame2 = {
    frames: 0
};

function immunity(numOfFrames, frameVar) {
    frameVar.frames += 1;
    canTakeDamage = false;
    if (frameVar.frames == 1 || frameVar.frames > numOfFrames) {
        canTakeDamage = true;
    } else {
        canTakeDamage = false;
    }
}

function bulletsDamage(subject, damager, damage) {
    for (i = 0; i < damager.length; i++) {
        if (damager[i].crashWith(subject)) {
            subject.health -= damage;
            damager[i] = null;
            damager.splice(i, 1)
            if (subject.friendly) {
                setHealth();
            } else if (subject.isBoss) {
                updateBossHealth(subject);
            }
        }
    }
}
//var clearCoolDown = 0;
//function regularlyClearBullets(){
//	if(clearCoolDown > 200){
//		sprayBulletsArray = [];
//	}
//}
var mimic = null;
var atkIndex2;
var trueRandom;
var centerOnce = false;
var prevPlayerX = 0;
var prevPlayerY = 0;
var createMimic = false;
var burstControl = 0;
var spiral1Toggle = true;
var spiral2Toggle = false;
var spiral3Toggle = false;
var spiral4Toggle = false;
var circleFireCtrl = 0;
var itemProp = {
    width: 0,
    height: 0
}
var itemSrcArray = ["assets/Subreme Powerup Pickup.png", "assets/Ravin' Robo Boy.png", "assets/Wack Ass Cryptocurrency.png", "assets/Portrait of Your Mom.png"]

function defineItemWidth(iDex) {
    switch (iDex) {
        case 0:
            itemProp.width = 20;
            itemProp.height = 19;
            break;
        case 1:
            itemProp.width = 30;
            itemProp.height = 17;
            break;
        case 2:
            itemProp.width = 25;
            itemProp.height = 12;
            break;
        case 3:
            itemProp.width = 20;
            itemProp.height = 29;
            break;
    }
}

function circleFire(enemynum) {
    circleFireCtrl += 1;
    if (circleFireCtrl % 100 == 0) {
        for (var cc = 0; cc < 25; cc++) {
            var randomItemIndex = Math.floor(Math.random() * itemSrcArray.length);
            defineItemWidth(randomItemIndex);
            EBS = new component(itemProp.width, itemProp.height, itemSrcArray[randomItemIndex], enemynum.x + enemynum.width / 2, enemynum.y + enemynum.height / 2, "image");
            EBS.speedY = spiralSpeedY;
            EBS.speedX = spiralSpeedX;
            if (spiral1Toggle) {
                spiralSpeedY -= 1;
                spiralSpeedX += 1;
            } else if (spiral2Toggle) {
                spiralSpeedX -= 1;
                spiralSpeedY -= 1;

            } else if (spiral3Toggle) {
                spiralSpeedX -= 1;
                spiralSpeedY += 1;
            } else if (spiral4Toggle) {
                spiralSpeedX += 1;
                spiralSpeedY += 1;
            }

            if (spiralSpeedX == 5) {
                spiral1Toggle = false;
                spiral2Toggle = true;
            }

            if (spiralSpeedY == -5) {
                spiral2Toggle = false;
                spiral3Toggle = true;

            }
            if (spiralSpeedX == -5) {
                spiral3Toggle = false;
                spiral4Toggle = true;
            }
            if (spiralSpeedY == 5) {
                spiral4Toggle = false;
                spiral1Toggle = true;
            }
            mimicBullets.push(EBS);
        }
    }
}
var burstTimes = 0;

function burstFire(enemynum) {
    enemynum.speedX = 0;
    enemynum.speedY = 0;
    burstControl += 1;
    if (burstControl > 70 && burstControl % 5 == 0) {
        enemyBullet = new component(10, 10, "red", enemynum.x + enemynum.width / 2, enemynum.y + enemynum.height / 2, "a");
        enemyBullet2 = new component(10, 10, "red", enemynum.x + enemynum.width / 2, enemynum.y + enemynum.height / 2, "a");
        enemyBullet3 = new component(10, 10, "red", enemynum.x + enemynum.width / 2, enemynum.y + enemynum.height / 2, "a");

        enemyBullet.friendly = false;
        if (burstControl > 120) {
            burstControl = 1;
            burstTimes += 1;
        }
        //	TAKES THE DIFFERENCE BETWEEN ENEMY AND PLAYER

        var ydif = (player.y + player.height / 2) - enemynum.y - enemynum.height / 2;
        var xdif = (player.x + player.width / 2) - enemynum.x - enemynum.width / 2;

        //	MULTIPLIER CALCULATES THE NUMBER THAT WOULD MAKE
        //	THE SUM OF X AND Y 5 WHILE MAINTAINING THE RATIO;

        if (ydif <= 0 && xdif >= 0) {
            var multiplier = (xdif * -1 + ydif) / 8;
        } else if (ydif >= 0 && xdif <= 0) {
            var multiplier = (xdif + ydif * -1) / 8;
        } else {
            var multiplier = (xdif + ydif) / 8;
        }

        if (ydif <= 0 && xdif >= 0) {
            enemyBullet.speedX = (-xdif / multiplier);
            enemyBullet.speedY = (-ydif / multiplier);
        } else if (xdif <= 0 && ydif <= 0) {
            enemyBullet.speedX = (-xdif / multiplier);
            enemyBullet.speedY = (-ydif / multiplier);
        } else if (ydif >= 0 && xdif <= 0) {
            enemyBullet.speedX = (-xdif / multiplier);
            enemyBullet.speedY = (-ydif / multiplier);
        } else if (ydif >= 0 && xdif >= 0) {
            enemyBullet.speedX = (xdif / multiplier);
            enemyBullet.speedY = (ydif / multiplier);
        } else if (ydif = 0) {
            enemyBullet.speedX = (-xdif / multiplier);
            enemyBullet.speedY = (ydif / multiplier);
        } else {
            enemyBullet.speedX = (-xdif / multiplier);
            enemyBullet.speedY = (-ydif / multiplier);
        }

        enemyBullet2.speedX = enemyBullet.speedX + 2
        enemyBullet2.speedY = enemyBullet.speedY - 2
        enemyBullet3.speedX = enemyBullet.speedX - 2
        enemyBullet3.speedY = enemyBullet.speedY + 2
        mimicBullets.push(enemyBullet);
        mimicBullets.push(enemyBullet2);

        mimicBullets.push(enemyBullet3);
    }
}
var mimicAttacks = [0, 1];
var mimicAttackIndex = -1;
var chooseAttackInterval = 0;
var mimicAttacking = false;
var followInterval = 0;
var mimicIsAlive = true;
var mimicPet = null;
var destroyBoss = false;

function mimicBehavior() {
    mimic.health <= 0 ? mimicIsAlive = false : mimicIsAlive = true;
    if (mimicIsAlive) {
        bulletsDamage(player, mimicBullets, 1)
        bulletsDamage(mimic, supullets, 1)
        if (!mimicAttacking) {
            followInterval += 1;
            chooseAttackInterval += 1;
            if (followInterval < 70) {
                followPlayer(mimic, player, 2)
            } else {
                mimic.speedX = 0;
                mimic.speedY = 0;
                if (followInterval > 250) {
                    followInterval = 0;
                }
            }

            if (chooseAttackInterval % 400 == 0) {
                mimicAttackIndex = Math.floor(Math.random() * 2)
                mimicAttacking = true;
            }
        } else {
            mimic.speedX = 0;
            mimic.speedY = 0;
            if (mimicAttacks[mimicAttackIndex] == 0) {
                burstFire(mimic);
                if (burstTimes >= 5) {
                    mimicAttacking = false;
                    burstTimes = 0;
                    burstControl = 0;
                    followInterval = 0;
                }
            } else if (mimicAttacks[mimicAttackIndex] == 1) {
                circleFire(mimic);
                if (circleFireCtrl >= 400) {
                    mimicAttacking = false;
                    circleFireCtrl = 0;
                    followInterval = 0;
                }
            }
        }
    }
    //  burstFire(mimic);
    else {
        universalBossDeath(mimic, true);
        if (destroyBoss) {
        	destroyBoss = false;
            mimic = null;
            mimicPet = new component(65, 24, "assets/mimic.png", player.x - player.width, player.y + player.height, "image");
            allGameElements.push(mimicPet);
            bulletsNumber += 1;
        }
    }
}

function spawnMimic() {
    bossHealth = new component2(494, 3, "green", 150, 450, "a");

    removeFromAll(itemChest)
    itemChest = null;
    mimic = new component(534, 200, "assets/mimic.png", 750 - 231, 400 - 86, "image");
    mimic.friendly = false;
    mimic.isBoss = true;
    mimic.health = 1;
    allGameElements.push(mimic);
}

function dontfuckingwalkonchests() {
    if (itemChest !== null) {
        if (player.crashWith(itemChest)) {
            if (getPreviousPlayerPos) {
                prevPlayerX = player.x;
                prevPlayerY = player.y;
                getPreviousPlayerPos = false;


            } else {
                if (createMimic) {
                    spawnMimic();
                } else {
                    itemChest.image.src = "assets/Treasure Chest Opened.png";


                    itemChest.height = 263;
                    itemChest.y = 400 - 131;


                    player.x = prevPlayerX;
                    player.y = prevPlayerY;
                    spawnItems();
                    itemMoveOutOfChest(correspondItem());
                }
            }
        } else {
            getPreviousPlayerPos = true;
        }
    }
}
var ragePause = 0;

function boss2Behavior() {
    collisionDamage(boss2, player, immunityFrame);

    if (boss2.health <= 0) {
    	boss2IsAlive = false;
        universalBossDeath(boss2, true)
        if (destroyBoss) {
        	destroyBoss = false;
            boss2 = null;
            boss2Pet = new component(40, 44, "assets/Lil' Mush.png", player.x - player.width, player.y + player.height, "image");
            allGameElements.push(boss2Pet);
            bulletsNumber += 1;
        }
    }

    if (boss2IsAlive) {
        bulletsDamage(player, sprayBulletsArray, 1);
        if (player.Bitem) {
            bulletsDamage(boss2, supullets, 1.3);
        } else {
            bulletsDamage(boss2, supullets, 1);

        }
    }
    if (boss2IsAlive && boss2.health > 100) {
        if (!Boss2Attacking) {
            atkTime = 0;
            roam(boss2);
            bounce(boss2);
            myGameArea.frameNo += 1;
            if (everyinterval(150)) {
                trueRandom = Math.random();
                atkIndex2 = Math.floor(roundTo(trueRandom));

                Boss2Action = Boss2Atk[atkIndex2];
                Boss2Attacking = true;

            }
        } else {
            switch (Boss2Action) {
                case -1:
                    if (Boss2Attacking) {
                        atkTime += 1;
                        sprayBulletsArray = [];
                        dash(boss2);
                        bounce(boss2);
                    }
                    if (atkTime > 550) {
                        slightPause = 0;
                        stopMeter = 0;
                        stopSetting = false;
                        dashSetup = false;
                        Boss2Action = 0;
                        Boss2Attacking = false;
                        atkTime = 0;
                    }
                    break;
                case 1:
                    if (Boss2Attacking) {
                        jump(boss2);
                    }
                    if (sprayOnce == false) {
                        sprayOnce = true;
                        Boss2Attacking = false;
                        Boss2Action = 0;
                        jumpSetup = false;
                        chargeUp = 0;
                        boss2.image.src = "assets/Boss 2 (Medicated Mushroom).png"
                        boss2.width = 180;
                        boss2.height = 207;

                    }
                    break;
                case 0:
                    break;
            }

        }
    } else if (boss2IsAlive && boss2.health <= 100) {
        if (!centerOnce) {
            boss2.x = 750 - boss2.width / 2;
            boss2.y = 400 - boss2.height;
            boss2.speedX = 0;
            boss2.speedY = 0;
            centerOnce = true;
        }
        if (ragePause > 200) {
            jumpRage(boss2);
        } else {
            ragePause += 1;
        }
    }
}
var jumpSrcs = ["assets/Earth Fragment 01.png", "assets/Earth Fragment 02.png", "assets/Earth Fragment 03.png", "assets/Earth Fragment 04.png"];
var srcIndex = 0;

function jump(subject) {
    if (chargeUp < 60) {
        boss2.speedX = 0;
        boss2.speedY = 0;
        boss2.image.src = "assets/Boss 2 (Medicated Mushroom) charge up.png";

    }
    if (chargeUp > 60) {
        bounceToggle = false;
        if (!jumpSetup) {
            tempBossY = subject.y;
            jumpSetup = true;
            subject.speedX = 0;
            subject.speedY = 0;
            jumpCounter = 0;
            sprayOnce = true;
            goUp = true;
        } else {
            boss2.image.src = "assets/Boss 2 (Medicated Mushroom) jump.png"

            if (subject.y > tempBossY - 100 && goUp) {
                subject.speedY = -4;
            } else {
                goUp = false;
                jumpCounter += 1;
                subject.speedY = 0;
                if (jumpCounter >= 35) {
                    if (subject.y < tempBossY && goDown) {
                        subject.speedY = 4;
                    } else {
                        subject.speedY = 0;
                        subject.y = tempBossY;
                        sprayNumber = Math.floor(Math.random() * 90) + 70;
                        if (sprayOnce) {
                            for (i = 0; i < sprayNumber; i++) {
                                sBX = roundTo(Math.random() * 7, 2) + 3;
                                sBX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                                sBY = roundTo(Math.random() * 7, 2) + 3;
                                sBY *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                                while (Math.abs(sBX) + Math.abs(sBY) < 5) {
                                    sBX = roundTo(Math.random() * 7, 2) + 3;
                                    sBX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                                    sBY = roundTo(Math.random() * 7, 2) + 3;
                                    sBY *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                                }
                                srcIndex = Math.floor(roundTo(Math.random() * 3));
                                sprayBullets = new component(20, 20, jumpSrcs[srcIndex], (subject.x + (subject.width / 2)), subject.y + subject.height, "image");
                                sprayBullets.speedX = sBX;
                                sprayBullets.speedY = sBY;
                                sprayBulletsArray.push(sprayBullets);

                            }
                            boss2.image.src = "assets/Boss 2 (Medicated Mushroom) charge up.png";

                            sprayOnce = false;
                        }
                    }
                }
            }
        }
    } else {
        chargeUp += 1;
    }
}

function jumpRage(subject) {
    if (chargeUp < 20) {
        boss2.image.src = "assets/Boss 2 (Medicated Mushroom) charge up.png";

    }
    if (chargeUp > 20) {
        bounceToggle = false;
        if (!jumpSetup) {
            tempBossY = subject.y;
            jumpSetup = true;
            subject.speedX = 0;
            subject.speedY = 0;
            jumpCounter = 0;
            sprayOnce = true;
        } else {
            boss2.image.src = "assets/Boss 2 (Medicated Mushroom) jump.png"

            if (subject.y > tempBossY - 100 && goUp) {
                subject.speedY = -6;
            } else {
                goUp = false;
                jumpCounter += 1;
                subject.speedY = 0;
                if (jumpCounter >= 15) {
                    if (subject.y < tempBossY && goDown) {
                        subject.speedY = 6;
                    } else {
                        subject.speedY = 0;
                        subject.y = tempBossY;
                        jumpSetup = false;
                        sprayNumber = Math.floor(Math.random() * 20) + 40;
                        if (sprayOnce) {
                            for (i = 0; i < sprayNumber; i++) {
                                sBX = roundTo(Math.random() * 7, 2) + 3;
                                sBX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                                sBY = roundTo(Math.random() * 7, 2) + 3;
                                sBY *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                                while (Math.abs(sBX) + Math.abs(sBY) < 5) {
                                    sBX = roundTo(Math.random() * 7, 2) + 3;
                                    sBX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                                    sBY = roundTo(Math.random() * 7, 2) + 3;
                                    sBY *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                                }
                                srcIndex = Math.floor(roundTo(Math.random() * 3));
                                sprayBullets = new component(20, 20, jumpSrcs[srcIndex], (subject.x + (subject.width / 2)), subject.y + subject.height, "image");

                                sprayBullets.speedX = sBX;
                                sprayBullets.speedY = sBY;
                                sprayBulletsArray.push(sprayBullets);
                            }
                            goUp = true;
                            sprayOnce = false;
                            chargeUp = 0;
                        }
                    }
                }
            }
        }
    } else {
        chargeUp += 1;
    }
}

function bounce(subject) {
    if (bounceToggle) {
        if (subject.y <= 0) {
            subject.y = 1;
            subject.speedY *= -1;
        }
        if (subject.y >= 800 - subject.height) {
            subject.y = 799 - subject.height;
            subject.speedY *= -1;


        }
        if (subject.x <= 0) {
            subject.x = 1;
            subject.speedX *= -1;


        }
        if (subject.x >= 1500 - subject.width) {
            subject.y = 1499 - subject.width;
            subject.speedX *= -1;
        }
    }
}
var stopMeter;
var dashSetup = false;
var tempX;
var tempY;
var slightPause = 0;
var stopSetting = false;

function bossPetBehavior(operation, petName, xoffset, yoffset) {
    if (petName !== null) {
        if (operation == "left") {
            petName.x = player.x - player.width / 2 - xoffset;
            petName.y = player.y + (player.height / 2) - yoffset;
        } else if (operation == "right") {
            petName.x = player.x + player.width / 2 + xoffset;
            petName.y = player.y + (player.height / 2) + yoffset;
        }
    }
}

function disappearWhenTouchingWall(bulletsArray) {
    for (i = 0; i < bulletsArray.length; i++) {
        if (bulletsArray[i].y <= 0 - bulletsArray[i].height) {
            bulletsArray[i] = null;
            bulletsArray.splice(i, 1)
        } else if (bulletsArray[i].y >= 800 + bulletsArray[i].height) {
            bulletsArray[i] = null;
            bulletsArray.splice(i, 1)
        } else if (bulletsArray[i].x <= 0 - bulletsArray[i].width) {
            bulletsArray[i] = null;
            bulletsArray.splice(i, 1)
        } else if (bulletsArray[i].x >= 1500 + bulletsArray[i].width) {
            bulletsArray[i] = null;
            bulletsArray.splice(i, 1)
        }
    }
}

function dash(enemynum) {
    bounceToggle = true;
    if (slightPause == 150) {
        if (!dashSetup) {
            stopMeter = 0;
            tempX = player.x;
            tempY = player.y;
            dashSetup = true;
        } else {
            stopMeter += 1;
        }
        //	TAKES THE DIFFERENCE BETWEEN ENEMY AND PLAYER

        var ydif2 = (tempY + 20) - enemynum.y;
        var xdif2 = (tempX) - enemynum.x;

        //	MULTIPLIER CALCULATES THE NUMBER THAT WOULD MAKE
        //	THE SUM OF X AND Y 5 WHILE MAINTAINING THE RATIO;
        if (stopMeter !== 150 && !stopSetting) {
            stopSetting = true;
            if (ydif2 < 0 && xdif2 >= 0) {
                var multiplier2 = (xdif2 * -1 + ydif2) / 10;
            } else if (ydif2 >= 0 && xdif2 < 0) {
                var multiplier2 = (xdif2 + ydif2 * -1) / 10;
            } else {
                var multiplier2 = (xdif2 + ydif2) / 10;
            }
            if (player.y < enemynum.y) {
                enemynum.speedX = -(xdif2 / multiplier2);
                enemynum.speedY = -(ydif2 / multiplier2);


            } else if (player.y > enemynum.y && player.x < enemynum.x) {
                enemynum.speedX = (-xdif2 / multiplier2);
                enemynum.speedY = (-ydif2 / multiplier2);
            } else if (player.y == enemynum.y) {
                enemynum.speedX = (-xdif2 / multiplier2);
                enemynum.speedY = (ydif2 / multiplier2);
            } else {
                enemynum.speedX = (xdif2 / multiplier2);
                enemynum.speedY = (ydif2 / multiplier2);
            }
        } else {
            if (stopMeter == 150) {
                enemynum.speedX = 0;
                enemynum.speedY = 0;
                slightPause = 0;
                stopMeter = 0;
                stopSetting = false;
                dashSetup = false;
            } else {
                return
            }
        }
    } else {
        slightPause += 1;
    }
}

function createEnemy(startX, startY, endX, endY) {
    enemy = new component(200, 147, "assets/Stalincat.png", startX, startY, "image");
    enemy.endX = endX;
    enemy.friendly = false;
    enemy.endY = endY;
    enemy.startX = startX;
    enemy.startY = startY;
    enemy.health = 10;
    enemy.isBoss = true;
    allGameElements.push(enemy);
}

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if (negative) {
        n = (n * -1).toFixed(2)
    }
    return n;
}


function enemyFireSpiral(enemynum) {
    if (spirCtrl % 5 == 0) {
        EBS = new component(10, 10, "red", enemynum.x + enemynum.width / 2, enemynum.y + enemynum.height / 1.7, "a");
        EBS.speedY = spiralSpeedY;
        EBS.speedX = spiralSpeedX;
        if (spiral1Toggle) {
            spiralSpeedY -= 0.5;
            spiralSpeedX += 0.5;
        } else if (spiral2Toggle) {
            spiralSpeedX -= 0.5;
            spiralSpeedY -= 0.5;

        } else if (spiral3Toggle) {
            spiralSpeedX -= 0.5;
            spiralSpeedY += 0.5;
        } else if (spiral4Toggle) {
            spiralSpeedX += 0.5;
            spiralSpeedY += 0.5;
        }
        if (roundTo(spiralSpeedX, 2) == 5) {
            spiral1Toggle = false;
            spiral2Toggle = true;

        }
        if (roundTo(spiralSpeedY, 2) == -5) {
            spiral2Toggle = false;
            spiral3Toggle = true;

        }
        if (roundTo(spiralSpeedX, 2) == -5) {
            spiral3Toggle = false;
            spiral4Toggle = true;
        }
        if (roundTo(spiralSpeedY, 2) == 5) {
            spiral4Toggle = false;
            spiral1Toggle = true;
        }
        enemyBulletSpiral.push(EBS);
        scrollElements.push(EBS);

    }

    spirCtrl += 1;

    //   else if((roundTo(spiralSpeedY, 2) <= -5)){
    //     spiralSpeedY+=0.1;
    //     spiralSpeedX -=0.1;
    //   }
    // }
}


// else if()

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

function enemyFire(enemynum) {
    if (fireCtrl % 20 == 0) {
        enemyBullet = new component(10, 10, "red", enemynum.x + enemynum.width / 2, enemynum.y + enemynum.height / 1.7, "a");

        enemyBullet.friendly = false;

        //	TAKES THE DIFFERENCE BETWEEN ENEMY AND PLAYER

        var ydif = (player.y) - enemynum.y - enemynum.height / 1.7;
        var xdif = (player.x) - enemynum.x - enemynum.width / 2;

        //	MULTIPLIER CALCULATES THE NUMBER THAT WOULD MAKE
        //	THE SUM OF X AND Y 5 WHILE MAINTAINING THE RATIO;

        if (ydif <= 0 && xdif >= 0) {
            var multiplier = (xdif * -1 + ydif) / 5;
        } else if (ydif >= 0 && xdif <= 0) {
            var multiplier = (xdif + ydif * -1) / 5;
        } else {
            var multiplier = (xdif + ydif) / 5;
        }

        if (ydif <= 0 && xdif >= 0) {
            enemyBullet.speedX = (-xdif / multiplier);
            enemyBullet.speedY = (-ydif / multiplier);
        } else if (xdif <= 0 && ydif <= 0) {
            enemyBullet.speedX = (-xdif / multiplier);
            enemyBullet.speedY = (-ydif / multiplier);
        } else if (ydif >= 0 && xdif <= 0) {
            enemyBullet.speedX = (-xdif / multiplier);
            enemyBullet.speedY = (-ydif / multiplier);
        } else if (ydif >= 0 && xdif >= 0) {
            enemyBullet.speedX = (xdif / multiplier);
            enemyBullet.speedY = (ydif / multiplier);
        } else if (ydif = 0) {
            enemyBullet.speedX = (-xdif / multiplier);
            enemyBullet.speedY = (ydif / multiplier);
        } else {
            enemyBullet.speedX = (-xdif / multiplier);
            enemyBullet.speedY = (-ydif / multiplier);
        }
        enemyBullets.push(enemyBullet);

    }
    fireCtrl += 1;


}


function within(num1, num2, range) {
    if (num1 == num2) {
        return (true)
    } else {
        if (num1 > num2) {
            if (num1 - num2 <= range) {
                return (true);
            } else {
                return (false);
            }
        } else {
            if (num2 - num1 <= range) {
                return (true);
            } else {
                return (false);
            }
        }
    }
}

function enemyMovePattern() {
    if (moveActive && enemy !== null) {
        if (enemy.y == enemy.endY) {
            if (enemy.x < enemy.endX) {
                enemy.speedX = 1;

                if (within(enemy.x, enemy.endX, 3)) {
                    enemy.posKeeper = enemy.endX;
                    enemy.endX = enemy.startX;
                    enemy.startX = enemy.posKeeper;
                }
            }
        } else if (enemy.x > enemy.endX) {
            enemy.speedX = -1;
            if (within(enemy.x, enemy.endX, 3)) {
                enemy.posKeeper = enemy.endX;
                enemy.endX = enemy.startX;
                enemy.startX = enemy.posKeeper;
            }
        } else if (enemy.x == enemy.endX) {
            if (enemy.y < enemy.endY) {
                enemy.speedY = 1;
                if (within(enemy.y, enemy.endY, 3)) {
                    enemy.posKeeper = enemy.endY;
                    enemy.endY = enemy.startY;
                    enemy.startY = enemy.posKeeper;
                }
            } else if (enemy.y > enemy.endY) {
                enemy.speedY = -1;
                if (within(enemy.y, enemy.endY, 3)) {
                    enemy.posKeeper = enemy.endY;
                    enemy.endY = enemy.startY;
                    enemy.startY = enemy.posKeeper;
                }
            }
        }
    }
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1500;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        this.canvas.setAttribute("class", "gameBG");
        document.getElementById("wrapper").insertBefore(this.canvas, document.getElementById("wrapper").childNodes[0]);
        this.frameNo = 0;


    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}


class component {
    constructor(width, height, color, x, y, type) {
        this.ctx = myGameArea.context;
        this.isBoss = false;
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
        this.Bitem = false;
        this.robot = false;
        this.health = 0;
        
    }

    update() {
        this.ctx.globalCompositeOperation = "destination-over";
        if (this.type == "image") {
            this.ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);

        }
    }

    newPos() {
        this.y += this.speedY;
        this.x += this.speedX;
    }
    crashWith(otherobj) {
        if (otherobj == player) {
            var myleft = this.x;
            var myright = this.x + this.width;

        } else {
            var myleft = this.x;
            var myright = this.x + (this.width);
        }
        var mytop = this.y;
        var mybottom = this.y + (this.height);
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

function shoot() {
    supullet = new component(50, 50, "assets/Supreme Ammo.png", player.x + (player.width / 2), player.y, "image");
    if (player.Bitem == true) {
        supullet.image.src = "assets/Subreme Ammo.png"
        B = new component(20, 20, "assets/Subreme Powerup Pickup.png", player.x + (player.width / 2), player.y + 30, "image")
        supullets.push(B);
        setSpeedArray.push(B);
    }
    if (player.robot == true) {
        notes = new component(20, 28, "assets/Robo Boy Bullet.png", player.x + (player.width / 2), player.y - 15, "image")
        supullets.push(notes);
        setSpeedArray.push(notes);
    }
    supullets.push(supullet);
    setSpeedArray.push(supullet);
    if (boss2Pet !== null) {
        b2Bullets = new component(10, 10, "assets/Earth Fragment 01.png", boss2Pet.x + 10, boss2Pet.y, "image");
        supullets.push(b2Bullets);
        setSpeedArray.push(b2Bullets);
    }
    if (noobPet !== null) {
        npBullets = new component(10, 10, "red", noobPet.x, noobPet.y + 10);
        supullets.push(npBullets);
        setSpeedArray.push(npBullets);
    }
    if (mimicPet !== null) {
        mpBullets = new component(10, 10, "red", mimicPet.x, mimicPet.y + 10);
        supullets.push(mpBullets);
        setSpeedArray.push(mpBullets);
    }
}

// function component(width, x, y){
//   this.width = width;
//   this.x = x;
//   this.y = y;
//   this.speedX = 0;
//   this.speedY = 0;
//   ctx = myGameArea.context;
//   ctx.fillStyle = "red";
//   ctx.arc(x,y,width,0,2*Math.PI);
//   ctx.fill();
//    this.update = function() {
//         ctx = myGameArea.context;
//         ctx.arc(x,y,width,0,2*Math.PI);
//         ctx.fill();

//     }
//     this.newPos = function() {
//         this.x += this.speedX;
//         this.y += this.speedY; 
//     } 
// }
function dontfuckingwalkthroughwalls(subject) {
    if (player.y <= 0) {
        player.speedY = 0;
    }
    if (player.y >= 800 - player.height) {
        player.speedY = 0;
    }
    if (player.x <= 0) {
        player.speedX = 0;
    }
    if (player.x >= 1500 - player.width) {
        player.speedX = 0;
    }
}

var attacking = false;
var Boss1Atk = [-1, 1];
var Boss1Action = 0;
var enemyIsAlive = true;
var moveActive = true;

// function scroll(){
//     var originalSpeedX = 0;
//       if(player.x >=600){
//         player.x = 600;
//       for(i = 0; i<scrollElements.length; i++){
//         try{
//         originalSpeedX = scrollElements[i].speedX;
//         }
//         catch{
//           console.log(scrollElements[i]);
//         }
//         scrollElements[i].speedX = originalSpeedX -2 ;
//       }  
//     }
// }

function portalBehavior() {
    if (portal !== null) {
        if (within(player.x, portal.x + portal.width / 2, 150) && within(player.y, portal.y + portal.height / 2, 150)) {
            portal.image.src = "assets/Door (Opened).png";
        } else {
            portal.image.src = "assets/Door (Closed).png"
        }
        if (player.crashWith(portal)) {
            setLevel();
        }
    }
}

function boss1Behavior() {
    enemyMovePattern();
    if (attacking == false) {
        myGameArea.frameNo += 1;
    }
    if (enemy.health <= 0) {
    	enemyIsAlive = false;
        universalBossDeath(enemy, true)
        if (destroyBoss) {
        	destroyBoss = false;
            enemy = null;
            //        document.getElementById("example1").style.opacity = 1;
            //        sup1.play();
        }
    }
    if(enemyIsAlive){
    if (Boss1Action == 1) {
        enemyBulletSpiral = [];
        attacking = true;
        enemyFire(enemy);
        if (fireCtrl == 300) {
            attacking = false;
            Boss1Action = 0;
            fireCtrl = 0;
        }
    } else if (Boss1Action == -1) {
        enemyBullets = [];
        attacking = true;
        enemy.speedX = 0;
        enemy.speedY = 0;
        enemyFireSpiral(enemy);
        if (spirCtrl == 300) {
            attacking = false;
            Boss1Action = 0;
            spirCtrl = 0;
            enemyBullets = [];
        }

    }

    if ((everyinterval(150)) && (attacking == false) && (enemyIsAlive)) {
        var indexnum = Math.floor(roundTo(Math.random()))
        Boss1Action = Boss1Atk[indexnum]
    }
    if (player.Bitem == false) {
        bulletsDamage(enemy, supullets, 1)
    } else {
        bulletsDamage(enemy, supullets, 1.3)

    }
    bulletsDamage(player, enemyBullets, 1)
    bulletsDamage(player, enemyBulletSpiral, 1)
    }
}

var timeUntilGone = 0;
var index;

function collisionDamage(enemyName, target, frameVar) {
    if (enemyName.crashWith(target)) {
        immunity((enemyName == spinny ? 4 : 100), frameVar);
        if (canTakeDamage) {
            target.health -= 1;
            setHealth();
            if (frameVar.frames > (enemyName == spinny ? 4 : 100)) {
                frameVar.frames = 1;

            }
        }
    } else {
        frameVar.frames = (enemyName == spinny ? 1 : 0);
    }
}
var spawnCount = 0;

function noobMinionBehavior() {
    bulletsDamage(player, noobMinions, 1);

    for (var j = 0; j < noobMinions.length; j++) {
        followPlayer(noobMinions[j], player, Math.floor(Math.random() * 3) + 5);
        bulletsDamage(noobMinions[j], supullets, player.Bitem ? 1.3 : 1);

        if (noobMinions[j].health <= 0) {
            noobMinions[j] = null;
            noobMinions.splice(j, 1);
        }
    }
}

function spawnMinions() {
    spawnCount = Math.floor(Math.random() * 3) + 1;
    for (i = 0; i < spawnCount; i++) {
        minion = new component(40, 40, "blue", (noobBoss.x + Math.floor(Math.random() * 201) - 100), (noobBoss.y + Math.floor(Math.random() * 201) - 100));
        minion.health = 10;
        minion.friendly = false;
        noobMinions.push(minion);
    }
}
var noobBossIsAlive = true;

function noobBossBehavior() {
    if (noobBossIsAlive) {
        myGameArea.frameNo += 1;
        followPlayer(noobBoss, player, 2);
        collisionDamage(noobBoss, player, immunityFrame);
        collisionDamage(spinny, player, immunityFrame2);
        bulletsDamage(noobBoss, supullets, (player.Bitem) ? 1.3 : 1)
        bulletsDamage(spinny, supullets, 0);
        noobBoss.health <= 0 ? noobBossIsAlive = false : noobBossIsAlive = true;
        if (minion !== null) {
            noobMinionBehavior()
        }
        if (everyinterval(800)) {
            spawnMinions();
        }
    } else {
        universalBossDeath(noobBoss, true)
        if (destroyBoss) {
   	        createMimic = true;

            noobBoss = null;
            noobPet = new component(34, 46, "assets/The Jackhammer.png", player.x - player.width, player.y + player.height, "image");
            allGameElements.push(noobPet);
            bulletsNumber += 1;
        }
    }
}

function updateEverything() {

    for (var x = 0; x < allGameElements.length; x++) {
        allGameElements[x].newPos();
        allGameElements[x].update();
    }
    bossPetBehavior(petDirection, boss2Pet, 20, 0);
    bossPetBehavior(petDirection, noobPet, 40, 0);
    bossPetBehavior(petDirection, mimicPet, 60, 0);
    disappearWhenTouchingWall(enemyBullets)

    if (level == 1) {
        for (i = 0; i < enemyBullets.length; i += 1) {
            enemyBullets[i].newPos();
            enemyBullets[i].update();
        }
        disappearWhenTouchingWall(enemyBulletSpiral)
        for (i = 0; i < enemyBulletSpiral.length; i += 1) {
            enemyBulletSpiral[i].newPos();
            enemyBulletSpiral[i].update();
        }
    }
    disappearWhenTouchingWall(supullets);
    // trackEnemy(enemy, supullets)

    for (i = 0; i < supullets.length; i += 1) {
        supullets[i].newPos();
        supullets[i].update();
    }
    for (var b = 0; b < mimicBullets.length; b += 1) {
        mimicBullets[b].newPos();
        mimicBullets[b].update();
    }
    disappearWhenTouchingWall(mimicBullets);

    if (level == 3) {
        for (x = 0; x < noobMinions.length; x++) {

            noobMinions[x].newPos();
            noobMinions[x].update();
        }
    }

    if (level == 2) {

        disappearWhenTouchingWall(sprayBulletsArray);

        for (i = 0; i < sprayBulletsArray.length; i += 1) {
            sprayBulletsArray[i].newPos();
            sprayBulletsArray[i].update();
        }
    }
}

var fps = 50;

function updateGameArea() {
    requestAnimationFrame(updateGameArea);
    myGameArea.clear();
    if (player.x >= 400) {
        scrollX = player.x - 400;
    } else {
        scrollX = 0;
    }
    if (player.y >= 250) {
        scrollY = player.y - 250;
    } else {
        scrollY = 0;
    }

    scrollWrapper(scrollX, scrollY);
    if (noobPet !== null) {
        circlePath(noobPet)
    }
    if (noobBoss !== null) {
        circlePath(noobBoss);

        noobBossBehavior();
    }
    updateEverything();
    dontfuckingwalkthroughwalls();
    portalBehavior();
    if (itemChest !== null) {
        dontfuckingwalkonchests();
    }

    if (enemy !== null) {
        boss1Behavior();
    }
    if (boss2 !== null) {
        boss2Behavior();
    }
    if (mimic !== null) {
        mimicBehavior();
    }

    getItem(correspondItem());
}



function getItem(item) {
    if (item != null) {
        if (player.crashWith(item)) {
            var index = allGameElements.indexOf(item);
            if (index > -1) {
                allGameElements.splice(index, 1);
                item = null;
            }
            if (correspondItem() == dmg) {
                player.Bitem = true;
                bulletsNumber += 1;
            } else if (correspondItem() == mspd) {
                player.robot = true;
                playerMovementSpeed = 6;
                bulletsNumber += 1;
            }
        }
    }
}

function moveup() {
    if (player.y <= 0) {
        player.y = player.y;
    } else {
        player.speedY = -playerMovementSpeed;
    }
}

function movedown() {
    if (player.y >= 800 - player.height) {
        player.speedY = 0;
    } else {
        player.speedY = playerMovementSpeed;
    }
}


function moveleft() {
    if (player.x <= 0) {
        player.speedX = 0;
    } else {
        player.speedX = -playerMovementSpeed;
        player.image = pleaseLoadMeFirstBeforeYouStartPlaying3;

    }
}

function moveright() {
    if (player.x >= 1500 - player.width) {
        player.speedx = 0;
    } else {
        player.speedX = playerMovementSpeed;
        player.image = pleaseLoadMeFirstBeforeYouStartPlaying2;
    }
}
window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == '87') {
        direction = 1;
        moveup();

    }
    if (key == '65') {
        direction = 2;
        moveleft();
        petDirection = "right";
    }
    if (key == '68') {
        direction = 4;
        moveright();
        petDirection = "left";
    }
    if (key == '83') {
        direction = 3;
        movedown();
    }
    if (key == "37" || key == "38" || key == "39" || key == "40") {
        player.image = pleaseLoadMeFirstBeforeYouStartPlaying;
    }

}
var bulletsSpeed = 5;
var index2;

function setAllBulletSpeedX(thespeedofbullets) {
    for (i = 0; i < bulletsNumber; i++) {
        for (z = 0; z < setSpeedArray.length; z++) {
            if (z <= 0) {
                setSpeedArray[z].speedX = thespeedofbullets;
                setSpeedArray.splice(z, 1);
            }
        }
    }
}

function setAllBulletSpeedY(thespeedofbullets) {
    for (i = 0; i < bulletsNumber; i++) {
        for (z = 0; z < setSpeedArray.length; z++) {
            if (z <= 0) {
                setSpeedArray[z].speedY = thespeedofbullets;
                setSpeedArray.splice(z, 1);
            }
        }
    }
}
window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == '87') {
        player.speedY = 0;
    } else if (key == '65') {
        player.speedX = 0;
    } else if (key == '68') {
        player.speedX = 0;
    } else if (key == '83') {
        player.speedY = 0;
    }
    if (key == '38') {
        shoot();
        setAllBulletSpeedY(-bulletsSpeed);

        // if(boss2Pet!=null){
        //  b2Bullets.speedY = -bulletsSpeed;
        // }
        //    supullet.speedY = -bulletsSpeed;
        player.image = pleaseLoadMeFirstBeforeYouStartPlaying2;
    }
    if (key == "40") {
        shoot();
        setAllBulletSpeedY(bulletsSpeed);
        // if(boss2Pet!=null){
        // 	 b2Bullets.speedY = bulletsSpeed
        //  }
        //    supullet.speedY = bulletsSpeed;
        player.image = pleaseLoadMeFirstBeforeYouStartPlaying2;

    }
    if (key == "37") {
        shoot();
        setAllBulletSpeedX(-bulletsSpeed);

        // if(boss2Pet!=null){
        // 	 b2Bullets.speedX = -bulletsSpeed;
        //  }
        //    supullet.speedX = -bulletsSpeed;
        player.image = pleaseLoadMeFirstBeforeYouStartPlaying3;
    }
    if (key == "39") {
        shoot();
        setAllBulletSpeedX(bulletsSpeed);

        // if(boss2Pet!=null){
        //  b2Bullets.speedX = bulletsSpeed;
        // }
        //  if(player.notes = true){
        //    b2Bullets.speedX = bulletsSpeed;
        //  }
        //   supullet.speedX = bulletsSpeed;
        player.image = pleaseLoadMeFirstBeforeYouStartPlaying2;
    }
}

function followPlayer(enemyName, target, speed) {
    var yLen = (enemyName.y) - target.y + target.height / 3;
    var xLen = (enemyName.x) - target.x + target.width / 3;

    //  MULTIPLIER CALCULATES THE NUMBER THAT WOULD MAKE
    //  THE SUM OF X AND Y 5 WHILE MAINTAINING THE RATIO;
    if (yLen <= 0 && xLen >= 0) {
        multiplier3 = (xLen * -1 + yLen) / speed;
    } else if (yLen >= 0 && xLen <= 0) {
        multiplier3 = (xLen + yLen * -1) / speed;
    } else {
        multiplier3 = (xLen + yLen) / speed;
    }

    if ((yLen <= 0 && xLen >= 0) || (xLen <= 0 && yLen <= 0) || (yLen >= 0 && xLen <= 0)) {
        targetSpeedX = (xLen / multiplier3);
        targetSpeedY = (yLen / multiplier3);
    } else if (yLen >= 0 && xLen >= 0) {
        targetSpeedX = (-xLen / multiplier3);
        targetSpeedY = (-yLen / multiplier3);
    } else if (yLen = 0) {
        targetSpeedX = (xLen / multiplier3);
        targetSpeedY = (-yLen / multiplier3);
    } else {
        targetSpeedX = (xLen / multiplier3);
        targetSpeedY = (yLen / multiplier3);
    }
    if (enemyName.speedX >= targetSpeedX) {

        enemyName.speedX = targetSpeedX


        if (targetSpeedY <= 0) {
            enemyName.speedY = targetSpeedY;
        } else {
            enemyName.speedY = targetSpeedY;

        }
    } else if (enemyName.speedX < targetSpeedX) {

        enemyName.speedX = targetSpeedX;
        if (targetSpeedY <= 0) {
            enemyName.speedY = targetSpeedY;
        } else {
            enemyName.speedY = targetSpeedY;

        }

    }


}


function trackEnemy(enemyName, trackArray) {
    if (enemyName !== null) {
        trackTime += 1;

        for (i = 0; i < trackArray.length; i++) {
            var yLen = (trackArray[i].y) - enemyName.y - enemyName.height / 1.7;
            var xLen = (trackArray[i].x) - enemyName.x - enemyName.width / 2;

            //  MULTIPLIER CALCULATES THE NUMBER THAT WOULD MAKE
            //  THE SUM OF X AND Y 5 WHILE MAINTAINING THE RATIO;
            if (trackTime % 50 == 0 || subPixelRendering) {
                if (Math.abs(xLen) + Math.abs(yLen) < 500) {
                    if (yLen <= 0 && xLen >= 0) {
                        multiplier3 = (xLen * -1 + yLen) / 5;
                    } else if (yLen >= 0 && xLen <= 0) {
                        multiplier3 = (xLen + yLen * -1) / 5;
                    } else {
                        multiplier3 = (xLen + yLen) / 5;
                    }

                    if ((yLen <= 0 && xLen >= 0) || (xLen <= 0 && yLen <= 0) || (yLen >= 0 && xLen <= 0)) {
                        targetSpeedX = (xLen / multiplier3);
                        targetSpeedY = (yLen / multiplier3);
                    } else if (yLen >= 0 && xLen >= 0) {
                        targetSpeedX = (-xLen / multiplier3);
                        targetSpeedY = (-yLen / multiplier3);
                    } else if (yLen = 0) {
                        targetSpeedX = (xLen / multiplier3);
                        targetSpeedY = (-yLen / multiplier3);
                    } else {
                        targetSpeedX = (xLen / multiplier3);
                        targetSpeedY = (yLen / multiplier3);
                    }
                    if (trackArray[i].speedX >= targetSpeedX) {

                        trackArray[i].speedX -= subPixelRendering ? 0.01 : 1;


                        if (targetSpeedY <= 0) {
                            trackArray[i].speedY -= subPixelRendering ? 0.01 : 1;
                        } else {
                            trackArray[i].speedY += subPixelRendering ? 0.01 : 1;

                        }
                    } else if (trackArray[i].speedX < targetSpeedX) {

                        trackArray[i].speedX += subPixelRendering ? 0.01 : 1;
                        if (targetSpeedY <= 0) {
                            trackArray[i].speedY -= subPixelRendering ? 0.01 : 1;
                        } else {
                            trackArray[i].speedY += subPixelRendering ? 0.01 : 1;

                        }

                    }
                    var bulSpeedX = parseFloat(trackArray[i].speedX);
                    trackArray[i].speedX = +bulSpeedX.toFixed(2);
                    var bulSpeedY = parseFloat(trackArray[i].speedY);
                    trackArray[i].speedY = +bulSpeedY.toFixed(2);
                }
            }
        }
    }
}