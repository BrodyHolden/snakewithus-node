var logic = require('./logic');

/**
 * EXPECT: {
 *  game_id: "<SOME_ID>",
 *  board: { width: 10, height: 10 },
 *  client_id: "<ANOTHER_ID>"
 * }
 *
 * RETURN: {
 *  name: "<SOME_NAME>"
 *  head_img_url: "<SOME_URL>"
 * }
 *
 */
exports.register = function(req, res, next) {
  console.log('REGISTER: ', req.body);
  var data = {
    name: 'My Name',
    head_img_url: 'http://www.dseffects.com/iphone/games/HungrySnake/m'
  };

  res.json(data);
};

/**
 * EXPECT: { game_id: "<SOME_ID>" }
 * RETURN: { }
 */
exports.start = function(req, res, next) {
  console.log('START: ', req.body);
  res.json({ });
};

/**
 * EXPECT: { game_id: "<SOME_ID>" }
 * RETURN: { }
 */
exports.end = function(req, res, next) {
  console.log('END: ', req.body);
  res.json({ });
};

/**
 * EXPECT: {
 *  game_id: "<SOME_ID>",
 *  id: self.game_id,  # Should this be in here too?
 *  snakes: [ <SNAKE_OBJ> ],
 *  board: self.board_generate_new(width, height),
 *  turn_num: 0,
 *  game_over: False
 * }
 *
 * RETURN: {
 *  move: "n|e|s|w",
 *  message: "<TROLL_COMMENT>"
 * }
 */
exports.tick = function(req, res, next) {
  var playerID = req.params.player_id;

  var body = req.body;

  /** State of the game board **/
  var board = body.board;

  /** Info on other snakes **/
  var snakes = body.snakes;

  console.log('TICK '+playerID);

  var data = {
    message: '',
    move: logic.nextMove(board, snakes, playerID)
  };

  res.json(data);
};
