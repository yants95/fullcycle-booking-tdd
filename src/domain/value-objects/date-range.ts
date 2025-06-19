export class DateRange {
    readonly #startDate: Date;
    readonly #endDate: Date;

    public constructor(startDate: Date, endDate: Date) {
        this.validateDates(startDate, endDate);
        this.#startDate = startDate;
        this.#endDate = endDate;
    }

    private validateDates(startDate: Date, endDate: Date): void {
        if (endDate == startDate) {
            throw new Error('A data de início e término não podem ser iguais.');
        }

        if (endDate < startDate) {
            throw new Error('A data de término deve ser posterior à data de início.');
        }
    }

    public getStartDate(): Date {
        return this.#startDate;
    }

    public getEndDate(): Date {
        return this.#endDate;
    }

    public getTotalNights(): number {
        const start = this.#startDate.getTime();
        const end = this.#endDate.getTime();
        
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    }

    public overlaps(other: DateRange): boolean {
        return this.#startDate < other.getEndDate() && this.#endDate > other.getStartDate();
    }
}