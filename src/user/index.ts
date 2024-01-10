import EmailSender from "../providers/implementation/sendgridMailProvider";
import { CreateUserController } from "./createUserController";
import { CreateUserUseCase } from "./createUserUseCase";
import { PrisamUserRepository } from "./prismaUserRepository";


const prismaUserRepository = new PrisamUserRepository();
const emailSender = new EmailSender(process.env.SENDGRID_API_KEY as string)
const createUserUseCase = new CreateUserUseCase(
    emailSender,
    prismaUserRepository
);
const createUserController = new CreateUserController(
    createUserUseCase
)
export {createUserUseCase,
      createUserController }