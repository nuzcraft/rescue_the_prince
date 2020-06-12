// debug mode? used to toggle debug messages?
var debugMode = true;
var logThreshold = 2; // at 2, will show warnings and errors, but not info or logs
// unless the output is forced

// gameclock used to count the number of ms that have passed
const tickInterval = 15 // ms
var gameclock = 0; // also in ms

// initialize some variables
const tileSize = 48; // pixels tall and wide for a tile
const cameraNumTiles_x = 21
const cameraNumTiles_y = 11
const numTiles_x = 29; // tiles wide for the game area
const numTiles_y = 11; // tiles tall for the game area
const levelWidth = tileSize * numTiles_x
const levelHeight = tileSize * numTiles_y
var cameraX = 0;
var cameraY = 0;
const spriteSize = 24; // num of pixels in an actual sprite (not a tile)

const gravity = 1; // this is an accelleration in the -y direction
const maxVSpeed = 12; // maximum speed for gravity stuff
const maxHSpeed = 8; // max speed for left and right player controlled movement
const player_acc = 1; // acceleration of a player (for both player controlled
// movement as well as friction)


// initialize some images, start with larger spritesheets
imgCreatures = new Image();
imgCreatures.src = 'images/oryx_16bit_fantasy_creatures_trans.png';
imgWorld = new Image();
imgWorld.src = 'images/oryx_16bit_fantasy_world_trans.png';
imgItems = new Image();
imgItems.src = 'images/oryx_16bit_fantasy_items_trans.png';

//specific images
imgPrincessLedgeGrab = new Image();
imgPrincessLedgeGrab.src = 'images/princess/princess_ledge_grab.png';
imgPrincessJump = new Image();
imgPrincessJump.src = 'images/princess/princess_jump.png';
imgPrincessFalling = new Image();
imgPrincessFalling.src = 'images/princess/princess_falling.png';

// Sprite class defined in js/sprite.js
// each creature sprite has 2 frames (labeled 1 and 2) in subsequent rows
const sprPrincess = new Sprite(3, 12, 24, 24, imgCreatures, 2, 200); // this comes from the spritesheet, has animation
const sprPrincessLedgeGrab = new Sprite(0, 0, 24, 24, imgPrincessLedgeGrab); // this is a standalone image, no animation
const sprPrincessJump = new Sprite(0, 0, 24, 24, imgPrincessJump);
const sprPrincessFalling = new Sprite(0, 0, 24, 24, imgPrincessFalling);

// world sprites
const sprStoneBlock = new Sprite(1, 1, 24, 24, imgWorld);

const sprMudContinuous_BottomMid = new Sprite(24, 33, 24, 24, imgWorld); // mud for continuous platforms, this goes in the middle, on the bottom (the bottom is roughed up)

const sprGrassOverlay_TopMid_1 = new Sprite(16, 48, 24, 24, imgWorld); // grass to overlay over platforms, this goes in the middle, on top, version 1
const sprGrassOverlay_TopMid_2 = new Sprite(16, 52, 24, 24, imgWorld); // grass to overlay over platforms, this goes in the middle, on top, version 2
const sprGrassOverlay_TopMid_3 = new Sprite(16, 53, 24, 24, imgWorld); // grass to overlay over platforms, this goes in the middle, on top, version 3

const sprBarrel = new Sprite(4, 39, 24, 24, imgWorld); // barrel

// item sprites
const sprSkull = new Sprite(7, 1, 16, 16, imgItems); // skull to be used as a collectible
const sprGoldSkull = new Sprite(7, 3, 16, 16, imgItems); // golden skull to be used as a collectible

// colors
const color_white = "#ffffff";

// global lists
var entities = [];
var solids = [];
var skulls = 0;
var goldskulls = 0;

// global variables for keys
const keyCodes = {"ArrowLeft":'left', "ArrowRight":'right', "ArrowUp":'up', "ArrowDown":'down',
                "a":'left', "d":'right', "w":'up', "s":'down'}
var keys = {left:0, right:0, up:0, down:0};

// global variables for the canvas and context and other globals
var canvas;
var ctx;
var gamestate;
var player;
