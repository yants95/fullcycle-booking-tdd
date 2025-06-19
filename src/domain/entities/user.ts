export class User {
    readonly #id: string;
    readonly #name: string;

    public constructor(id: string, name: string) {
        if (!name) {
            throw new Error('O nome do usuário não pode ser vazio.');
        }

        if (!id) {
            throw new Error('O id do usuário não pode ser vazio.');
        }

        this.#id = id;
        this.#name = name;
    }

    public getId(): string {
        return this.#id;
    }

    public getName(): string {
        return this.#name;
    }
}