import { Data } from "./Data";

export class Counter extends Data {
    count: number
    user: string

    constructor(count: number, user: string) {
        super();
        this.count = count;
        this.user = user;
    }
}