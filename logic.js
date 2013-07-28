var DIRECTIONS = {
  NORTH: 'n',
  EAST: 'e',
  SOUTH: 's',
  WEST: 'w'
};


function getBorders(board) {
  return {
    width:  board[0].length,
    height: board.length
  };
}

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

function pickLocation(location, border) {
  if ((location.x == 1) && (location.y == 1)) {
    return {
      x: border.width  - 2,
      y: border.height - 2
    };
  }

  return {
    x: 1,
    y: 1
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
    locationGoal = pickLocation({}, {});
  }

  var currentLocation = getPosition(snakes, id, 0);
  var isAtLocation = isAtGoal(locationGoal, currentLocation);

  console.log("location: ", currentLocation, " | goal: ", locationGoal, " | isAtLocation: ", isAtLocation);
  console.log("border: ", getBorders(board));

  // Pick new location.
  if (isAtLocation) {
    locationGoal = pickLocation(currentLocation, getBorders(board));
    console.log("new location: ", locationGoal, " | board: ", getBorders(board));
  }

  // Move there.
  return moveTowardsGoal(locationGoal, currentLocation);
};
