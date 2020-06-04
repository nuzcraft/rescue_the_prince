
// debug mode? used to toggle debug messages?
const debugMode = true;

// gameclock used to count the number of ms that have passed
const tickInterval = 15 // ms
var gameclock = 0; // also in ms

// initialize some variables
const tileSize = 48; // pixels tall and wide for a tile
const numTiles_x = 21; // tiles wide for the game area
const numTiles_y = 11; // tiles tall for the game area

const gravity = 1; // this is an accelleration in the -y direction
const maxVSpeed = 12; // maximum speed for gravity stuff
const maxHSpeed = 8; // max speed for left and right player controlled movement
const player_acc = 1; // acceleration of a player (for both player controlled
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
imgPrincessJump = new Image();
imgPrincessJump.src = 'images/princess/princess_jump.png';
imgPrincessJumpFlipped = new Image();
imgPrincessJumpFlipped.src = 'images/princess/princess_jump_flipped.png';
imgPrincessFalling = new Image();
imgPrincessFalling.src = 'images/princess/princess_falling.png';
imgPrincessFallingFlipped = new Image();
imgPrincessFallingFlipped.src = 'images/princess/princess_falling_flipped.png';

// Sprite class defined in js/sprite.js
// each creature sprite has 2 frames (labeled 1 and 2) in subsequent rows
const sprPrincess1 = new Sprite(3, 12, 24, 24, imgCreatures);
const sprPrincess2 = new Sprite(4, 12, 24, 24, imgCreatures);
const sprPrincess1Flipped = new Sprite(3, 7, 24, 24, imgCreaturesFlipped);
const sprPrincess2Flipped = new Sprite(4, 7, 24, 24, imgCreaturesFlipped);
const sprPrincessLedgeGrab = new Sprite(0, 0, 24, 24, imgPrincessLedgeGrab);
const sprPrincessLedgeGrabFlipped = new Sprite(0, 0, 24, 24, imgPrincessLedgeGrabFlipped);
const sprPrincessJump = new Sprite(0, 0, 24, 24, imgPrincessJump);
const sprPrincessJumpFlipped = new Sprite(0, 0, 24, 24, imgPrincessJumpFlipped);
const sprPrincessFalling = new Sprite(0, 0, 24, 24, imgPrincessFalling);
const sprPrincessFallingFlipped = new Sprite(0, 0, 24, 24, imgPrincessFallingFlipped);

// world sprites
const sprStoneBlock = new Sprite(1, 1, 24, 24, imgWorld);

// colors
const color_white = "#ffffff";

// global lists
var entities = [];
var solids = [];

// global variables for keys
const keyCodes = {"ArrowLeft":'left', "ArrowRight":'right', "ArrowUp":'up', "ArrowDown":'down',
                "a":'left', "d":'right', "w":'up', "s":'down'}
var keys = {left:0, right:0, up:0, down:0};

// global variables for the canvas and context and other globals
var canvas;
var ctx;
var gamestate;
var player;
