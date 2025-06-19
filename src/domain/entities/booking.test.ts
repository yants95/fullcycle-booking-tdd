import { DateRange } from "../value-objects/date-range"
import { Property } from "./property"
import { User } from "./user"
import { Booking } from "./booking"

describe('Booking Entity', () => {
    it('should create a booking with valid data', () => {
        const property = new Property('1', 'Casa de Praia', 'Uma bela casa na praia', 4, 200)
        const user = new User('1', 'João Silva')
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'))
        
        const booking = new Booking('1', property, user, dateRange, 2)

        expect(booking.getId()).toBe('1')
        expect(booking.getProperty()).toBe(property)
        expect(booking.getUser()).toBe(user)
        expect(booking.getDateRange()).toBe(dateRange)
        expect(booking.getGuestCount()).toBe(2)
    })

    it('should throw an error if guest count is zero or negative', () => {
        const property = new Property('1', 'Casa de Praia', 'Uma bela casa na praia', 4, 200)
        const user = new User('1', 'João Silva')
        const dateRange = new DateRange(new Date('2024-12-10'), new Date('2024-12-15'))

        expect(() => {
            new Booking('1', property, user, dateRange, 0)
        }).toThrow('O número de hóspedes deve ser maior que zero')

        expect(() => {
            new Booking('1', property, user, dateRange, -1)
        }).toThrow('O número de hóspedes deve ser maior que zero')
    })

    it('should throw an error trying to book with guest count above than max allowed', () => {
        const property = new Property('1', 'Casa de Praia', 'Uma bela casa na praia', 4, 200)
        const user = new User('1', 'João Silva')
        const dateRange = new DateRange(new Date('2024-12-10'), new Date('2024-12-15'))

        expect(() => {
            new Booking('1', property, user, dateRange, 5)
        }).toThrow('O número de hóspedes excede o máximo permitido. Máximo permitido: 4')
    })

    it('should calculate total price with discount', () => {
        const property = new Property('1', 'Apartamento', 'Um lindo apartamento', 4, 300)
        const user = new User('1', 'Ana Souza')
        const dateRange = new DateRange(new Date('2024-12-01'), new Date('2024-12-10'))

        const booking = new Booking('1', property, user, dateRange, 4)

        expect(booking.getTotalPrice()).toBe(300 * 9 * 0.9)
    })

    it('should not book when property is already booked for the date range', () => {
        const property = new Property('1', 'Apartamento', 'Um lindo apartamento', 4, 300)
        const user = new User('1', 'Ana Souza')
        const dateRange = new DateRange(new Date('2024-12-01'), new Date('2024-12-10'))
        new Booking('1', property, user, dateRange, 4)
        const dateRange2 = new DateRange(new Date('2024-12-02'), new Date('2024-12-09'))

        expect(() => {
            new Booking('2', property, user, dateRange2, 4)
        }).toThrow('A propriedade já está reservada para este período')
    })

    it('should cancel a booking without refund when has 1 day left for check-in', () => {
        const property = new Property('1', 'Apartamento', 'Um lindo apartamento', 4, 300)
        const user = new User('1', 'Ana Souza')
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-22'))
        const booking = new Booking('1', property, user, dateRange, 4)

        const currentDate = new Date('2024-12-20')
        booking.cancel(currentDate)

        expect(booking.getStatus()).toBe('CANCELLED')
        expect(booking.getTotalPrice()).toBe(600)
    })

    it('should cancel a booking with total refund when date if higher than 7 days of cancelling date', () => {
        const property = new Property('1', 'Apartamento', 'Um lindo apartamento', 4, 300)
        const user = new User('1', 'Ana Souza')
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'))
        const booking = new Booking('1', property, user, dateRange, 4)

        const currentDate = new Date('2024-12-10')
        booking.cancel(currentDate)

        expect(booking.getStatus()).toBe('CANCELLED')
        expect(booking.getTotalPrice()).toBe(0)
    })

    it('should cancel a booking with partial refund when date is between 1 and 7 days before check-in', () => {
        const property = new Property('1', 'Apartamento', 'Um lindo apartamento', 4, 300)
        const user = new User('1', 'Ana Souza')
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'))
        const booking = new Booking('1', property, user, dateRange, 4)
        const currentDate = new Date('2024-12-15')
        
        booking.cancel(currentDate)

        expect(booking.getStatus()).toBe('CANCELLED')
        expect(booking.getTotalPrice()).toBe(300 * 5 * 0.5)
    })

    it('should not allow cancel a booking more than once', () => {
        const property = new Property('1', 'Apartamento', 'Um lindo apartamento', 4, 300)
        const user = new User('1', 'Ana Souza')
        const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-25'))
        const booking = new Booking('1', property, user, dateRange, 4)
        const currentDate = new Date('2024-12-15')

        booking.cancel(currentDate)
        
        expect(() => booking.cancel(currentDate)).toThrow('A reserva já está cancelada.')
    })
})