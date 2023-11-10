import { AppUser, IAppUser } from "~/domain/user-domain";

export interface IUserRepository {
    login(user: IAppUser): Promise<IAppUser | null | undefined>
}

export class AppUserRepository implements IUserRepository {

    async login(user: IAppUser): Promise<IAppUser | null | undefined> {
        return AppUser.findOne(user).then( usr => usr?.toObject())
    }

    async create(user: IAppUser): Promise<IAppUser> {
        const us = new AppUser(user)
        return us.save().then(u => us.toObject())
    }
}