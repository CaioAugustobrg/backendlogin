const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const path = require("path")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { eAdmin } = require("./middleware/auth.js");
require("dotenv").config();
const createUser = require("./middleware/createUser");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
// use `prisma` in your application to read and write data in your DB



app.get("/", eAdmin, async (req, res) => {
  return res.json({
    erro: false,
    mensagem: "Token autorizado!",
  });
});

app.post("/register", createUser);

app.post("/login", async (req, res) => {
  
  console.log(req.body);
  const {  password, email } = req.body;
  const hashPassword = await bcrypt.hash(password, 8);
  let token = jwt.sign({ id: 1 }, "AS3O20A193KS39DJANVN81937G", {
    expiresIn: "7d",
  });
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email 
        
      },
    });
    if (user === null) {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Email ou senha incorreto(s)!",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Usuário ou senha incorreto(s)!",
      });
    }
    return res.status(200).json({
      erro: false,
      mensagem: "Login efetuado com sucesso!",
      token: token,
      
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: " + ${error}`,
    });
  }
});

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; ` +
      `press CRTL + C to terminate.`
  )
);
