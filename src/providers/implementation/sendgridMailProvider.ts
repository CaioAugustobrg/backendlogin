import sgMail from "@sendgrid/mail";
import { type IMessage } from "../IMailProvider";

class EmailSender {
  constructor(private apiKey: string) {
    sgMail.setApiKey(apiKey);
  }

  async sendEmail(message: IMessage): Promise<void> {
    try {
      const response = await sgMail.send(message);
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default EmailSender;
