import {
    Permutation
} from "npm:js-combinatorics"

import Iteruyo, { $ } from "https://deno.land/x/iteruyo@v0.3.0/mod.ts"

import { Group, Action } from "../mod.ts"

const set = [...new Set($(new Permutation("(())xx")).map(x => x.join("")).toArray())]
console.log(set)

const id: Action<string> = s => s
const rot180: Action<string> = s => s.slice(3) + s.slice(0, 3)
const flip: Action<string> = s => [...s].reverse().map(x => x == "(" ? ")" : x == ")" ? "(" : x).join("")

const flow = <E>(f: Action<E>, g: Action<E>) => (e: E) => g(f(e))

const od = new Group({
    set,
    actions: [
        id,
        rot180,
        flip,
        flow(rot180, flip),
    ],
})

console.log(od.burnside())
console.log(od.calc().length)
console.log(od.calc().map(x => x.slice(0, 3)+"-"+x.slice(3)).filter(str => !/\(x-x\)|x.-.x|\(x\)|x[^-]x/.test(str)))