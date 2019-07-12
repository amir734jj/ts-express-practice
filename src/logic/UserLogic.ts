import { inject, injectable } from 'tsyringe';
import { User } from '../models/user';
import IUserLogic from './interfaces/IUserLogic';
import IUserDal from '../dal/interfaces/IUserDal';

@injectable()
export default class UserLogic implements IUserLogic {
    constructor(@inject("UserDal") private userDal: IUserDal) {
    }

    async delete(id: string): Promise<User> {
        return await this.userDal.delete(id);
    }

    async getAll(): Promise<User[]> {
        return await this.userDal.getAll();
    }

    async get(id: string): Promise<User> {
        return await this.userDal.get(id);
    }

    async save(user: User): Promise<User> {
        // TODO: hash the password
        return await this.userDal.save(user);
    }

    async update(id: string, user: User): Promise<User> {
        // TODO: hash the password
        return await this.userDal.update(id, user);
    }
}
