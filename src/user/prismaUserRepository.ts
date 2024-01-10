import { UserRepository } from "./userRepository";
import {User, type UserProps} from "../domain/entities/user"
import bcrypt from "bcrypt"
import { PrismaHelper } from "../external/helpers/prismaHelper";
import { HttpResponse } from "../ports/http";
import { ok } from "../helpers/httpHelpers";


export class PrisamUserRepository implements UserRepository {
    async findUserByUsername(username: string): Promise<User | null> {
        return await PrismaHelper?.user.findUnique({
            where: {username: username}
        }) as User | null
        
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await PrismaHelper.user.findUnique({
            where: {email: email}
        }) as User | null
    }

    async createUser(userData: UserProps): Promise<HttpResponse> {
        let newUser = new User(userData)
        let userPasswordHash = await bcrypt.hash(newUser.password, 8)
       let createUser =  await PrismaHelper.user.create({
            data: {
                email: newUser.email,
                password: userPasswordHash,
                username: newUser.username,
            }
        })
        return ok(createUser)
    }
}