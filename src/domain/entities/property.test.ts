import { Property } from './property'

describe('Property Entity', () => {
    it('should create a property with valid data', () => {
        const property = new Property('1', 'casa de praia', 'uma bela casa na praia', 4, 200)

        expect(property.getId()).toBe('1')
        expect(property.getTitle()).toBe('casa de praia')
        expect(property.getDescription()).toBe('uma bela casa na praia')
        expect(property.getMaxGuests()).toBe(4)
        expect(property.getBasePricePerNight()).toBe(200)
    })
})