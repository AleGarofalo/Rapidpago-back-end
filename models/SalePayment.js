const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_ENV]);

class SalePayment {

    constructor(data) {
        this.id = data.id;
        this.saleID = data.saleID;
        this.amount = data.amount;
        this.paymenttypeID = data.paymenttypeID;
        this.paymenttype = data.paymenttype;  // Descripción del tipo de pago
        this.payment_amount = data.payment_amount;
        this.currencyID = data.currencyID;
        this.currency = data.currency;  // Nombre de la moneda
        this.exchange_rate = data.exchange_rate;
        this.exchange_date = data.exchange_date;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static get knex() {
        return knex;
    }

    // Obtener todos los pagos de todas las ventas
    static async getAll() {
        const payments = await this.knex('salepayments')
            .join('currencies', 'salepayments.currencyID', 'currencies.id')
            .join('paymenttypes', 'salepayments.paymenttypeID', 'paymenttypes.id')
            .select(
                'salepayments.id',
                'salepayments.amount',
                'salepayments.exchange_rate',
                'salepayments.exchange_date',
                'currencies.name as currency',
                'paymenttypes.description as paymenttype',
                'salepayments.created_at',
                'salepayments.updated_at'
            )
            .orderBy('salepayments.created_at', 'desc');
        return payments.map(payment => new SalePayment(payment));
    }

    // Obtener pagos por saleID
    static async getBySaleId(saleID) {
        const payments = await this.knex('salepayments')
            .join('currencies', 'salepayments.currencyID', 'currencies.id')
            .join('paymenttypes', 'salepayments.paymenttypeID', 'paymenttypes.id')
            .select(
                'salepayments.id',
                'salepayments.amount',
                'salepayments.exchange_rate',
                'salepayments.exchange_date',
                'currencies.name as currency',
                'paymenttypes.description as paymenttype',
                'salepayments.created_at',
                'salepayments.updated_at'
            )
            .where('salepayments.saleID', saleID)
            .orderBy('salepayments.created_at', 'desc');
        return payments.map(payment => new SalePayment(payment));
    }

        // Obtener un pago por ID
        static async getById(id) {
            const payment = await this.knex('salepayments')
                .join('currencies', 'salepayments.currencyID', 'currencies.id')
                .join('paymenttypes', 'salepayments.paymenttypeID', 'paymenttypes.id')
                .select(
                    'salepayments.id',
                    'salepayments.amount',
                    'salepayments.exchange_rate',
                    'salepayments.exchange_date',
                    'currencies.name as currency',
                    'paymenttypes.description as paymenttype',
                    'salepayments.created_at',
                    'salepayments.updated_at'
                )
                .where('salepayments.id', id)
                .first();
                if (!payment) {
                    return null;
                }
            return new SalePayment(payment);
        }

    // Crear un nuevo pago
    static async create(data) {
        const [id] = await this.knex('salepayments').insert(data);
        const payment = await this.knex('salepayments').where('id', id).first();
        return new SalePayment(payment);
    }

    // Actualizar un pago por ID
    static async update(id, data) {
        const affectedRows = await this.knex('salepayments').where('id', id).update(data);
        if (affectedRows === 0) {
            throw new Error('Sale Payment not found');
        }
        return await this.getById(id);
    }

    // Eliminar un pago por ID
    static async delete(id) {
        const deletedPayment = await this.knex('salepayments').where('id', id).del();
        return deletedPayment;
    }
};

module.exports = SalePayment;
