const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Businessview{

    constructor(data){
        this.id = data.id;
        this.beGUID = data.be_GUID;
        this.dniType = JSON.parse(data.dni_type);
        this.dni = data.dni;
        this.address = JSON.parse(data.address);
        this.businessDetails = JSON.parse(data.business_details);
        this.legalName = data.legal_name;
        this.comercialName = data.comercial_name;
        this.businessParentId = data.business_parent_id;
        this.associationDate = data.association_date;
        this.active = data.active;
    }

    static get knex() {
        return knex;
    }

    static async getallBusinesses(){
        const businesses = await this.knex('business_entities').select()
        .where('deleted', false);
        return businesses.map(business => new Businessview(business));
    }

    static async getallactiveBusinesses(){
        const businesses = await this.knex('business_entities').select()
        .where('active', true);
        return businesses.map(business => new Businessview(business));
    }

    static async getAllbyParent(id) {
        const businesses = await this.knex('business_entities')
        .select()
        .where('business_parent_id', id)
        .andWhere('deleted', false);
        return businesses.map(business => new Businessview(business));
    }

    static async getAllbyCategory(id) {
        const businesses = await this.knex('business_entities')
        .select()
        .where('business_category_id', id)
        .andWhere('deleted', false);
        return businesses.map(business => new Businessview(business));
    }


}

module.exports = Businessview;