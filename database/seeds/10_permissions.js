exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('permissions').del()
      .then(function () {
        // Inserts seed entries
        return knex('permissions').insert([
          { 
            permission: 'manage_system', 
            description: 'Permite el acceso completo a todas las funcionalidades y configuraciones del sistema.' 
          },
          { 
            permission: 'view_reports', 
            description: 'Permite ver reportes y análisis del sistema.' 
          },
          { 
            permission: 'manage_financial_operations', 
            description: 'Permite supervisar las operaciones administrativas y financieras.' 
          },
          { 
            permission: 'approve_expenses', 
            description: 'Permite aprobar gastos y transacciones financieras.' 
          },
          { 
            permission: 'lead_fundraising_team', 
            description: 'Permite coordinar y liderar el equipo de recaudación de fondos.' 
          },
          { 
            permission: 'create_fundraising_campaigns', 
            description: 'Permite crear y gestionar campañas de recaudación de fondos.' 
          },
          { 
            permission: 'specialized_fundraising_tasks', 
            description: 'Permite realizar tareas especializadas en la recaudación de fondos y donaciones.' 
          },
          { 
            permission: 'analyze_fundraising_activities', 
            description: 'Permite realizar análisis y reportes sobre las actividades de recaudación de fondos.' 
          },
          { 
            permission: 'manage_collections', 
            description: 'Permite gestionar las actividades relacionadas con la cobranza de pagos y deudas.' 
          },
          { 
            permission: 'contact_debtors', 
            description: 'Permite contactar a los deudores para la recuperación de pagos.' 
          },
          { 
            permission: 'analyze_collections_operations', 
            description: 'Permite analizar y monitorear las operaciones de cobranza y el seguimiento de cuentas.' 
          },
          { 
            permission: 'access_commerce_operations', 
            description: 'Permite el acceso a operaciones comerciales limitadas.' 
          },
          { 
            permission: 'view_merchant_info', 
            description: 'Permite ver la información de los comerciantes.' 
          },
          { 
            permission: 'edit_merchant_info', 
            description: 'Permite editar la información de los comerciantes.' 
          },
          { 
            permission: 'manage_user_roles', 
            description: 'Permite gestionar los roles y permisos de los usuarios.' 
          },
          { 
            permission: 'view_audit_logs', 
            description: 'Permite ver los registros de auditoría del sistema.' 
          },
          { 
            permission: 'backup_data', 
            description: 'Permite realizar copias de seguridad de los datos del sistema.' 
          },
          { 
            permission: 'restore_data', 
            description: 'Permite restaurar los datos del sistema desde copias de seguridad.' 
          }
        ]);
      });
  };