interface Foo1 {
    bar: {
        (s: string): string;
        //(n: number): string;
    }
}

var foo_inst: Foo1 = { bar(s: string): string { return "1"; } }

interface Foo {
    name1: string;
}

let foo1: Foo = { name1: "1" };

foo1.name1 = "4";
