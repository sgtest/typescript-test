namespace test2 {
    var a: number;
    var b: number;
    var x: number;

    class C1 {
        x: number;

        z: number = a + b;
        z1: number = this.x + x;
    }
}
