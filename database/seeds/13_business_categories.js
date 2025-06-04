
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('businesscategories').del()
      .then(function () {
        // Inserts seed entries
        return knex('businesscategories').insert([
          { 
            codeName: 'franchise', 
            displayName: 'Franquicia', 
            description: 'Negocios que operan bajo un modelo de franquicia, donde los franquiciados operan bajo la marca y el sistema de negocios del franquiciador.' 
          },
          { 
            codeName: 'association', 
            displayName: 'Asociación', 
            description: 'Organizaciones formadas por miembros que se unen para lograr un objetivo común, a menudo sin fines de lucro.' 
          },
          { 
            codeName: 'independent', 
            displayName: 'Independiente', 
            description: 'Negocios que son propiedad y están operados de forma independiente, sin afiliación a una marca o corporación más grande.' 
          },
          { 
            codeName: 'hosting', 
            displayName: 'Hosting', 
            description: 'Empresas que proporcionan servicios de alojamiento web, incluyendo servidores, almacenamiento y soporte técnico.' 
          },
          { 
            codeName: 'corporate', 
            displayName: 'Corporativo', 
            description: 'Grandes empresas organizadas como corporaciones, con múltiples niveles de gestión y operaciones a gran escala.' 
          },
          { 
            codeName: 'startup', 
            displayName: 'Startup', 
            description: 'Empresas emergentes que buscan innovar en sus respectivos campos, a menudo con un enfoque en el crecimiento rápido y la tecnología.' 
          },
          { 
            codeName: 'nonprofit', 
            displayName: 'Organización sin fines de lucro', 
            description: 'Organizaciones que operan con fines de beneficio social en lugar de lucro financiero.' 
          },
          { 
            codeName: 'partnership', 
            displayName: 'Sociedad', 
            description: 'Negocios que son propiedad de dos o más personas que comparten las ganancias, pérdidas y responsabilidades de la gestión.' 
          },
          { 
            codeName: 'cooperative', 
            displayName: 'Cooperativa', 
            description: 'Empresas que son propiedad y están operadas por un grupo de individuos con beneficios compartidos y una estructura democrática.' 
          },
          { 
            codeName: 'sole_proprietorship', 
            displayName: 'Propietario único', 
            description: 'Negocios que son propiedad y están operados por una sola persona, responsable de todas las obligaciones del negocio.' 
          },
          { 
            codeName: 'online_business', 
            displayName: 'Negocio en línea', 
            description: 'Empresas que operan principalmente en línea, vendiendo productos o servicios a través de internet.' 
          },
          { 
            codeName: 'brick_and_mortar', 
            displayName: 'Negocio físico', 
            description: 'Negocios que operan desde una ubicación física, ofreciendo productos o servicios directamente a los clientes.' 
          },
          { 
            codeName: 'freelance', 
            displayName: 'Freelance', 
            description: 'Profesionales independientes que ofrecen servicios especializados a múltiples clientes sin estar empleados por una sola empresa.' 
          },
          { 
            codeName: 'e_commerce', 
            displayName: 'Comercio electrónico', 
            description: 'Negocios que venden productos o servicios a través de plataformas de comercio electrónico en línea.' 
          },
          { 
            codeName: 'consulting', 
            displayName: 'Consultoría', 
            description: 'Empresas que ofrecen asesoramiento y servicios profesionales en diversas áreas de especialización.' 
          },
          { 
            codeName: 'agency', 
            displayName: 'Agencia', 
            description: 'Empresas que actúan como intermediarios para otros negocios, ofreciendo servicios como marketing, publicidad o reclutamiento.' 
          },
          { 
            codeName: 'home_based_business', 
            displayName: 'Negocio desde casa', 
            description: 'Negocios que operan desde la residencia del propietario, ofreciendo productos o servicios sin necesidad de un local comercial.' 
          },
          { 
            codeName: 'green_business', 
            displayName: 'Negocio ecológico', 
            description: 'Empresas que se enfocan en prácticas sostenibles y productos ecológicos.' 
          },
          { 
            codeName: 'multinational', 
            displayName: 'Multinacional', 
            description: 'Corporaciones que operan en múltiples países, gestionando operaciones internacionales y una amplia gama de productos o servicios.' 
          },
          { 
            codeName: 'social_enterprise', 
            displayName: 'Empresa social', 
            description: 'Negocios que combinan objetivos de lucro con la misión de generar un impacto social positivo.' 
          }
        ]);
      });
  };