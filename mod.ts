import Iteruyo, { $ } from "https://deno.land/x/iteruyo@v0.3.0/mod.ts"

type Action<E> = (e: E) => E

export interface Group<E> {
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

export class Group<E> {
    constructor({
        actions = [],
        eq = (e1, e2) => e1 == e2,
        compare = defaultCompare,
        set = [],
    }: Partial<Group<E>>) {
        this.actions = actions.map(action =>
            e => {
                const result = action(e)
                if (!set.includes(result))
                    throw new Error(`\nAction is not closed:\n\t"${e}" -> "${result}"`)
                return result
            }
        )
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