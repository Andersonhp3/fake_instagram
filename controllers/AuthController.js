const {Usuario} = require("../models")
const bcrypt = require("bcrypt")

const AuthController = {
    
    showLogin: (req,res) => {
        res.render('auth/login');
    },

    showRegistro: (req,res) => {
        res.render('auth/register');
    },

    showHome: (req,res) => {
        console.log(req.session.usuario)
        res.render('index');
    },
    login: async (req, res) => {

        // Lenda as info do body
        const { email, senha } = req.body;

        // tentar carregar um usuário
        const user = await Usuario.findOne({where: { email }});

        // Verificar se existe usuário com o email recebido
        if(!user) {
            res.redirect("/login?error=1")
        }

        // Validar senha
        if(!bcrypt.compareSync(senha, user.senha)) {
            res.redirect("/login?error=1");
        }

        // setar uma session com o usuario
        req.session.usuario = user;

        // redirecionar o usuario para a rota "/home"
        res.redirect('/home')
    }

}

module.exports = AuthController;