exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
  .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
          { 
            role: 'Master', 
            description: 'Tiene acceso completo a todas las funcionalidades y configuraciones del sistema.' 
          },
          { 
            role: 'Admin', 
            description: 'Encargado de administrar y mantener el sistema, así como de gestionar los permisos de los usuarios y configuraciones generales del sistema.' 
          },
          { 
            role: 'Gerente', 
            description: 'Encargado de supervisar y dirigir un equipo o departamento específico dentro de la empresa, así como de establecer objetivos y estrategias para alcanzar los resultados deseados.' 
          },
          { 
            role: 'Comercio', 
            description: 'Usuario con acceso limitado, específico para operaciones comerciales.' 
          },
          { 
            role: 'Cliente', 
            description: 'Usuario con acceso solo a servicios' 
          }
          /*
          { 
            role: 'Colaborador', 
            description: 'Miembro del equipo que colabora en la realización de tareas y proyectos asignados, contribuyendo al logro de los objetivos del negocio en su área de responsabilidad.' 
          },
          { 
            role: 'Gerente de Administración', 
            description: 'Responsable de supervisar las operaciones administrativas y financieras.' 
          },
          { 
            role: 'Líder de recaudación', 
            description: 'Encargado de coordinar y liderar el equipo de recaudación de fondos.' 
          },
          { 
            role: 'Especialista de recaudación', 
            description: 'Encargado de tareas especializadas en la recaudación de fondos y donaciones.' 
          },
          { 
            role: 'Analista de recaudación', 
            description: 'Realiza análisis y reportes sobre las actividades de recaudación de fondos.' 
          },
          { 
            role: 'Especialista de cobranza', 
            description: 'Gestiona las actividades relacionadas con la cobranza de pagos y deudas.' 
          },
          { 
            role: 'Analista de cobranza', 
            description: 'Analiza y monitorea las operaciones de cobranza y el seguimiento de cuentas.' 
          }
          */
      ]);
  });
};