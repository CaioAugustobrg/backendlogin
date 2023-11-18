import { type Request, type Response } from 'express'
import { CreateUserUseCase } from './createUserUseCase'
import { type HttpRequest } from '../ports/http';

export class CreateUserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ) {}
    async handle (request: Request, response: Response) {
        const httpRequest: HttpRequest = {
            body: request.body,
          };
        console.log(request.body)
        let httpResponse = await this.createUserUseCase.handle(httpRequest)
        return response.status(httpResponse.statusCode).json(httpResponse.body)
    }
}