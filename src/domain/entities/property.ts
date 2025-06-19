export class Property {
    readonly #id: string;
    readonly #name: string;
    readonly #description: string;
    readonly #maxGuests: number;
    readonly #basePricePerNight: number;

    constructor(id: string, name: string, description: string, maxGuests: number, basePricePerNight: number) {
        if (!name) {
            throw new Error('O nome é obrigatório');
        }

        if (maxGuests <= 0) {
            throw new Error('O número máximo de hóspedes deve ser maior que zero');
        }
        this.validateGuestCount(maxGuests);
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#maxGuests = maxGuests;
        this.#basePricePerNight = basePricePerNight;
    }

    getId(): string {
        return this.#id;
    }

    getName(): string {
        return this.#name;
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

    validateGuestCount(guestCount: number): void {
        if (guestCount > this.#maxGuests) {
            throw new Error(`O número de hóspedes excede o máximo permitido. Máximo permitido: ${this.#maxGuests}`);
        }
    }
}