import { User } from '../../models/user';

export default interface IUserLogic {
    getAll(): Promise<User[]>

    get(id: string): Promise<User>

    delete(id: string): Promise<User>

    update(id: string, user: User): Promise<User>

    save(user: User): Promise<User>
}
