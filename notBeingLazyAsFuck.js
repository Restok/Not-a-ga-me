var iHaveNoClueX = 0;
var iHaveNoClueY = 0;
var timeUntilGone = 0;
function universalBossDeath(bossName, alreadyCreatedGif){
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

            player.x = 400;
            player.y = 300;
            itemChest = new component(250, 173, images.TreasureChestClosed, 750-125, 400-86, "image");
            allGameElements.push(itemChest);
            spawnOne = false;
            bossName = null;
            destroyBoss = true;
        }
        if(!created){

                $('#dddeath').css('position', 'absolute');
                $('#dddeath').css('top', iHaveNoClueY); //or wherever you want it

                $('#dddeath').css('opacity', 1); //or wherever you want it
                $('#dddeath').css('left', iHaveNoClueX); //or wherever you want it
                resetGif(bossName.width+20, bossName.height+20, "")
                created = true;
            }

    }
