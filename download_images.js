// download_images.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");

// === Put your data object here ===
const DATA = {
    "101 Dalmatians": {
        "gallery-0": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPerdita1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPatch1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPongo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWinterCruella1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCruellaDeVil1.png"
        ]
    },
    "Adventures of the Gummi Bears": {
        "gallery-1": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzZummiGummi1.png"
        ]
    },
    "Aladdin": {
        "gallery-2": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGenie1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAladdin1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJasmine1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAbu1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzIago1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRajah1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDisguisedJasmine1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzVacationGenie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSnakeJafar1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrinceAli1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElephantAbu1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBabyRajah1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGenieJafar1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCelebrationJasmine1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMagicCarpet1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSultan1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRedCarpetGenie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCaveOfWonders1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeGenie1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWovenAbu1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJeweledGlassJasmine1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJafar1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAquamarineJasmine1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTanzaniteCaveOfWonders1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRedJasperJafar1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAzuriteGenie1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumGenie1.png"
        ]
    },
    "Alice in Wonderland": {
        "gallery-3": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAlice1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCheshireCat1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWhiteRabbit1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheMadHatter1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCaterpillar1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLittleOysters1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRose1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMarchHare1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMrWalrus1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTweedleDee1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHouseAlice1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDoorknob1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKingOfHearts1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCookieCheshireCat1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheQueenOfHearts1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzOnyxQueenOfHearts1.png"
        ]
    },
    "Alien Remix": {
        "gallery-4": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMonstersIncAlien1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzIncrediblesAlien1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWoodysRoundupAlien1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzInsideOutAlien1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCocoAlien1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRatatouilleAlien1.png"
        ]
    },
    "Anastasia": {
        "gallery-5": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAnastasiaRomanov1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRasputin1.png"
        ]
    },
    "Aristocats": {
        "gallery-6": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMarie1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzToulouse1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBerlioz1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPearlMarie1.png"
        ]
    },
    "Atlantis": {
        "gallery-7": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMilo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKida1.png"
        ]
    },
    "Bambi": {
        "gallery-8": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBambi1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzThumper1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrettyFlower1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAprilShowerBambi1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFloralMissBunny1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEmbroideredBambi1.png"
        ]
    },
    "Beauty and the Beast": {
        "gallery-9": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheBeast1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBelle1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLumiere1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCogsworth1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMrsPotts1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzChip1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLeFou1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMaurice1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWinterBelle1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFancyBeast1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBookwormBelle1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMagicalEnchantress1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEnchantress1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAureateEnchantress1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRoseGlassBelle1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzShatteredGlassBeast1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGaston1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzZirconBelle1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTigersEyeBeast1.png"
        ]
    },
    "Big Hero 6": {
        "gallery-10": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHiro1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBaymax1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHoneyLemon1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGoGoTomago1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumBaymax1.png"
        ]
    },
    "The Black Cauldron": {
        "gallery-11": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGurgi1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrincessEilonwy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheHornedKing1.png"
        ]
    },
    "Bolt": {
        "gallery-12": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBolt1.png"
        ]
    },
    "Brave": {
        "gallery-13": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMerida1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYoungMerida1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzQueenElinor1.png",
        
        ]
    },
    "A Bug's Life": {
        "gallery-14": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFlik1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrincessAtta1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHeimlich1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFrancis1.png",
          
        ]
    },
    "Cars": {
        "gallery-15": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLightningMcQueen1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCruzRamirez1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJacksonStorm1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMater1.png",
          
        ]
    },
    "Cinderella (1950)": {
        "gallery-16": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCinderella1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrinceCharming1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGus1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJaq1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAnastasia1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDrizella1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWeddingCinderella1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPinkDressCinderella1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFairyGodmother1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHolidayCinderella1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/Emoji Blitz StainedGass FairyGodmother Default.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLucifer1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLadyTremaine1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzIoliteFairyGodmother1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTopazCinderella1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumFairyGodmother1.png"
        ]
    },
    "Cinderella (2015)": {
        "gallery-17": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCinderellaLiveAction1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLadyTremaineLiveAction1.png"
        ]
    },
    "Coco": {
        "gallery-18": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMiguel1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHector1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDante1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzImelda1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAlebrijeDante1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDisguisedMiguel1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPepita1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMamaCoco1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCocoAlien1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzErnesto1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumMiguel1.png"
        ]
    },
    "Cruella": {
        "gallery-19": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMasqueradeCruella1.png",
        
        ]
    },
    "Descendants": {
        "gallery-20": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMal1.png",
          
        ]
    },
    "Disney Munchlings": {
        "gallery-21": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMunchlingsCherryTartMinnie1.png",
            
        ]
    },
    "Disney Parks": {
        "gallery-22": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHatboxGhost1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHitchhikerGhostPhineas1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMadameLeota1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheBride1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAbominableSnowman1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMrToad1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWorldOfColorMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFigment1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSketchFigment1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRainbowFigment1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeElliott1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeMinnie1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeTinkerBell1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeCheshireCat1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeBlueFairy1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeGenie1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeNemo1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeSulley1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzItsASmallWorld1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSpaceMountain1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDisneylandCastle1.png"
        ]
    },
    "DuckTales": {
        "gallery-23": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzScroogeMcDuck1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWebby1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLaunchpadMcQuack1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGizmoduck1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDarkwingDuck1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHuey1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDewey1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLouie1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMagicaDeSpell1.png"
        ]
    },
    "Dumbo": {
        "gallery-24": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDumbo1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTimothyMouse1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMrsJumbo1.png",
          
        ]
    },
    "Elemental": {
        "gallery-25": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEmber1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWade1.png",
          
        ]
    },
    "Elio": {
        "gallery-26": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElio1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzOoooo1.png",
          
        ]
    },
    "The Emperor's New Groove": {
        "gallery-27": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKuzco1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKronk1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPacha1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYzmaKitty1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYzma1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAmethystYzma1.png"
        ]
    },
    "Encanto": {
        "gallery-28": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMirabel1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAntonio1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAlmaMadrigal1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCamilo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDolores1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPepa1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLuisa1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBruno1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzIsabela1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEmbroideredMirabel1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSmokyQuartzBruno1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumMirabel1.png"
        ]
    },
    "Enchanted": {
        "gallery-29": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGiselle1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWeddingGiselle1.png",
        
        ]
    },
    "Fantasia": {
        "gallery-30": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSorcerersApprenticeMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYensid1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSpringSprite1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzChernabog1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumSorcerersApprenticeMickey1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumChernabog1.png"
        ]
    },
    "Finding Nemo": {
        "gallery-31": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzNemo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDory1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCrush1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBruce1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHank1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDestiny1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBailey1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPearl1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBabyDory1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMarlin1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGill1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeNemo1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDarla1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumNemo1.png"
        ]
    },
    "The Fox and the Hound": {
        "gallery-32": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTod1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCopper1.png",
          
        ]
    },
    "Frozen": {
        "gallery-33": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElsa1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAnna1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzOlaf1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSven1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKristoff1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGrandPabbie1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMarshmallow1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzOaken1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElsaTheSnowQueen1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzQueenAnna1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYoungAnna1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheFireSpirit1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSketchElsa1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzIridescentElsa1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrinceHans1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDukeOfWeselton1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDiamondElsa1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCitrineAnna1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzOpalOlaf1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumElsa1.png"
        ]
    },
    "Gargoyles": {
        "gallery-34": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGoliath1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBronx1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDemona1.png"
        ]
    },
    "Golden Girls": {
        "gallery-35": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRoseNylund1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBlancheDevereaux1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDorothyZbornak1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSophiaPetrillo1.png"
        ]
    },
    "A Goofy Movie": {
        "gallery-36": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMax1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRoxanne1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPJ1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzVacationGoofy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPowerline1.png"
        ]
    },
    "The Great Mouse Detective": {
        "gallery-37": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzProfessorRatigan1.png"
        ]
    },
    "Haunted Mansion": {
        "gallery-38": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHatboxGhost1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHitchhikerGhostPhineas1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMadameLeota1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheBride1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzConstance1.png",
        
        ]
    },
    "Hercules": {
        "gallery-39": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHercules1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMeg1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPegasus1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPhil1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPain1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPanic1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBabyPegasus1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBabyHercules1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzZeus1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHades1.png"
        ]
    },
    "Hocus Pocus": {
        "gallery-40": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWinifredSanderson1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMarySanderson1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSarahSanderson1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBinx1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBillyButcherson1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDaniDennison1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYoungWinifred1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheBook1.png"
        ]
    },
    "Home Alone": {
        "gallery-41": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKevinMcCallister1.png"
        ]
    },
    "The Hunchback of Notre Dame": {
        "gallery-42": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEsmeralda1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzQuasimodo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHugo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFrollo1.png"
        ]
    },
    "Ice Age": {
        "gallery-43": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSid1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzManny1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDiego1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzScrat1.png"
        ]
    },
    "The Incredibles": {
        "gallery-44": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMrIncredible1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElastigirl1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJackJack1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzViolet1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDash1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFrozone1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEdna1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSyndrome1.png"
        ]
    },
    "Indiana Jones": {
        "gallery-45": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzIndianaJones1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMarionRavenwood1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHelena1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitz1969IndianaJones1.png",
        
        ]
    },
    "Inside Out": {
        "gallery-46": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJoy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSadness1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAnger1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDisgust1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFear1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBingBong1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAnxiety1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEmbarrassment1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEnvy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEnnui1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRainbowUnicorn1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzInsideOutAlien1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGlowingJoy1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSapphireJoy1.png"
        ]
    },
    "The Jungle Book": {
        "gallery-47": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBaloo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKaa1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKingLouie1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMowgli1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBagheera1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzShereKhan1.png"
        ]
    },
    "Jungle Cruise": {
        "gallery-48": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFrank1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDrLilyHoughton1.png",
          
        ]
    },
    "Kim Possible": {
        "gallery-49": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKimPossible1.png",
          
        ]
    },
    "Kingdom Hearts": {
        "gallery-50": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSora1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAqua1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCaptainGoofy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRoyalMagicianDonald1.png",
          
        ]
    },
    "Lady and the Tramp": {
        "gallery-51": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLady1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTramp1.png",
          
        ]
    },
    "Lightyear": {
        "gallery-52": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCaptainLightyear1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSox1.png",
          
        ]
    },
    "Lilo & Stitch": {
        "gallery-53": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLilo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzStitch1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJumba1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzScrump1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAngel1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzNaniPelekai1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCobraBubbles1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPleakley1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCaptainGantu1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzShavedIceStitch1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRainbowStitch1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPixelStitch1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGrandCouncilwoman1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSuncatcherStitch1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSapphireStitch1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumStitch1.png"
        ]
    },
    "The Lion King": {
        "gallery-54": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSimba1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTimon1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPumbaa1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRafiki1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzNala1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzZazu1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSpiritMufasa1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBabySimba1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAdultSimba1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMufasa1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBroadwayMufasa1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPatchworkSimba1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzScar1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzShenzi1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCarnelianScar1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumSimba1.png"
        ]
    },
    "The Lion King on Broadway": {
        "gallery-55": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBroadwayMufasa1.png"
        ]
    },
    "The Little Mermaid (1989)": {
        "gallery-56": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAriel1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFlounder1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSebastian1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrinceEric1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzScuttle1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzChefLouis1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWeddingAriel1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKissTheGirlAriel1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzVanessa1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKingTriton1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKnittedUrsula1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSeaGlassAriel1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzUrsula1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFlotsam1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAmethystUrsula1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRubyAriel1.png"
        ]
    },
    "The Little Mermaid (2023)": {
        "gallery-57": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKingTritonLiveAction1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzArielLiveAction1.png",
            
        ]
    },
    "Luca": {
        "gallery-58": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLuca1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAlberto1.png",
          
        ]
    },
    "Maleficent": {
        "gallery-59": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMaleficentLiveAction1.png"
        ]
    },
    "Mary Poppins": {
        "gallery-60": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBert1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJollyHolidayMaryPoppins1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMaryPoppins1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumMaryPoppins1.png"
        ]
    },
    "Mickey & Friends": {
        "gallery-61": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMickey1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDonaldDuck1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPluto1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMinnieMouse1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDaisyDuck1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGoofy1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitz8BitMickey1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSteamboatWillieMickey1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRetroMinnie1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzOswald1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCaptainGoofy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRoyalMagicianDonald1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzVacationGoofy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSpringFluteMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHolidayMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHolidayMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHolidayPluto1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzChristmasClarabelleCow1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSantaGoofy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWinterDaisy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRoseGoldMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRainbowMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRainbowMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzVampireMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWitchMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPumpkinMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPumpkinMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWerewolfGoofy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMummyDonald1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMermaidMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDeepSeaMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCrabDonald1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSeashellDaisy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSeaCreatureGoofy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFairyMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBirthdayBabyPluto1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPeppermintMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGingerbreadMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGardenerMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFlowerMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRainyDayDonald1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTopiaryDaisy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSpringtimeDaisy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWatermelonMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzIceCreamMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSoftServeDonald1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAstronautMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAlienPluto1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAstronautDonald1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPineConePluto1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPancakeGoofy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBlueberryMuffinDonald1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFashionMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDapperMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDapperMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWorldOfColorMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMarchingBandMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSorcerersApprenticeMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBobCratchitMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGhostOfJacobMarley1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEmilyCratchitMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGhostOfChristmasFuturePete1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeMinnie1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHeartStitchMinnie1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlushiePluto1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDazzlingMinnie1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPiratePegLegPete1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWinterPete1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGarnetMinnie1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPearlDaisy1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBlackOpalMickey1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzQuartzDonald1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumMickey1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumDonald1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumMinnie1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumGoofy1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumSorcerersApprenticeMickey1.png"
        ]
    },
    "Mickey's Christmas Carol": {
        "gallery-62": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBobCratchitMickey1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGhostOfJacobMarley1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEbenezerScroogeMcDuck1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTinyTim1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEmilyCratchitMinnie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGhostOfChristmasFuturePete1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGhostOfChristmasPresent1.png",
            
        ]
    },
    "Moana": {
        "gallery-63": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMoana1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMaui1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPua1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHeiHei1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSimea1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLoto1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBabyMoana1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzVoyagerMoana1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTeKa1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGrammaTala1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTeFiti1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMatangi1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPatchworkPua1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTamatoa1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKakamoraChief1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCarnelianMoana1.png"
        ]
    },
    "Monsters, Inc.": {
        "gallery-64": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSulley1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMike1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRandall1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCelia1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRoz1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBoo1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeSulley1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWaternoose1.png"
        ]
    },
    "Mulan": {
        "gallery-65": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMulan1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMushu1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCriKee1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLiShang1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPing1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzReflectionMulan1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCelebrationMulan1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheEmperor1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzShanYu1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRubyMushu1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMelaniteMulan1.png"
        ]
    },
    "The Muppet Christmas Carol": {
        "gallery-66": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBobCratchitKermit1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMissPiggyEmilyCratchit1.png"
        ]
    },
    "Muppets": {
        "gallery-67": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKermit1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFozzieBear1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSwedishChef1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMissPiggy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGonzo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMadamePigota1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGauzeyTheHatboxBear1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBobCratchitKermit1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMissPiggyEmilyCratchit1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAnimal1.png"
        ]
    },
    "Muppets Haunted Mansion": {
        "gallery-68": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMadamePigota1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGauzeyTheHatboxBear1.png",
        
        ]
    },
    "The Nightmare Before Christmas": {
        "gallery-69": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJackSkellington1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSally1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzZero1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDrFinkelstein1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheMayor1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSantaJack1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzChristmasSally1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMan-EatingWreath1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzOogieBoogie1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLock1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzShock1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBarrel1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMoonstoneJackSkellington1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTourmalineOogieBoogie1.png"
        ]
    },
    "Oliver & Company": {
        "gallery-70": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzOliver1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDodger1.png",
          
        ]
    },
    "Onward": {
        "gallery-71": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzIan1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBarley1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheManticore1.png",
          
        ]
    },
    "Paperman": {
        "gallery-72": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGeorge1.png"
        ]
    },
    "Peter Pan": {
        "gallery-73": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTinkerBell1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPeterPan1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWendy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzNana1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSmee1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJohnDarling1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSlightly1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCaptainPan1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHolidayTinkerBell1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElectricalParadeTinkerBell1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFairyGlassTinkerBell1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCaptainHook1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTopazTinkerBell1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSpinelPeterPan1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrismaticTinkerBell1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumTinkerBell1.png"
        ]
    },
    "Phineas and Ferb": {
        "gallery-74": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPerryThePlatypus1.png",
          
        ]
    },
    "Pinocchio": {
        "gallery-75": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJiminyCricket1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPinocchio1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFigaro1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGeppetto1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBlueFairy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSketchBlueFairy1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMonstro1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumJiminyCricket1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumBlueFairy1.png"
        ]
    },
    "Pirates of the Caribbean": {
        "gallery-76": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCaptainJackSparrow1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBarbossa1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDavyJones1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzElizabethSwann1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrisonDog1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTiaDalma1.png"
        ]
    },
    "Pixar Shorts": {
        "gallery-77": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBao1.png"
        ]
    },
    "Pixie Hollow": {
        "gallery-78": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTinkerBell1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSilvermist1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzIridessa1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRosetta1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFawn1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPeriwinkle1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzVidia1.png",
          
        ]
    },
    "Pocahontas": {
        "gallery-79": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPocahontas1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFlit1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMeeko1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPercy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJohnSmith1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzColorsOfTheWindPocahontas1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGrandmotherWillow1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWintertimePocahontas1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGovernorRatcliffe1.png"
        ]
    },
    "Pooh's Heffalump Movie": {
        "gallery-80": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWinnieThePooh1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPiglet1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEeyore1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTigger1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRabbit1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRoo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLumpyHeffalump1.png"
        ]
    },
    "Princess and the Frog": {
        "gallery-81": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTiana1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLouis1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRay1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCharlotteLaBouff1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMamaOdie1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAlmostThereTiana1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrinceNaveen1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYoungTiana1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDrFacilier1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAventurineTiana1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumTiana1.png"
        ]
    },
    "The Proud Family": {
        "gallery-82": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPennyProud1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSugaMama1.png"
        ]
    },
    "Rapunzel's Tangled Adventure": {
        "gallery-83": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSunlitRapunzel1.png"
        ]
    },
    "Ratatouille": {
        "gallery-84": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRemy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAlfredoLinguini1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAugusteGusteau1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAntonEgo1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzChefSkinner1.png"
        ]
    },
    "Raya and the Last Dragon": {
        "gallery-85": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRaya1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTukTuk1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzNamaari1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHumanSisu1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSisu1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzZirconRaya1.png"
        ]
    },
    "Rescue Rangers": {
        "gallery-86": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzChipRescueRangers1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDale1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGadget1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMontereyJack1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDevilDale1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAngelChip1.png"
        ]
    },
    "The Rescuers": {
        "gallery-87": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBernard1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBianca1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMadameMedusa1.png"
        ]
    },
    "Robin Hood": {
        "gallery-88": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRobinHood1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMaidMarian1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLadyKluck1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLittleJohn1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSirHiss1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrinceJohn1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSheriffOfNottingham1.png"
        ]
    },
    "Ron's Gone Wrong": {
        "gallery-89": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRon1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBarney1.png",
          
        ]
    },
    "The Santa Clause": {
        "gallery-90": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzScottCalvin1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBernardTheElf1.png",
          
        ]
    },
    "Sleeping Beauty": {
        "gallery-91": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrincessAurora1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrincePhillip1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFlora1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFauna1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMerryweather1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheRaven1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDragonMaleficent1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBriarRose1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWinterAurora1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMaleficent1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPeridotMaleficent1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYellowDiamondAurora1.png"
        ]
    },
    "Snow White and the Seven Dwarfs": {
        "gallery-92": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSnowWhite1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDopey1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGrumpy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSleepy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDoc1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBashful1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSneezy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHappy1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzThePrince1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheWitch1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMagicMirror1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWinterSnowWhite1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzIlluminatedSnowWhite1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheEvilQueen1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzObsidianSnowWhite1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPurpleDiamondDopey1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumSnowWhite1.png"
        ]
    },
    "Soul": {
        "gallery-93": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJoe1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitz221.png",
          
        ]
    },
    "Star Wars": {
        "gallery-94": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRey1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFinn1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBB81.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPoeDameron1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLukeSkywalker1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrincessLeia1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzChewbacca1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHanSolo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzR2D21.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzC-3PO1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBobaFett1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTheMandalorian1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHondo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCaraDune1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFennecShand1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLandoCalrissian1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzK-2SO1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJynErso1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCassianAndor1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWicket1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBo-Katan1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSalaciousCrumb1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJarJarBinks1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSabineWren1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzC1-10P1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHeraSyndulla1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJawa1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAnakinSkywalker1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJediAnakin1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzQueenAmidala1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMeadowPadme1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDecoyQueenAmidala1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBoushhDisguiseLeia1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEndorRebelLeia1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCarboniteHanSolo1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGrogu1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAhsokaTano1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYoda1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzObi-WanKenobi1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJediMasterLuke1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRancor1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMaceWindu1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAdmiralAckbar1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzQui-GonJinn1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzReindeerR2D21.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzStringLightsChewbacca1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzVolcanicGlassDarthVader1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKyloRen1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDarthVader1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJabbaTheHutt1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFirstOrderStormtrooper1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMoffGideon1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDeathTrooper1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDarthMaul1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGeneralGrievous1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEmperorPalpatine1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGrandMoffTarkin1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGrandInquisitor1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzImperialStormtrooper1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCadBane1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEmeraldYoda1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumGrogu1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumLukeSkywalker1.png"
        ]
    },
    "The Sword in the Stone": {
        "gallery-95": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzArthur1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzArchimedes1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSugarBowl1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYoungMim1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMerlin1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMadamMim1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumMerlin1.png"
        ]
    },
    "TaleSpin": {
        "gallery-96": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTaleSpinBaloo1.png"
        ]
    },
    "Tangled": {
        "gallery-97": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRapunzel1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPascal1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFlynnRider1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMaximus1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTiaraRapunzel1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWeddingMaximus1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBabyRapunzel1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMotherGothel1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGoldenBerylRapunzel1.png"
        ]
    },
    "Three Caballeros": {
        "gallery-98": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJose1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPanchito1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCaballeroDonald1.png",
        
        ]
    },
    "Titanic": {
        "gallery-99": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRoseTitanic1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJack1.png",
          
        ]
    },
    "Toy Story": {
        "gallery-100": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWoody1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBuzzLightyear1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAlien1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBullseye1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJessie1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBoPeep1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzForky1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRex1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDukeCaboom1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHamm1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBunny1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDucky1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMrsNesbit1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMonstersIncAlien1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzIncrediblesAlien1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWoodysRoundupAlien1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPaintedGlassWoody1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzZurg1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzLotso1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzStinkyPete1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGabbyGabby1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFluoriteBuzz1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPlatinumWoody1.png"
        ]
    },
    "Treasure Planet": {
        "gallery-101": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJohnSilver1.png"
        ]
    },
    "TRON": {
        "gallery-102": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzQuorra1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKevinFlynn1.png"
        ]
    },
    "Turning Red": {
        "gallery-103": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzMeilinLee1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAbbyPark1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRedPandaMei1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRedPandaMingLee1.png",
        
        ]
    },
    "Up": {
        "gallery-104": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRussell1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCarl1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHeadphonesDug1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzDug1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKevin1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEllie1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAlpha1.png"
        ]
    },
    "WALL-E": {
        "gallery-105": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWallE1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEVE1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHolidayWallE1.png"
        ]
    },
    "Willow": {
        "gallery-106": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKit1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWillow1.png"
        ]
    },
    "Winnie The Pooh": {
        "gallery-107": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzWinnieThePooh1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPiglet1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzEeyore1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTigger1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRabbit1.png",
            
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKanga1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRoo1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzOwl1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHoneyBeePooh1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFlowerPiglet1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBunnyTigger1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzBabyChickEeyore1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzHoneyCakePooh1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSantaPooh1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzChristopherRobin1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzQuiltedTigger1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzSnugglyEeyore1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCuddlyPooh1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCitrinePooh1.png"
        ]
    },
    "Wish": {
        "gallery-108": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzAsha1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzValentino1.png"
        ]
    },
    "Wreck-It Ralph": {
        "gallery-109": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzVanellope1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzRalph1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYesss1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFixItFelixJr1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzCalhoun1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzTaffytaMuttonfudge1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPrincessVanellope1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzPixelRalph1.png",
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzKingCandy1.png"
        ]
    },
    "Zootopia": {
        "gallery-110": [
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzNickWilde1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzJudyHopps1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzClawhauser1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFinnick1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzFlash1.png",
     
            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzYoungJudyHopps1.png",

            "https://static.wikia.nocookie.net/disneyemojiblitz/images/f/fc/EmojiBlitzGazelle1.png"
        ]
    }
}

const OUT_ROOT = path.resolve(__dirname, "downloads");

const kebab = s => s.toLowerCase().trim()
  .replace(/[^\w\s-]/g, "")
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-");

const extFromUrl = url => {
  const m = /\.([a-z0-9]+)(?:\?|#|$)/i.exec(url);
  return (m ? m[1] : "png").toLowerCase();
};

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function download(url, dest) {
  const { data } = await axios.get(url, { responseType: "arraybuffer" });
  await fs.promises.writeFile(dest, data);
}

(async () => {
  await ensureDir(OUT_ROOT);
  let total = 0;

  for (const [category, galleries] of Object.entries(DATA)) {
    const dir = path.join(OUT_ROOT, kebab(category));
    await ensureDir(dir);

    const urls = Object.values(galleries).flat();
    let index = 1;

    for (const u of urls) {
      const num = String(index++).padStart(3, "0");
      const ext = extFromUrl(u);
      const file = path.join(dir, `image-${num}.${ext}`);

      try {
        await download(u, file);
        console.log("Saved:", file);
        total++;
      } catch (e) {
        console.warn("Failed:", u, "-", e.message);
      }
    }
  }

  console.log(`\nAll done. Saved ${total} files into ${OUT_ROOT}`);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
