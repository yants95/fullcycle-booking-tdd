export class Property {
    readonly #id: string;
    readonly #title: string;
    readonly #description: string;
    readonly #maxGuests: number;
    readonly #basePricePerNight: number;

    constructor(id: string, title: string, description: string, maxGuests: number, basePricePerNight: number) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#maxGuests = maxGuests;
        this.#basePricePerNight = basePricePerNight;
    }

    getId(): string {
        return this.#id;
    }

    getTitle(): string {
        return this.#title;
    }

    getDescription(): string {
        return this.#description;
    }

    getMaxGuests(): number {
        return this.#maxGuests;
    }

    getBasePricePerNight(): number {
        return this.#basePricePerNight;
    }
}