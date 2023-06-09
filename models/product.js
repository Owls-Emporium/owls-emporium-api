const db = require('../config/config');


const Product ={};


Product.getAll = ()=>{
    const sql = `
    SELECT
         * 
    FROM 
        public.products
    ORDER BY id ASC
    `;

    return db.manyOrNone(sql);
}

Product.finByCategory = (id_category) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.id_category
    FROM
        products AS P
    INNER JOIN
        categories AS C
    ON
        P.id_category = C.id
    WHERE 
        C.id= $1
    `;
    return db.manyOrNone(sql, id_category);
}

Product.findByName = (name) => {
    const sql = `
    SELECT 
        P.id,
        P.name,
        P.description,
        P.price,
        json_agg(
            json_build_object(
                'id', C.id,
                'name', C.name
            )
        ) AS condition
    FROM
        products AS P
    INNER JOIN 
        products_has_condition AS PHC
    ON
        PHC.id_product = P.id
    INNER JOIN
        condition AS C
    ON
        C.id = PHC.id_condition
    WHERE
        p.name = $1
    GROUP BY 
        p.id
    `;
    
    return db.oneOrNone(sql, name);
}

Product.create = (product) => {
    const sql = `
        INSERT INTO 
            product(
                name,
                description,
                price,
                image1,
                image2,
                image3,
                id_category,
                created_at,
                update_at
            )
        VALUES(
            $1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    return db.oneOrNone(sql,[
        product.name,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_category,
        new Date(),
        new Date()
    ])
}

Product.update = (product) => {
    const sql = `
    UPDATE
        products
    SET
        name=$2,
        description = $3,
        price = $4,
        image1 = $5,
        image2 = $6,
        image3 = $7,
        id_category = $8,
        updated_at = $9
    WHERE
        id = $1
    `;
    return db.none(sql, [
        product.id,
        product.name,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_category,
        new Date()
    ]);
}

module.exports = Product;