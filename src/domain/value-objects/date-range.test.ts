import { DateRange } from './date-range'

describe('DateRange', () => {
    it('should throew an error if start date is after end date', () => {
        expect(() => {
            new DateRange(new Date('2024-12-25'), new Date('2024-12-20'))
        }).toThrow('A data de término deve ser posterior à data de início.')
    })

    it('should create a valid date range', () => {
        const startDate = new Date('2024-12-20');
        const endDate = new Date('2024-12-25');

        const dateRange = new DateRange(startDate, endDate);

        expect(dateRange.getStartDate()).toEqual(startDate);
        expect(dateRange.getEndDate()).toEqual(endDate);
    })

    it('should calculate total nights correctly', () => {
        const startDate = new Date('2024-12-20');
        const endDate = new Date('2024-12-25');
        const dateRange = new DateRange(startDate, endDate);

        const totalNights = dateRange.getTotalNights();

        expect(totalNights).toBe(5);
    })
})