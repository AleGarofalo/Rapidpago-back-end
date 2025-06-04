const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class IndustryType{

    constructor(data){
        this.id = data.id;
        this.industrytype = data.industrytype; 
        this.sectorid = data.sectorid;
        this.sector = data.sector; 
        this.active = data.active;
        this.userID = data.userID;
        this.created_at = data.createdAt;
        this.updated_at = data.updatedAt;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const industrytypes = await this.knex('industrytypes')
        .join('sectors', 'industrytypes.sectorid', 'sectors.id')
        .select('industrytypes.*','sectors.sector');
        return industrytypes.map(i => new IndustryType(i));
    }

    static async getAllActive() {
        const industrytypes = await this.knex('industrytypes')
        .where('industrytypes.active',true)
        .join('sectors', 'industrytypes.sectorid', 'sectors.id')
        .select('industrytypes.*','sectors.sector');
        return industrytypes.map(i => new IndustryType(i));
    }

    static async getAllbySector(sectorid) {
        const industrytypes = await this.knex('industrytypes')
        .where('sectorid', '=',sectorid)
        .select();
        return industrytypes.map(i => new IndustryType(i));
    }

    static async getByType(industrytype) {
        const industrytypes = await this.knex('industrytypes')
        .where('industrytype', '=',industrytype)
        .select();
        return industrytypes.map(i => new IndustryType(i));
    }

    static async create(data) {
        const [industrytype] = await this.knex('industrytypes').insert(data);
        return industrytype ;
    }

    static async update(id, data) {
        const affectedRows = await this.knex('industrytypes')
            .where('id', id)
            .update(data);
        if (affectedRows === 0) {
            throw new Error('Industry Type not found');
        }
        return await this.getById(id); // Get the updated role
    }

    static async delete(id) {
        const deletedsector = await this.knex('sectors').where('id', id).del();
        return deletedsector;
    }

}
module.exports = IndustryType;