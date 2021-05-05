const {response} = require('express');
const {validationResult} =require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res=response)=>{
    const { email, password} = req.body;


    try { //Usuario.findOne({email: 'joni@gmail.com'})
        let usuario = await Usuario.findOne({email});
       

        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        usuario = new Usuario(req.body);

        //Encriptar contraseña
        //genSaltSync numero de vueltas 10 default
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        //generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Porfavor hable con el administrador'
        });
    }

   
}

const loginUsuario = async (req, res=response)=>{
  
    const { email, password} = req.body;

    try {
        const usuario = await Usuario.findOne({email});
    

        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'El usuario existe con ese email'
            });
        }
        //confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'password incorrecto'
            });
        }
        //generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Porfavor hable con el administrador'
        });
    }

    
}



const revalidarToken= async(req, res=response)=>{

    const {uid, name} = req;//+elegante
    //generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid, name,//estos solo para probar
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

}