var Car = (function () {
    function Car() {
        this._isRunning = false;
        this._distanceFromStart = 0;
    }
    /**
    *   Starts the car's ignition so that it can drive.
    */
    Car.prototype.start = function () {
        this._isRunning = true;
    };
    /**
    *   Attempt to drive a distance. Returns true or false based on whether or not the drive was successful.
    *
    *   @param {number} distance The distance attempting to cover
    *
    *   @returns {boolean} Whether or not the drive was successful
    */
    Car.prototype.drive = function (distance) {
        if (this._isRunning) {
            this._distanceFromStart += distance;
            return true;
        }
        return false;
    };
    /**
    *   Gives the distance from starting position
    *
    *   @returns {number} Distance from starting position;
    */
    Car.prototype.getPosition = function () {
        return this._distanceFromStart;
    };
    return Car;
}());
// Want to experiment? Try adding a second interface: Flyable. Implement it in a Helicopter class, then write a FlyingCar class that implements both Drivable and Flyable! 
