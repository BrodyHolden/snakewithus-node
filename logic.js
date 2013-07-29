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

function getSnakeIndex(snakes, id) {
  var i, len = snakes.length;

  for (i = 0; i < len; i++) {
    if (snakes[i].id === id) {
      return i;
    }
  }

  throw new Error("We are not in the game! Do I exist?");
}

function getPosition(snakes, id, segment) {
  var me = snakes[getSnakeIndex(snakes, id)];

  return {
    x: me.queue[segment][0],
    y: me.queue[segment][1]
  };
}

function getFoodPosition(board, border, pos) {
  var entity, container, x, y, height;

  for (x in board) {
    if (! board.hasOwnProperty(x)) {
      continue;
    }

    height = board[x];

    for (y in height) {
      if (! height.hasOwnProperty(y)) {
        continue;
      }

      container = height[y];

      if (! container.hasOwnProperty(0)) {
        continue;
      }

      entity = container[0];

      console.log("getFoodPosition: ", entity);
      if (entity.type === "food") {
        console.log("getFoodPosition() is food. x:", x, " y:", y);
        return {
          x: y,
          y: x
        }
      }
    }
    
  }

  return false;
}

function getHeadPosition(snakes, id) {
  var index = getSnakeIndex(snakes, id),
      segments = snakes[index].queue.length;

  return getPosition(snakes, id, segments - 1);
}

function pickLocation(location, border) {
  if ((location.x === 1) && (location.y === 1)) {
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
  if (a.x != b.x) {
    return false;
  }
  if (a.y != b.y) {
    return false;
  }
  return true;
}

function moveTowardsGoal(goal, current) {
  var diffX, diffY;

  diffX = goal.x - current.x;
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

  var currentLocation = getHeadPosition(snakes, id);
  var isAtLocation = isAtGoal(locationGoal, currentLocation);

  console.log("location: ", currentLocation, " | goal: ", locationGoal, " | isAtLocation: ", isAtLocation);

  // Pick new location.
  if (isAtLocation) {
    locationGoal = getFoodPosition(board, getBorders(board), currentLocation);
    if (locationGoal === false) {
      locationGoal = pickLocation(currentLocation, getBorders(board));
    }
    console.log("new location: ", locationGoal, " | board: ", getBorders(board));
  }

  // Move there.
  return moveTowardsGoal(locationGoal, currentLocation);
};

