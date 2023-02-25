
import { Prisma } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const register = async (request: Request, response: Response, next: NextFunction) => {
    const password = await bcrypt.hash(request.body.password, 8)
    console.log(password)
    const username = request.body.username
    console.log(username)

    const userAlreadyExists = await prisma.user.findUnique({
        where: { 
            username: username
        }
   });
   return next()
}