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
})