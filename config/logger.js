// Importa la librería winston para el registro de logs
const winston = require('winston');
const { createLogger, format, transports } = winston;
const DailyRotateFile = require('winston-daily-rotate-file');
const formated = require('date-fns');

const formattedDate = formated.format(new Date(), 'yyyy-MM-dd');
const formattedTime = formated.format(new Date(), 'hh:mm:ss a');

// Configura el logger utilizando winston
const logger = winston.createLogger({
    level: process.env.LOG, // Define el nivel de log como 'debug'
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  // Añadir timestamp a los logs
        format.printf(info => `${formattedDate} ${formattedTime} - ${info.level}: ${info.message}`), // Formato personalizado
        // format.json()  // Formato del log (JSON en este caso)
    ),
    transports: [
        new transports.Console(),  // Transporte que envía los logs a la consola
        new DailyRotateFile({
            filename: 'logs/app-%DATE%.log',  // Archivo de log rotado diariamente
            zippedArchive: true,
            datePattern: 'YYYY-MM-DD',  // Patrón de fecha para la rotación diaria
            axSize: '20m', // Tamaño máximo de archivo antes de que se cree un nuevo archivo
            maxFiles: '30d'  // Mantener archivos de log por un máximo de 30 días
        })
    ]
});

// Exporta el logger configurado
module.exports = logger;