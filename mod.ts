import Iteruyo, { $ } from "https://deno.land/x/iteruyo@v0.3.0/mod.ts"

import {
    BaseN
} from "npm:js-combinatorics"

type Action<E> = (e: E) => E

interface Group<E> {
    actions: Action<E>[]
    eq: (e1: E, e2: E) => boolean
    compare: (e1: E, e2: E) => number
    set: E[]
}

const mean = (arr: Iteruyo<number>) =>
    arr.reduce((a, b) => a + b, 0) / arr.length

const defaultCompare = (e1: any, e2: any) =>
      e1 > e2 ? 1
    : e1 < e2 ? -1
    : 0

class Group<E> {
    constructor({
        actions = [],
        eq = (e1, e2) => e1 == e2,
        compare = defaultCompare,
        set = [],
    }: Partial<Group<E>>) {
        this.actions = actions
        this.eq = eq
        this.compare = compare
        this.set = set
    }

    burnside() {
        const { actions, eq, set } = this
        console.log(set)

        return $(actions)
            .map(action =>
                set .filter(e => eq(e, action(e)))
                    .length
            )
            .bypass(x => console.log(x.toArray()))
            .pipe(mean)
    }

    calc() {
        const { actions, compare, set } = this

        return Array.from(new Set(set.map(e =>
            actions
                .map(action => action(e))
                .sort(compare)[0]
        )))
    }
}

const rotate =
    (n: number) =>
    (str: string) => [
        ...str.slice(n),
        ...str.slice(0, n),
    ].join("")

const id = <E>(e: E) => e

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

console.log(str4.burnside())
console.log(str4.calc())