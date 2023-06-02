//const passport = require('../config/passport');
const User = require('../models/user');
const  Rol= require('../models/rol');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

module.exports ={
    async getAll(req,res,next){
        try{
            const data = await User.getAll();
            console.log(`User: ${data}`);
            return res.status(201).json(data);
        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status(501).json(
                {
                   success: false,
                   message: 'Error al obtener los usuarios en getall' 
                }
            );
        }
    },

    async register(req,res,next){
        try {
            const user = req.body;
            const data = await User.create(user);

            await Rol.create(data.id, 1);

            const token = jwt.sign({id: data.id, email: user.email,}, keys.secretOrKey,{
                //expiresIn: 
            })

            const myData ={
                id: data.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                image: user.image,
                session_token: `JWT ${token}`
            };

            return res.status(201).json({
                success: true,
                message: 'El resgistro se realizo correctamente',
                data : myData
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'No se puede realizar el registro usercontrollers',
                error: error
            });
        }
    },

    async login(req,res,next){
        try {
            
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);

            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                })
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if(isPasswordValid){
                const token = jwt.sign({id: myUser.id, email: myUser.email,}, keys.secretOrKey,{
                    //expiresIn: 
                })
                const data ={
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                };
                //when user get rol
                    console.log(`Usuario enviado ${data}`)
                    
                return res.status(201).json({
                    success: true,
                    message: 'El usuario ha sido auntentificado',
                    data: data
                });
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: 'la contraseña es incorrecta'
                });
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'sucedio un error en el login de usuario usercontrollers',
                error: error
            });
        }
    }
};



