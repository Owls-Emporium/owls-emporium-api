const db = require('../config/config');

const category = {};

category.create = (category) => {

    const sql =`
    INSERT INTO 
        categories(
            name,
            created_at,
            update_at
        )
        VALUES($1, $2, $3) RETURNING id
    `;

    return db.oneOrNone(sql,[
        category.name,
        new Date(),
        new Date()
    ])
};

module.exports = category;