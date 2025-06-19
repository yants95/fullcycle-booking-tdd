import { Property } from './property'
import { DateRange } from '../value-objects/date-range'

describe('Property Entity', () => {
    it('should create a property with valid data', () => {
        const property = new Property('1', 'casa de praia', 'uma bela casa na praia', 4, 200)

        expect(property.getId()).toBe('1')
        expect(property.getName()).toBe('casa de praia')
        expect(property.getDescription()).toBe('uma bela casa na praia')
        expect(property.getMaxGuests()).toBe(4)
        expect(property.getBasePricePerNight()).toBe(200)
    })

    it('should throw an error if name is empty', () => {
        expect(() => {
            new Property('1', '', 'uma bela casa na praia', 4, 200)
        }).toThrow('O nome é obrigatório')
    })

    it('should an error if maxGuests is zero or negative', () => {
        expect(() => {
            new Property('1', 'casa de praia', 'uma bela casa na praia', 0, 200)
        }).toThrow('O número máximo de hóspedes deve ser maior que zero')

        expect(() => {
            new Property('1', 'casa de praia', 'uma bela casa na praia', -1, 200)
        }).toThrow('O número máximo de hóspedes deve ser maior que zero')
    })

    it('should validate max number of guests', () => {
        const property = new Property('1', 'casa de campo', 'uma bela casa na praia', 5, 150)

        expect(() => {
            property.validateGuestCount(6)
        }).toThrow('O número de hóspedes excede o máximo permitido. Máximo permitido: 5')
    })

    it('should not apply discounts for stays less than 7 nights', () => {
        const property = new Property('1', 'apartamento', 'uma bela casa na praia', 2, 100)
        const dateRange = new DateRange(new Date('2024-10-10'), new Date('2024-10-16'))
        
        const totalPrice = property.calculateTotalPrice(dateRange)
        
        expect(totalPrice).toBe(600)
    })

    it('should not apply discounts for stays more than 7 nights', () => {
        const property = new Property('1', 'apartamento', 'uma bela casa na praia', 2, 100)
        const dateRange = new DateRange(new Date('2024-10-10'), new Date('2024-10-17'))
        
        const totalPrice = property.calculateTotalPrice(dateRange)
        
        expect(totalPrice).toBe(630)
    })
})