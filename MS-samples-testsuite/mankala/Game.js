///<reference path="Driver.ts"/>
var Mankala;
(function (Mankala) {
    Mankala.NoSpace = -1;
    Mankala.homeSpaces = [[0, 1, 2, 3, 4, 5],
        [7, 8, 9, 10, 11, 12]];
    Mankala.firstHomeSpace = [0, 7];
    Mankala.lastHomeSpace = [5, 12];
    Mankala.capturedSpaces = [12, 11, 10, 9, 8, 7, Mankala.NoSpace, 5, 4, 3, 2, 1, 0, Mankala.NoSpace];
    Mankala.NoScore = 31;
    Mankala.NoMove = -1;
    var bodyId = "body";
    var humanScoreId = "humanScore";
    var computerScoreId = "computerScore";
    function pushPosition(pos, l) {
        l.insertAfter(Base.listMakeEntry(pos));
    }
    function popPosition(l) {
        var entry = Base.listRemove(l.next);
        if (entry != null) {
            return entry.data;
        }
        else {
            return null;
        }
    }
    function testBrowser() {
        var game = new Game();
        game.interactive();
        var body = document.getElementById(bodyId);
        body.onresize = function () { game.resize(); };
    }
    Mankala.testBrowser = testBrowser;
    var Game = (function () {
        function Game() {
            this.position = new Mankala.DisplayPosition([3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 0], Mankala.NoMove, 0);
            this.q = null;
            this.scores = null;
            this.positionCount = 0;
            this.moveCount = 0;
            this.isInteractive = false;
            this.features = new Mankala.Features();
            this.nextSeedCounts = new Array(14);
            this.boardElm = null;
        }
        Game.prototype.resize = function () {
            if (this.boardElm != null) {
                this.body.removeChild(this.boardElm);
            }
            this.showMove();
        };
        Game.prototype.step = function () {
            var move = this.findMove();
            if (move != Mankala.NoMove) {
                this.position.move(move, this.nextSeedCounts, this.features);
                this.position = new Mankala.DisplayPosition(this.nextSeedCounts.slice(0), Mankala.NoMove, this.features.turnContinues ? this.position.turn : 1 - this.position.turn);
                this.position.config = this.prevConfig;
                if ((!this.isInteractive) || (this.position.turn == 1)) {
                    this.setStep();
                }
                return true;
            }
            return false;
        };
        Game.prototype.setStep = function () {
            var _this = this;
            setTimeout(/*function()*/ function () {
                if (!_this.step()) {
                    _this.finish();
                }
                _this.body.removeChild(_this.boardElm);
                _this.showMove();
            }, 1000);
        };
        Game.prototype.finish = function () {
            var sum = 0;
            var otherSpaces = Mankala.homeSpaces[1 - this.position.turn];
            for (var k = 0, len = otherSpaces.length; k < len; k++) {
                sum += this.position.seedCounts[otherSpaces[k]];
                this.position.seedCounts[otherSpaces[k]] = 0;
            }
            this.position.seedCounts[Mankala.storeHouses[this.position.turn]] += sum;
        };
        Game.prototype.auto = function () {
            // initialize
            this.body = document.getElementById(bodyId);
            this.showMove();
            // run with timeout
            this.setStep();
        };
        Game.prototype.showMove = function () {
            var hsc = document.getElementById(humanScoreId);
            var csc = document.getElementById(computerScoreId);
            var g = this;
            if (!this.isInteractive) {
                g = null;
            }
            this.boardElm = this.position.toCircleSVG(g);
            this.prevConfig = this.position.config;
            hsc.innerText = this.position.seedCounts[Mankala.storeHouses[0]] +
                ((this.position.turn == 0) ? "  <-Turn" : "");
            csc.innerText = this.position.seedCounts[Mankala.storeHouses[1]] +
                ((this.position.turn == 1) ? "  <-Turn" : "");
            this.body.appendChild(this.boardElm);
        };
        Game.prototype.humanMove = function (seed) {
            if (this.position.turn == 0) {
                this.position.move(seed, this.nextSeedCounts, this.features);
                this.position = new Mankala.DisplayPosition(this.nextSeedCounts.slice(0), Mankala.NoMove, this.features.turnContinues ? this.position.turn : 1 - this.position.turn);
                this.position.config = this.prevConfig;
                this.body.removeChild(this.boardElm);
                this.showMove();
                if (this.position.turn == 1) {
                    this.setStep();
                }
            }
        };
        Game.prototype.interactive = function () {
            this.isInteractive = true;
            this.body = document.getElementById(bodyId);
            this.showMove();
        };
        Game.prototype.expand = function (curPos, move, startMove, nextSeedCounts) {
            var features = new Mankala.Features();
            if (curPos.move(move, nextSeedCounts, features)) {
                var pos = new Mankala.Position(nextSeedCounts.slice(0), startMove, curPos.turn);
                this.positionCount++;
                if (!features.turnContinues) {
                    pos.turn = 1 - pos.turn;
                }
                var score = pos.score();
                if (this.scores[startMove] == Mankala.NoScore) {
                    this.scores[startMove] = score;
                }
                else {
                    this.scores[startMove] += score;
                }
                pushPosition(pos, this.q);
                return true;
            }
            return false;
        };
        Game.prototype.findMove = function () {
            var timeStart = new Date().getTime();
            this.q = Base.listMakeHead();
            this.scores = [Mankala.NoScore, Mankala.NoScore, Mankala.NoScore, Mankala.NoScore, Mankala.NoScore, Mankala.NoScore];
            pushPosition(this.position, this.q);
            var deltaTime = 0;
            var moves = Mankala.homeSpaces[this.position.turn];
            var nextSeedCounts = new Array(14);
            var movePossible = false;
            while ((!this.q.empty()) && (deltaTime < 500)) {
                var firstPos = popPosition(this.q);
                for (var i = 0, len = moves.length; i < len; i++) {
                    var startMove = firstPos.startMove;
                    if (startMove == Mankala.NoMove) {
                        startMove = i;
                    }
                    if (this.expand(firstPos, moves[i], startMove, nextSeedCounts)) {
                        movePossible = true;
                    }
                }
                deltaTime = new Date().getTime() - timeStart;
            }
            if (movePossible) {
                var bestScore = -100;
                var bestMove = Mankala.NoMove;
                for (var j = 0, scoresLen = this.scores.length; j < scoresLen; j++) {
                    if ((this.scores[j] != Mankala.NoScore) && ((this.scores[j] > bestScore) || (bestMove == Mankala.NoMove))) {
                        bestScore = this.scores[j];
                        bestMove = j;
                    }
                }
                if (bestMove != Mankala.NoMove) {
                    return moves[bestMove];
                }
                else {
                    return Mankala.NoMove;
                }
            }
            return Mankala.NoMove;
        };
        Game.prototype.test = function () {
            var features = new Mankala.Features();
            var nextSeedCounts = new Array(14);
            WScript.Echo("position: ");
            WScript.Echo(this.position.seedCounts.slice(0, 7));
            WScript.Echo(this.position.seedCounts.slice(7));
            do {
                var move = this.findMove();
                if (move == Mankala.NoMove) {
                }
                else {
                    this.moveCount++;
                    WScript.Echo(this.position.turn + " moves seeds in space " + move);
                    this.position.move(move, nextSeedCounts, features);
                    WScript.Echo(features.toString());
                    this.position = new Mankala.DisplayPosition(nextSeedCounts.slice(0), Mankala.NoMove, features.turnContinues ? this.position.turn : 1 - this.position.turn);
                    WScript.Echo("position: ");
                    WScript.Echo(this.position.seedCounts.slice(0, 7));
                    WScript.Echo(this.position.seedCounts.slice(7));
                }
            } while (move != Mankala.NoMove);
            var sum = 0;
            var otherSpaces = Mankala.homeSpaces[1 - this.position.turn];
            for (var k = 0, len = otherSpaces.length; k < len; k++) {
                sum += this.position.seedCounts[otherSpaces[k]];
                this.position.seedCounts[otherSpaces[k]] = 0;
            }
            this.position.seedCounts[Mankala.storeHouses[this.position.turn]] += sum;
            WScript.Echo("final position: ");
            WScript.Echo(this.position.seedCounts.slice(0, 7));
            WScript.Echo(this.position.seedCounts.slice(7));
            var player1Count = this.position.seedCounts[Mankala.storeHouses[0]];
            var player2Count = this.position.seedCounts[Mankala.storeHouses[1]];
            WScript.Echo("storehouse 1 has " + player1Count);
            WScript.Echo("storehouse 2 has " + player2Count);
            WScript.Echo("average positions explored per move " +
                (this.positionCount / this.moveCount).toFixed(2));
        };
        return Game;
    }());
    Mankala.Game = Game;
})(Mankala || (Mankala = {}));
