namespace internal_modules2 {
    module M {
        export interface P { x: number; y: number; }
        export var a = 1;
    }

    module A.B.C {
        export var x = 1;
    }

    var p: M.P; // M used as ModuleName
    var m = M; // M used as PrimaryExpression
    var x1 = M.a; // M used as PrimaryExpression
    var x2 = m.a; // Same as M.a
}
