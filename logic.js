var DIRECTIONS = {
  NORTH: 'n',
  EAST: 'e',
  SOUTH: 's',
  WEST: 'w'
};

function getPosition(snakes, id, segment) {
  var i, me, len = snakes.length;

  for (i = 0; i < len; i++) {
    if (snakes[i].id === id) {
      me = snakes[i];
      return {
        x: me.queue[segment][0],
        y: me.queue[segment][1]
      };
    }
  }

  throw new Error("We are not in the game! Do I exist?");
}

function pickLocation() {
  return {
    x: 2,
    y: 2
  };
}

function isAtGoal(a, b) {
  if (a.x !== b.x) {
    return false;
  }
  if (a.y !== b.y) {
    return false;
  }
  return true;
}

function moveTowardsGoal(goal, current) {
  var diffX = goal.x - current.x,
      diffY = goal.y - current.y;

  if (diffX > 0) {
    return DIRECTIONS.EAST;
  }
  if (diffX < 0) {
    return DIRECTIONS.WEST;
  }
  
  if (diffY > 0) {
    return DIRECTIONS.SOUTH;
  }
  if (diffY < 0) {
    return DIRECTIONS.NORTH;
  }

  throw new Error("Already at goal. Can not move.");
}

var locationGoal;


/** PUT YOUR LOGIC HERE **/
exports.nextMove = function(board, snakes, id) {
  if (!locationGoal) {
    locationGoal = pickLocation();
  }

  var currentLocation = getPosition(snakes, id, 0);

  console.log("Current location: ", currentLocation);

  // Pick new location.
  if (isAtGoal(locationGoal, currentLocation)) {
    locationGoal = pickLocation();
  }

  // Move there.
  return moveTowardsGoal(locationGoal, currentLocation);
};
