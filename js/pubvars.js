
// debug mode? used to toggle debug messages?
debugMode = true;

// gameclock used to count the number of ms that have passed
tickInterval = 15 // ms
gameclock = 0; // also in ms

// initialize some variables
tileSize = 48; // pixels tall and wide for a tile
numTiles_x = 21; // tiles wide for the game area
numTiles_y = 11; // tiles tall for the game area

gravity = 1; // this is an accelleration in the -y direction
maxVSpeed = 12; // maximum speed for gravity stuff
maxHSpeed = 8; // max speed for left and right player controlled movement
player_acc = 1; // acceleration of a player (for both player controlled
// movement as well as friction)


// initialize some images
imgCreatures = new Image();
imgCreatures.src = 'images/oryx_16bit_fantasy_creatures_trans.png';
imgCreaturesFlipped = new Image();
imgCreaturesFlipped.src = 'images/oryx_16bit_fantasy_creatures_trans_flipped.png';
imgWorld = new Image();
imgWorld.src = 'images/oryx_16bit_fantasy_world_trans.png';

//specific images
imgPrincessLedgeGrab = new Image();
imgPrincessLedgeGrab.src = 'images/princess/princess_ledge_grab.png';
imgPrincessLedgeGrabFlipped = new Image();
imgPrincessLedgeGrabFlipped.src = 'images/princess/princess_ledge_grab_flipped.png';

// Sprite class defined in js/sprite.js
// each creature sprite has 2 frames (labeled 1 and 2) in subsequent rows
sprPrincess1 = new Sprite(3, 12, 24, 24, imgCreatures);
sprPrincess2 = new Sprite(4, 12, 24, 24, imgCreatures);
sprPrincess1Flipped = new Sprite(3, 7, 24, 24, imgCreaturesFlipped);
sprPrincess2Flipped = new Sprite(4, 7, 24, 24, imgCreaturesFlipped);
sprPrincessLedgeGrab = new Sprite(0, 0, 24, 24, imgPrincessLedgeGrab);
sprPrincessLedgeGrabFlipped = new Sprite(0, 0, 24, 24, imgPrincessLedgeGrabFlipped);

// world sprites
sprStoneBlock = new Sprite(1, 1, 24, 24, imgWorld);

// colors
const color_white = "#ffffff";

// global lists
entities = [];
solids = [];

// global variables for keys
const keyCodes = {"ArrowLeft":'left', "ArrowRight":'right', "ArrowUp":'up', "ArrowDown":'down',
                "a":'left', "d":'right', "w":'up', "s":'down'}
keys = {left:0, right:0, up:0, down:0};
