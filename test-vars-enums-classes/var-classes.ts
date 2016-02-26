namespace test3 {
    class C1 {
        static c: number;
        x: number;
        y: number;
        z: number = this.x + this.y + C1.c;
    }

    var c1_inst: C1 = new C1();
    c1_inst.x + c1_inst.y + c1_inst.z;
}
