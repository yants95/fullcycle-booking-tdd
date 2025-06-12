export class DateRange {
    readonly #startDate: Date;
    readonly #endDate: Date;

    public constructor(startDate: Date, endDate: Date) {
        if (endDate <= startDate) {
            throw new Error('A data de término deve ser posterior à data de início.');
        }

        this.#startDate = startDate;
        this.#endDate = endDate;
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
}