const Category = require('../controllers/usersControllers');
const {create} = require('../models/user');

module.exports ={

    async create(req, res, nest) {

        try {

            const category = JSON.parse(req.body.category);
            console.log('category', category);

            /*const files = req.files;

            if(files.length > 0 ) {  //client send a archivo

                const pathImage = `image_${Date.now()}`; // nombre del archivo
                const url = await storage(file[0],pathImage);

                if(url != indefined && url != null) {
                    user.image = url;
                }
            }*/

            const data = await Category.create(category);
            return res.status(201).json({
                success: true,
                message: 'La categoria se creo correctamente',
                data: {
                    'id': data.id
                }
            })
            
        } catch (error) {
            console.log('Error', error);

            return res.status(501).json({
                success: false,
                message: 'hubo un error al crear el tags',
                error: error
            })
        }
    }

}