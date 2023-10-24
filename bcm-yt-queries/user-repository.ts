import { AppUser, IAppUser } from "./user-domain";

export interface IUserRepository {
    createUser(user: IAppUser): Promise<IAppUser>
    login(user: IAppUser): Promise<IAppUser | null>
}

export class AppUserRepository implements IUserRepository {

    async createUser(user: IAppUser): Promise<IAppUser> {
        const usr = new AppUser(user)
        return usr.save().then(u => u.toObject()) // not necessary here for this time
    }

    async login(user: IAppUser): Promise<IAppUser | null> {
        return AppUser.findOne(user)
    }
}