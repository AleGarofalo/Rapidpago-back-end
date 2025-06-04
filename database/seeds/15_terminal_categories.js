exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('terminal_categories').del()
      .then(function () {
        // Inserts seed entries
        return knex('terminal_categories').insert([
          { 
            codeName: 'b2p', 
            displayName: 'Business to Person', 
            description: 'Transacciones de negocios a personas, generalmente usadas para pagos directos de empresas a individuos.' 
          },
          {
            codeName: 'T',
            displayName: 'Terminal',
            description: 'Terminal RapidPortal'
          },
          { 
            codeName: 'p2p', 
            displayName: 'Person to Person', 
            description: 'Transacciones entre individuos, facilitando pagos directos entre personas.' 
          },
          { 
            codeName: 'payment_button', 
            displayName: 'Botón de Pago', 
            description: 'Solución de pago en línea que permite a los usuarios realizar pagos a través de un botón integrado en sitios web.' 
          },
          { 
            codeName: 'pos', 
            displayName: 'Point of Sale', 
            description: 'Sistemas de punto de venta que facilitan transacciones en locales comerciales físicos.' 
          },
          { 
            codeName: 'transfer', 
            displayName: 'Transferencia', 
            description: 'Transacciones basadas en transferencias bancarias entre cuentas.' 
          },
          { 
            codeName: 'mobile_pos', 
            displayName: 'Mobile POS', 
            description: 'Sistemas de punto de venta móviles que permiten realizar transacciones a través de dispositivos móviles.' 
          },
          { 
            codeName: 'e_wallet', 
            displayName: 'E-Wallet', 
            description: 'Monederos electrónicos que permiten almacenar fondos y realizar pagos digitales.' 
          },
          { 
            codeName: 'qr_code', 
            displayName: 'QR Code Payment', 
            description: 'Sistema de pago que utiliza códigos QR para facilitar transacciones rápidas y seguras.' 
          },
          { 
            codeName: 'virtual_terminal', 
            displayName: 'Terminal Virtual', 
            description: 'Terminales basadas en la web que permiten procesar pagos sin necesidad de hardware físico.' 
          },
          { 
            codeName: 'crypto', 
            displayName: 'Cryptocurrency Payment', 
            description: 'Sistemas que permiten la aceptación de criptomonedas como método de pago.' 
          }
        ]);
      });
  };