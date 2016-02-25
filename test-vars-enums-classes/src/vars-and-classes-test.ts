namespace test5 {
    class C1 {
        a: string;
        f2(x: string, y: number) {
            var z: string;
            x + y + z + this.a;

        }
    }

    var c_inst3: C1 = new C1();
    c_inst3.a;
    c_inst3.f2("2", 2);
}
