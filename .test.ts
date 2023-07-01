import { assert, assertEquals } from "https://deno.land/std@0.189.0/testing/asserts.ts"

import Iteruyo, { $ } from "https://deno.land/x/iteruyo@v0.3.0/mod.ts"

import {
    BaseN
} from "npm:js-combinatorics"

import { Group } from "./mod.ts"

const rotate =
    (n: number) =>
    (str: string) => [
        ...str.slice(n),
        ...str.slice(0, n),
    ].join("")

const id = <E>(e: E) => e

Deno.test("[wb]{4}, rotate", () => {
    const str4 = new Group<string>({
        actions: [
            id,
            rotate(1),
            rotate(2),
            rotate(3),
        ],
        set: $(new BaseN("wb", 4))
            .map(x => x.join(""))
            .toArray()
    })

    assertEquals(str4.burnside(), 6)
    assertEquals(str4.calc().length, 6)
})