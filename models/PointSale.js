const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class PointSale {
    constructor(data) {
        this.id = data.id;
        this.pos_GUID = data.pos_GUID;
        this.name = data.name;
        this.description = data.description;
        this.pos_details = JSON.parse(data.pos_details);
        this.association_date = data.association_date;
        this.active = data.active;
        this.point_sale_category_id = data.point_sale_category_id;
        this.business_id = data.business_id;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const pos = await this.knex('point_sale').select();
        return pos.map(p => new PointSale(p));
    }

    static async getById(id) {
        const pos = await this.knex('point_sale').where('id', id).first();
        if (!pos) {
            return null;
        }
        return new PointSale(pos);
    }

    static async getByName(name) {
        const pos = await this.knex('point_sale').where('name', name).first();
        if (!pos) {
            return null;
        }
        return new PointSale(pos);
    }

    static async getByGUID(GUID) {
        const pos = await this.knex('point_sale').where('pos_GUID', GUID).first();
        if (!pos) {
            return null;
        }
        return new PointSale(pos);
    }

    static async getByBusiness(id){
        const pos = await this.knex('point_sale').select().where('business_id', id);
        return pos.map(p => new PointSale(p));
    }

    static async getByCategory(id){
        const pos = await this.knex('point_sale').select().where('point_sale_category_id', id);
        return pos.map(p => new PointSale(p));
    }

    static async create(data) {
        const [id] = await this.knex('point_sale').insert(data).returning('id');
        const pos = await this.knex('point_sale').where('id', id).first();
        return new PointSale(pos);
    }

    static async update(id, data) {
        const posData = this.transformToJson(data);
        const affectedRows = await this.knex('point_sale')
            .where('id', id)
            .update(posData);
        if (affectedRows === 0) {
            throw new Error('PointOfSale not found');
        }
        return await this.getById(id);
    }

    static transformToJson(data) {
        const transformedData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof data[key] === 'object' && data[key] !== null) {
                    transformedData[key] = JSON.stringify(data[key]);
                } else {
                    transformedData[key] = data[key];
                }
            }
        }
        return transformedData;
    }

    static async delete(id) {
        const affectedRows = await this.knex('point_sale')
            .where('id', id)
            .delete();
        if (affectedRows === 0) {
            throw new Error('PointOfSale not found');
        }
        return true;
    }
}

module.exports = PointSale;