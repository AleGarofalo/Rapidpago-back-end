exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('bankaccounts').del()
        .then(function () {
            // Inserts seed entries
            return knex('bankaccounts').insert([
                {
                    merchant_id_code: '0001',
                    account_number: 'account_00001',
                    bank_id: 1,
                    business_entity_id: 1,
                    terminalid: 1,
                    active: true
                },
                {
                    merchant_id_code: '0002',
                    account_number: 'account_00002',
                    bank_id: 2,
                    business_entity_id: 1,
                    terminalid: 23,
                    active: true
                },
                {
                    merchant_id_code: '0003',
                    account_number: 'account_00003',
                    bank_id: 3,
                    business_entity_id: 2,
                    terminalid: 2,
                    active: true
                },
                {
                    merchant_id_code: '0004',
                    account_number: 'account_00004',
                    bank_id: 4,
                    business_entity_id: 2,
                    terminalid: 24,
                    active: true
                },
                {
                    merchant_id_code: '0005',
                    account_number: 'account_00005',
                    bank_id: 5,
                    business_entity_id: 3,
                    terminalid: 3,
                    active: true
                },
                {
                    merchant_id_code: '0006',
                    account_number: 'account_00006',
                    bank_id: 6,
                    business_entity_id: 3,
                    terminalid: 25,
                    active: true
                },
                {
                    merchant_id_code: '0007',
                    account_number: 'account_00007',
                    bank_id: 7,
                    business_entity_id: 4,
                    terminalid: 4,
                    active: true
                },
                {
                    merchant_id_code: '0008',
                    account_number: 'account_00008',
                    bank_id: 8,
                    business_entity_id: 4,
                    terminalid: 26,
                    active: true
                },
                {
                    merchant_id_code: '0009',
                    account_number: 'account_00009',
                    bank_id: 9,
                    business_entity_id: 5,
                    terminalid: 5,
                    active: true
                },
                {
                    merchant_id_code: '0010',
                    account_number: 'account_00010',
                    bank_id: 10,
                    business_entity_id: 5,
                    terminalid: 27,
                    active: true
                },
                {
                    merchant_id_code: '0011',
                    account_number: 'account_00011',
                    bank_id: 11,
                    business_entity_id: 6,
                    terminalid: 6,
                    active: true
                },
                {
                    merchant_id_code: '0012',
                    account_number: 'account_00012',
                    bank_id: 12,
                    business_entity_id: 6,
                    terminalid: 28,
                    active: true
                },
                {
                    merchant_id_code: '0013',
                    account_number: 'account_00013',
                    bank_id: 13,
                    business_entity_id: 7,
                    terminalid: 7,
                    active: true
                },
                {
                    merchant_id_code: '0014',
                    account_number: 'account_00014',
                    bank_id: 14,
                    business_entity_id: 7,
                    terminalid: 29,
                    active: true
                },
                {
                    merchant_id_code: '0015',
                    account_number: 'account_00015',
                    bank_id: 15,
                    business_entity_id: 8,
                    terminalid: 8,
                    active: true
                },
                {
                    merchant_id_code: '0016',
                    account_number: 'account_00016',
                    bank_id: 16,
                    business_entity_id: 8,
                    terminalid: 30,
                    active: true
                },
                {
                    merchant_id_code: '0017',
                    account_number: 'account_00017',
                    bank_id: 17,
                    business_entity_id: 9,
                    terminalid: 9,
                    active: true
                },
                {
                    merchant_id_code: '0018',
                    account_number: 'account_00018',
                    bank_id: 18,
                    business_entity_id: 10,
                    terminalid: 10,
                    active: true
                },
                {
                    merchant_id_code: '0019',
                    account_number: 'account_00019',
                    bank_id: 19,
                    business_entity_id: 11,
                    terminalid: 11,
                    active: true
                },
                {
                    merchant_id_code: '0020',
                    account_number: 'account_00020',
                    bank_id: 20,
                    business_entity_id: 12,
                    terminalid: 12,
                    active: true
                },
                {
                    merchant_id_code: '0021',
                    account_number: 'account_00021',
                    bank_id: 21,
                    business_entity_id: 13,
                    terminalid: 13,
                    active: true
                },
                {
                    merchant_id_code: '0022',
                    account_number: 'account_00022',
                    bank_id: 22,
                    business_entity_id: 14,
                    terminalid: 14,
                    active: true
                },
                {
                    merchant_id_code: '0023',
                    account_number: 'account_00023',
                    bank_id: 23,
                    business_entity_id: 15,
                    terminalid: 15,
                    active: true
                },
                {
                    merchant_id_code: '0024',
                    account_number: 'account_00024',
                    bank_id: 24,
                    business_entity_id: 16,
                    terminalid: 16,
                    active: true
                },
                {
                    merchant_id_code: '0025',
                    account_number: 'account_00025',
                    bank_id: 25,
                    business_entity_id: 17,
                    terminalid: 17,
                    active: true
                },
                {
                    merchant_id_code: '0026',
                    account_number: 'account_00026',
                    bank_id: 26,
                    business_entity_id: 18,
                    terminalid: 18,
                    active: true
                },
                {
                    merchant_id_code: '0027',
                    account_number: 'account_00027',
                    bank_id: 27,
                    business_entity_id: 19,
                    terminalid: 19,
                    active: true
                },
                {
                    merchant_id_code: '0028',
                    account_number: 'account_00028',
                    bank_id: 28,
                    business_entity_id: 20,
                    terminalid: 20,
                    active: true
                },
                {
                    merchant_id_code: '0029',
                    account_number: 'account_00029',
                    bank_id: 1,
                    business_entity_id: 21,
                    terminalid: 21,
                    active: true
                },
                {
                    merchant_id_code: '0030',
                    account_number: 'account_00030',
                    bank_id: 2,
                    business_entity_id: 22,
                    terminalid: 22,
                    active: true
                },
                {
                    merchant_id_code: '0031',
                    account_number: 'account_00031',
                    bank_id: 3,
                    business_entity_id: 1,
                    terminalid: 31,
                    active: true
                },
                {
                    merchant_id_code: '0032',
                    account_number: 'account_00032',
                    bank_id: 4,
                    business_entity_id: 2,
                    terminalid: 32,
                    active: true
                },
                {
                    merchant_id_code: '0033',
                    account_number: 'account_00033',
                    bank_id: 5,
                    business_entity_id: 3,
                    terminalid: 33,
                    active: true
                },
                {
                    merchant_id_code: '0034',
                    account_number: 'account_00034',
                    bank_id: 6,
                    business_entity_id: 4,
                    terminalid: 34,
                    active: true
                },
                {
                    merchant_id_code: '0035',
                    account_number: 'account_00035',
                    bank_id: 7,
                    business_entity_id: 5,
                    terminalid: 35,
                    active: true
                },
                {
                    merchant_id_code: '0036',
                    account_number: 'account_00036',
                    bank_id: 8,
                    business_entity_id: 6,
                    terminalid: 36,
                    active: true
                },
                {
                    merchant_id_code: '0037',
                    account_number: 'account_00037',
                    bank_id: 9,
                    business_entity_id: 7,
                    terminalid: 37,
                    active: true
                },
                {
                    merchant_id_code: '0038',
                    account_number: 'account_00038',
                    bank_id: 10,
                    business_entity_id: 8,
                    terminalid: 38,
                    active: true
                },
                {
                    merchant_id_code: '0039',
                    account_number: 'account_00039',
                    bank_id: 11,
                    business_entity_id: 9,
                    terminalid: 39,
                    active: true
                },
                {
                    merchant_id_code: '0040',
                    account_number: 'account_00040',
                    bank_id: 12,
                    business_entity_id: 10,
                    terminalid: 40,
                    active: true
                }
            ]);
        });
};