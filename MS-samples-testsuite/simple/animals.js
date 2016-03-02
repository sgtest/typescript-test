var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Animal = (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (meters) {
        console.log(this.name + " moved " + meters + "m.");
    };
    return Animal;
}());
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake() {
        _super.apply(this, arguments);
    }
    Snake.prototype.move = function () {
        console.log("Slithering...");
        _super.prototype.move.call(this, 5);
    };
    return Snake;
}(Animal));
var Horse = (function (_super) {
    __extends(Horse, _super);
    function Horse() {
        _super.apply(this, arguments);
    }
    Horse.prototype.move = function () {
        console.log("Galloping...");
        _super.prototype.move.call(this, 45);
    };
    return Horse;
}(Animal));
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
