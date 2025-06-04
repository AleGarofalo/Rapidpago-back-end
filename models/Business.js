const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class Business {
    constructor(data) {
        this.id = data.id;
        this.beGUID = data.be_GUID;
        this.dniType = JSON.parse(data.dni_type);
        this.dni = data.dni;
        this.address = JSON.parse(data.address);
        this.businessDetails = JSON.parse(data.business_details);
        this.legalName = data.legal_name;
        this.comercialName = data.comercial_name;
        this.businessParentId = data.business_parent_id;
        this.businessCategoryId = data.business_category_id;
        this.associationDate = data.association_date;
        this.active = data.active;
        this.userID = data.userID;
        this.createdDate = data.created_date;
        this.updatedDate = data.updated_date;
    }

    static get knex() {
        return knex;
    }

    static async getAll() {
        const businesses = await this.knex('business_entities').select();
        console.log(businesses);
        return businesses.map(business => new Business(business));
    }

    static async getById(id) {
        const business = await this.knex('business_entities').where('id', id).first();
        if (!business) {
            return null;
        }
        return new Business(business);
    }

    static async getContactPerson(businessid) {
        const ContactPerson = await this.knex('contact_people').where('businessid', businessid).first();
        if (!business) {
            return null;
        }
        return new Business(business);
    }

    static async getByLegalName(legalName) {
        const business = await this.knex('business_entities').where('legal_name', legalName).first();
        if (!business) {
            return null;
        }
        return new Business(business);
    }

    static async getByBusinessGUID(guid) {
        const business = await this.knex('business_entities').where('be_GUID', guid).first();
        if (!business) {
            return null;
        }
        return new Business(business);
    }

    static async getBusinessByCategory(id) {
        const businesses = await this.knex('business_entities').where('business_category_id', id).first();
        return businesses.map(business => new Business(business));
    }

    static async create(data) {
        const [id] = await this.knex('business_entities').insert(data).returning('id');
        const business = await this.knex('business_entities').where('id', id).first();
        return new Business(business);
    }

    static async update(id, data) {

        const businessData = this.transformToJson(data);
        const affectedRows = await this.knex('business_entities')
            .where('id', id)
            .update(businessData);
        if (affectedRows === 0) {
            throw new Error('Business not found');
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

    static async updateActiveStatus(id, isActive){
        const affectedRows = await this.knex('business_entities')
            .where('id', id)
            .update({ active: isActive });
        if (affectedRows === 0) {
            throw new Error('Comercio no encontrado');
        }
        return await this.getById(id);
    }
}

module.exports = Business;