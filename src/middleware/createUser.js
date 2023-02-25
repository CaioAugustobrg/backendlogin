const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
require("dotenv").config();
const sgMail = require('@sendgrid/mail')

module.exports = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashPassword = await bcrypt.hash(req.body.password, 8);
    const userExits = await prisma.user.findUnique({
      where: { username },
    });

    if (userExits) {
      return res.status(400).json({
        erro: true,
        mensagem: "Username em uso por outro usuário!",
      });
    }

    const emailExits = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExits) {
      return res.status(400).json({
        erro: true,
        mensagem: "Email em uso por outro usuário!",
      });
    }

    const user = await prisma.user.create({
      data: {
        username: username,

        email: email,

        password: hashPassword,

        createdAt: new Date()
      },
    });

    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: `${email}`,
      from: 'caioaugustobrg@gmail.com',
      subject: 'Obrigado por usar meu app',
      text: `Eai, ${username}. Esse é um email automático enviado para o email que você cadastrou na minha aplicação. Você pode encontrar o algoritmo que faz isso aqui: https://github.com/CaioAugustobrg/backendlogin2/blob/main/src/middleware/createUser.js. Mais uma vez: muito obrigado por testar minha aplicação. Fale comigo: https://www.linkedin.com/in/caioaugustobrg/`,
      html: `<strong>${username}</strong>`,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })

    return res.status(200).json({
      user,
      erro: false,
      mensagem: "Usuário cadastrado com sucesso!",
      email: "Enviado"
    });





  } catch (error) {
    return res.status(400).json({
      Erro: true,
      mensagem: "Erro: " + error,
    });
  }
};
