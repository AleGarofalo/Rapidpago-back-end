

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;  // Código de estado HTTP para errores de validación
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseError";
        this.statusCode = 500;  // Código de estado HTTP para errores de base de datos
    }
}

function errorHandler(err, req, res, next) {
    console.error(err);

    const statusCode = err.statusCode || 500;  // Usar el código de estado especificado o 500 por defecto
    const message = err.message || 'Error interno del servidor';

    res.status(statusCode).json({ error: true, message });
}

module.exports = { errorHandler, ValidationError, DatabaseError };