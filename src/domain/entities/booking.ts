import { DateRange } from "../value-objects/date-range";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
    readonly #id: string;
    readonly #property: Property;
    readonly #user: User;
    readonly #dateRange: DateRange;
    readonly #guestCount: number;
    readonly #status: 'CONFIRMED' | 'CANCELLED' = 'CONFIRMED';

    constructor(
        public id: string,
        public property: Property,
        public user: User,
        public dateRange: DateRange,
        public guestCount: number
    ) {
        if (guestCount <= 0) {
            throw new Error('O número de hóspedes deve ser maior que zero');
        }
        property.validateGuestCount(guestCount);
        
        this.#id = id;
        this.#property = property;
        this.#user = user;
        this.#dateRange = dateRange;
        this.#guestCount = guestCount;

        property.addBooking(this);
    }

    getId(): string {
        return this.#id;
    }

    getProperty(): Property {
        return this.#property;
    }

    getUser(): User {
        return this.#user;
    }

    getDateRange(): DateRange {
        return this.#dateRange;
    }

    getGuestCount(): number {
        return this.#guestCount;
    }

    getStatus(): 'CONFIRMED' | 'CANCELLED' {
        return this.#status;
    }
}