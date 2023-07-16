import {
    Permutation
} from "npm:js-combinatorics"

import Iteruyo, { $ } from "https://deno.land/x/iteruyo@v0.3.0/mod.ts"

import { Group } from "../mod.ts"

const set = $(new Set(
    $(new Permutation("aabbccxx"))
        .map(x => x.join(""))
        .toArray()
))
    .toArray()
console.log(set)

const swap =
    (charset: string) =>
    (newCharset: string) =>
    (str: string) =>
        $(str)
            .map(c => 
                charset.indexOf(c) == -1
                    ? c
                    : newCharset[
                        charset.indexOf(c)
                    ]
            )
            .join("")

const od = new Group({
    set,
    actions: [
        s => s,
        s => s.slice(4) + s.slice(0, 4),
        swap("abc")("acb"),
        swap("abc")("bac"),
        swap("abc")("bca"),
        swap("abc")("cab"),
        swap("abc")("cba"),
    ],
})

console.log(od.burnside())
console.log(od.calc().length)
