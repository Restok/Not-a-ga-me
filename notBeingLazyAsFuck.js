var iHaveNoClueX = 0;
var iHaveNoClueY = 0;
var timeUntilGone = 0;
function universalBossDeath(bossName, alreadyCreatedGif, makePet, petName, petW, petH, petSource){
    bossName.speedX = 0;
    bossName.speedY = 0;
    
    createMimic = false;
    timeUntilGone += 1;
    bossName.x = 750-bossName.width/2;
    bossName.y = 400-bossName.height/2;
    if(timeUntilGone >= 200){

        removeFromAll(bossName)

    }
        if(timeUntilGone <= 450){
            iHaveNoClueX = 400-bossName.width/2;
            iHaveNoClueY = 200-bossName.height/2;
            scrollWrapper(350, 200);
            player.x = 400;
            player.y = 300;
        }
        else if(timeUntilGone > 450){
            if(makePet){
                petName = new component(petW, petH, petSource, player.x-player.width, player.y+player.height, "image");
                allGameElements.push(petName);
                bulletsNumber+=1;

            }
            player.x = 400;
            player.y = 300;
            itemChest = new component(250, 173, "assets/Treasure Chest Closed.png", 750-125, 400-86, "image");
            allGameElements.push(itemChest);
            spawnOne = false;
            bossName = null;
        }
        if(!created){

                document.getElementById("dddeath").style.left = iHaveNoClueX;
                console.log(document.getElementById("dddeath").style.left)
                document.getElementById("dddeath").style.top = iHaveNoClueY;
                document.getElementById("dddeath").style.opacity = 1;
                resetGif(bossName.width, bossName.height, "")
                created = true;

            }

    }
