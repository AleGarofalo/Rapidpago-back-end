const { validationResult } = require("express-validator");
const { ValidationError } = require("./errorhandler");
const logger = require("../config/logger");

const validateDashboardParams = (req, res, next) => {
  // 1. Validar parámetros de fecha
  if (req.query.startDate) {
    if (isNaN(Date.parse(req.query.startDate))) {
      logger.warn(`Invalid startDate format: ${req.query.startDate}`);
      throw new ValidationError(
        "Formato de fecha inicial inválido. Use ISO8601 (YYYY-MM-DD)"
      );
    }
  }

  if (req.query.endDate) {
    if (isNaN(Date.parse(req.query.endDate))) {
      logger.warn(`Invalid endDate format: ${req.query.endDate}`);
      throw new ValidationError(
        "Formato de fecha final inválido. Use ISO8601 (YYYY-MM-DD)"
      );
    }
  }

  // 2. Validar que endDate no sea anterior a startDate
  if (req.query.startDate && req.query.endDate) {
    const start = new Date(req.query.startDate);
    const end = new Date(req.query.endDate);

    if (end < start) {
      logger.warn(
        `Invalid date range: ${req.query.startDate} to ${req.query.endDate}`
      );
      throw new ValidationError(
        "La fecha final no puede ser anterior a la fecha inicial"
      );
    }
  }

  // 3. Validar status (si viene)
  if (req.query.status) {
    const validStatuses = ["pendiente", "aprobado", "rechazado"];
    if (!validStatuses.includes(req.query.status)) {
      logger.warn(`Invalid status value: ${req.query.status}`);
      throw new ValidationError(
        `Estado inválido. Valores permitidos: ${validStatuses.join(", ")}`
      );
    }
  }

  next();
};

module.exports = validateDashboardParams;
