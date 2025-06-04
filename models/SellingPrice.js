const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class SellingPrice {
    constructor(data) {
        this.id = data.id;
        this.amount = data.amount;
        this.active = data.active;
        this.pricedate = data.pricedate;
        this.userID = data.userID;
        this.currencyID = data.currencyID;
        this.currency = data.currency;
        this.modelID = data.modelID;
        this.model = data.model;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    // Obtener todos los precios de venta
    static async getAll() {
        const sellingPrices = await this.knex('sellingprices').select()
        .join('models', 'sellingprices.modelID', 'models.id')
        .join('currencies', 'sellingprices.currencyID', 'currencies.id')
        .select('sellingprices.*', 'models.name','currencies.name'); 
        return sellingPrices.map(sellingPrice => new SellingPrice(sellingPrice));
    }

    // Obtener todos los precios activos
    static async getAllActive() {
        const sellingPrices = await this.knex('sellingprices').where('active', true).select();
        return sellingPrices.map(sellingPrice => new SellingPrice(sellingPrice));
    }

    // Obtener un precio por ID
    static async getById(id) {
        const sellingPrice = await this.knex('sellingprices').where('id', id).first();
        if (!sellingPrice) {
            return null;
        }
        return new SellingPrice(sellingPrice);
    }

    static async getSellPrice(currencyID, modelID) {
        const price = await this.knex('sellingprices')
            .where({
                'sellingprices.currencyID': currencyID,
                'sellingprices.modelID': modelID,
                'sellingprices.active': true
            })
            .select('sellingprices.amount')
            .first();  // Obtiene el primer registro que cumpla con la condición
        console.log(price)
        return price ? price.amount : null; // Devuelve el monto del precio o null si no se encuentra
    }

    // Crear un nuevo precio de venta
    static async create(data) {
        const [id] = await this.knex('sellingprices').insert(data);
        const sellingPrice = await this.knex('sellingprices').where('id', id).first();
        return new SellingPrice(sellingPrice);
    }

    // Actualizar un precio de venta por ID
    static async update(id, data) {
        const affectedRows = await this.knex('sellingprices').where('id', id).update(data);
        if (affectedRows === 0) {
            throw new Error('Selling price not found');
        }
        return await this.getById(id);
    }

    // Eliminar un precio de venta por ID
    static async delete(id) {
        const deletedSellingPrice = await this.knex('sellingprices').where('id', id).del();
        return deletedSellingPrice;
    }
}

module.exports = SellingPrice;
