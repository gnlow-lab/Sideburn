type Action<E> = (e: E) => E

class Group<E> {
    actions
    constructor(actions: Action<E>[]) {
        this.actions = actions
    }
}

const rotate =
    (n: number) =>
    (str: string) => [
        ...str.slice(n),
        ...str.slice(0, n),
    ].join("")

const id = <E>(e: E) => e

const str4 = new Group<string>([
    id,
    rotate(1),
    rotate(2),
    rotate(3),
])