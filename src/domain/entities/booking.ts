import { DateRange } from "../value-objects/date-range";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
    readonly #id: string;
    readonly #property: Property;
    readonly #user: User;
    readonly #dateRange: DateRange;
    readonly #guestCount: number;
    #status: 'CONFIRMED' | 'CANCELLED' = 'CONFIRMED';
    #totalPrice: number = 0;

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
        if (!property.isAvailable(dateRange)) {
            throw new Error('A propriedade já está reservada para este período');
        }

        this.#id = id;
        this.#property = property;
        this.#user = user;
        this.#dateRange = dateRange;
        this.#guestCount = guestCount;
        this.#totalPrice = property.calculateTotalPrice(dateRange);
        this.#status = 'CONFIRMED'; 

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

    getTotalPrice(): number {
        return this.#totalPrice;
    }

    cancel(currentDate: Date): void {
        if (this.#status === 'CANCELLED') {
            throw new Error('A reserva já está cancelada.');
        }
        this.#status = 'CANCELLED';

        const checkinDate = this.#dateRange.getStartDate();
        const timeDiff = checkinDate.getTime() - currentDate.getTime();
        const daysUntilCheckin = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysUntilCheckin > 7) {
            this.#totalPrice = 0;
        } else if (daysUntilCheckin >= 1) {
            this.#totalPrice *= 0.5;
        }
    }
}