var gameUtils = {
    getStatus: function (cell) {
        return cell.getAttribute('data-status');
    },
    setStatus: function (cell, statusToSet) {
        cell.className = statusToSet;
        cell.setAttribute('data-status', statusToSet);
    },
    toggleStatus: function (cell) {
        if (gameUtils.getStatus(cell) === 'dead') {
            gameUtils.setStatus(cell, 'alive');
        } else {
            gameUtils.setStatus(cell, 'dead');
        }
    },
    selectCell: function (x, y) {
        return document.getElementById(x + '-' + y);
    },
    getNeighbors: function (cell) {

        var neighbors = [];

        var pos = cell.id.split('-').map(function (s) {
            return parseInt(s);
        });

        var sc = gameUtils.selectCell;

        // Same row adjacent.
        neighbors.push(sc(pos[0] - 1, pos[1]));
        neighbors.push(sc(pos[0] + 1, pos[1]));

        // Row above.
        neighbors.push(sc(pos[0] - 1, pos[1] - 1));
        neighbors.push(sc(pos[0], pos[1] - 1));
        neighbors.push(sc(pos[0] + 1, pos[1] - 1));

        // Row below.
        neighbors.push(sc(pos[0] - 1, pos[1] + 1));
        neighbors.push(sc(pos[0], pos[1] + 1));
        neighbors.push(sc(pos[0] + 1, pos[1] + 1));

        return neighbors.filter(function (cell) {
            return cell !== null;
        });

    },
    countLiveNeighbors: function (cell) {

        var neighbors = gameUtils.getNeighbors(cell);

        var liveNeighbors = neighbors.filter(function (neighbor) {
            return gameUtils.getStatus(neighbor) === 'alive';
        });

        return liveNeighbors.length;

    }
};

var gameOfLife = {

    width: 40,
    height: 40,
    stepInterval: null,

    createAndShowBoard: function () {
        // create <table> element
        var goltable = document.createElement("tbody");

        // build Table HTML
        var tablehtml = '';
        for (var h = 0; h < this.height; h++) {
            tablehtml += "<tr id='row+" + h + "'>";
            for (var w = 0; w < this.width; w++) {
                tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
            }
            tablehtml += "</tr>";
        }
        goltable.innerHTML = tablehtml;

        // add table to the #board element
        var board = document.getElementById('board');
        board.appendChild(goltable);

        // once html elements are added to the page, attach events to them
        this.setupBoardEvents();
    },

    forEachCell: function (iteratorFunc) {
        /*
         Write forEachCell here. You will have to visit
         each cell on the board, call the "iteratorFunc" function,
         and pass into func, the cell and the cell's x & y
         coordinates. For example: iteratorFunc(cell, x, y)
         */
        var cells = document.getElementsByTagName('td');
        [].slice.call(cells).forEach(function (cellElement) {
            var coords = cellElement.id.split('-');
            iteratorFunc(cellElement, parseInt(coords[0]), parseInt(coords[1]));
        });
    },

    setupBoardEvents: function () {
        // each board cell has an CSS id in the format of: "x-y"
        // where x is the x-coordinate and y the y-coordinate
        // use this fact to loop through all the ids and assign
        // them "on-click" events that allow a user to click on
        // cells to setup the initial state of the game
        // before clicking "Step" or "Auto-Play"

        // clicking on a cell should toggle the cell between "alive" & "dead"
        // for ex: an "alive" cell be colored "blue", a dead cell could stay white

        // EXAMPLE FOR ONE CELL
        // Here is how we would catch a click event on just the 0-0 cell
        // You need to add the click event on EVERY cell on the board

        var onCellClick = function (e) {
            // QUESTION TO ASK YOURSELF: What is "this" equal to here?

            // how to set the style of the cell when it's clicked
            gameUtils.toggleStatus(this);
        };

        this.forEachCell(function (cell) {
            cell.onclick = onCellClick;
        });

        document.getElementById('play_btn').onclick = this.enableAutoPlay.bind(this);
        document.getElementById('step_btn').onclick = this.step.bind(this);
        document.getElementById('clear_btn').onclick = this.clearBoard.bind(this);
        document.getElementById('reset_btn').onclick = this.createRandomBoard.bind(this);

    },

    clearBoard: function () {

        this.forEachCell(function (cell) {
            gameUtils.setStatus(cell, 'dead');
        });

        this.stop();

    },

    createRandomBoard: function () {

        this.forEachCell(function (cell) {

            if (Math.random() > .5) {
                gameUtils.setStatus(cell, 'alive');
            } else {
                gameUtils.setStatus(cell, 'dead');
            }

        });

    },

    step: function () {
        // Here is where you want to loop through all the cells
        // on the board and determine, based on it's neighbors,
        // whether the cell should be dead or alive in the next
        // evolution of the game.
        //
        // You need to:
        // 1. Count alive neighbors for all cells
        // 2. Set the next state of all cells based on their alive neighbors

        var toToggle = [];

        this.forEachCell(function (cell) {

            var liveNeighborsCount = gameUtils.countLiveNeighbors(cell);

            if (gameUtils.getStatus(cell) === 'alive') {
                if (liveNeighborsCount !== 2 && liveNeighborsCount !== 3) {
                    toToggle.push(cell);
                }
            } else {
                if (liveNeighborsCount === 3) {
                    toToggle.push(cell);
                }
            }

        });

        toToggle.forEach(gameUtils.toggleStatus);

    },

    enableAutoPlay: function () {
        // Start Auto-Play by running the 'step' function
        // automatically repeatedly every fixed time interval

        var self = this;

        if (this.stepInterval !== null) {
            this.stop();
        } else {
            this.stepInterval = setInterval(function () {
                self.step();
            }, 100);
        }

    },

    stop: function () {

        clearInterval(this.stepInterval);
        this.stepInterval = null;

    }
};

gameOfLife.createAndShowBoard();