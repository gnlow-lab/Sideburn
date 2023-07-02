const count =
    (str: string) =>
    (arr: string[]) =>
    arr.filter(x => x == str).length

const pp =
    (curr: string, remain: string[]): string[] =>
    remain.length == 0
        ? [curr]
        : remain
        .flatMap(
            (x, i, l) => {
                if (x == "x") {
                    if (curr == "") return []
                }
                if (x == ")") {
                    if (count("(")(remain) == count(")")(remain)) {
                        return []
                    }
                }
                return pp(
                    curr + x,
                    l.filter((_, j) => i != j),
                )
            }
        )

const undup =
    (arr: string[]) =>
    [...new Set(arr)]

const t =
    undup(pp("(", "(xx))".split("")))
    .flatMap(str => {
        const [a,b,c,d,e,f] = str
        return [
            [e+f+a, b+c+d],
            [f+a+b, c+d+e],
            [a+b+c, d+e+f],
        ].map(x => x.join(""))
    })

import { Group } from "../mod.ts"

const set = [...new Set(t)]
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