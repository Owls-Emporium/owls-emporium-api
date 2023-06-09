const db = require('../config/config');

const Condition = {}

Condition.create = (id_product, id_condition) => {

    const sql = `
    INSERT INTO
        products_has_condition(
            id_product,
            id_condition,
            created_at,
            update_at
        )
        VALUES ($1, $2, $3, $4) 
    `;

    return db.none(sql, [
        id_product,
        id_condition,
        new Date(),
        new Date()
    ]);
}

module.exports = Condition;