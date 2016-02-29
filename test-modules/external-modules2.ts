/// <reference path="typings/commander/commander.d.ts" />

import * as fs from "fs";
import {readFileSync} from "fs";

import * as commander from "commander";

commander.command('hello');

commander.addImplicitHelpCommand();

console.log("HELLO");

var fileName: string = "test1";
fs.readFileSync(fileName).toString();
