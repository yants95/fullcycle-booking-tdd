import { User } from './user'

describe('User Entity', () => {
    it('should create a instance with id and name', () => {
        const user = new User('1', 'john doe')

        expect(user.getId()).toBe('1')
        expect(user.getName()).toBe('john doe')
    })

    it('should throw an error if name is empty', () => {
        expect(() => {
            new User('1', '')
        }).toThrow('O nome do usuário não pode ser vazio.')
    })

    it('should throw an error if id is empty', () => {
        expect(() => {
            new User('', 'john doe')
        }).toThrow('O id do usuário não pode ser vazio.')
    })
})