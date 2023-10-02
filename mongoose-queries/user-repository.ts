import { IUser, User } from "./user-domain";

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>
    login(user: IUser): Promise<IUser | undefined>
}

export class UserRepository implements IUserRepository {

    async createUser(usr: IUser): Promise<IUser> {
        const user = new User(usr);
        return user.save()
    }

    async login(usr: IUser): Promise<IUser | undefined> {
        return await User.findOne(usr) || undefined
    }
}

