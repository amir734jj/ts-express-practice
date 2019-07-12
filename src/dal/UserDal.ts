import { injectable } from 'tsyringe';
import { User } from '../models/user';
import IUserDal from './interfaces/IUserDal';

@injectable()
export default class UserDal implements IUserDal {
    async delete(id: string): Promise<User> {
        let user = await User.findById(id);
        await user.destroy();
        return user;
    }

    async getAll(): Promise<User[]> {
        return await User.findAll();
    }

    async get(id: string): Promise<User> {
        return await User.findById(id);
    }

    async save(user: User): Promise<User> {
        return await User.build(user).save();
    }

    async update(id: string, user: User): Promise<User> {
        // noinspection JSUnusedGlobalSymbols
        await User.update(user, { where: { id } });
        return user;
    }
}
