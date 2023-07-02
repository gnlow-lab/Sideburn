import {
    Permutation
} from "npm:js-combinatorics"

import Iteruyo, { $ } from "https://deno.land/x/iteruyo@v0.3.0/mod.ts"

import { Group } from "../mod.ts"

const set = [...new Set($(new Permutation("(())xx")).map(x => x.join("")).toArray())]
console.log(set)

const od = new Group({
    set,
    actions: [
        s => s,
        s => s.slice(3) + s.slice(0, 3),
    ],
})

console.log(od.burnside())
console.log(od.calc().length)