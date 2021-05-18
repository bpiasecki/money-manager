export class ItemKeyWithData<T> {
    constructor(
        public key: string,
        public data: T
    ) { }
}