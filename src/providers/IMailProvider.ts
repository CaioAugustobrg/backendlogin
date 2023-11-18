export interface IMessage {
  to: string;
  from: string;
  subject: string;
  html: any;
  amp: boolean;
}

export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>;
}
