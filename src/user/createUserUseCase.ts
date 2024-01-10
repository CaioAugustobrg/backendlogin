import { User, type UserProps } from "../domain/entities/user";
import { MissingParamError, ServerError } from "../errors";
import { badRequest, conflict, ok, serverError } from "../helpers/httpHelpers";
import { HttpRequest, HttpResponse } from "../ports/http";
import { IMessage } from "../providers/IMailProvider";
import mjml2html from "mjml";

import EmailSender from "../providers/implementation/sendgridMailProvider";
import ApiError from "../utils/apiError";
import { PrisamUserRepository } from "./prismaUserRepository";

interface TypedRequest<T> extends HttpRequest {
  body: T;
}

export class CreateUserUseCase {
  constructor(
    private readonly emailSender: EmailSender,
    private readonly prismaUserRepository: PrisamUserRepository
  ) {}
  async handle(HttpRequest: TypedRequest<UserProps>): Promise<HttpResponse> {
    console.log('usecase', HttpRequest.body)
    let gotBodyProperty
    for (const bodyPropeties in HttpRequest?.body) {
      if (bodyPropeties !== '') {
        gotBodyProperty = +1
      }
    }
    if (gotBodyProperty === 0) {
        return badRequest(new MissingParamError('At least one field'))
      }
    try {
      let userEmailAlreadyExists = await this.prismaUserRepository.findUserByEmail(
        HttpRequest.body.email
      );
      if (userEmailAlreadyExists) {
        throw new ApiError({
          code: 409,
          message: "Já existe um usuário com esse email",
        });
      }

      let userUsernameAlreadyExists = await this.prismaUserRepository.findUserByUsername(
        HttpRequest.body.username
      );
      if (userUsernameAlreadyExists) {
        throw new ApiError({
          code: 409,
          message: "Já existe um usuário com esse nome de usuário",
        });
      }
    } catch (error: any) {
        if (error instanceof ApiError) {
            return conflict(error.message);
          }
          }
  
      let newUser = new User(HttpRequest.body);
      let createUser = await this.prismaUserRepository.createUser(newUser);
      //return ok(createUser)
      const htmlOutput = mjml2html(`
    <mjml>
      <mj-head>
        <mj-attributes>
          <mj-text font-family="Arial, sans-serif"></mj-text>
        </mj-attributes>
      </mj-head>
      <mj-body>
        <mj-container>
          <mj-section>
            <mj-column>
              <mj-text>
                Olá, ${newUser.username}!
              </mj-text>
              <mj-text>
                Agradeço por testar meu app.
              </mj-text>
              <mj-text>
                Se quiser conversar ou deixar algum feedback, não deixe de entrar em contato comigo.
              </mj-text>
              <mj-text>
                Obrigado novamente por testar meu aplicativo!
              </mj-text>
              <mj-text>
                Atenciosamente,
              </mj-text>
              <mj-text>
                Caio.
              </mj-text>
              <mj-text>
                Linktree: <a href="https://linktr.ee/caioaugustobraga">Linktree</a>
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-container>
      </mj-body>
    </mjml>
`);

const msg: IMessage = {
to: newUser.email,
from: "caioaugustobrg@gmail.com",
subject: "Obrigado por testar",
html: htmlOutput.html,
amp: true,
};
await this.emailSender.sendEmail(msg);
return ok(createUser);
}
}
