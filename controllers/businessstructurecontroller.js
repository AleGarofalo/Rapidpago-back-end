const BusinessStructure = require("../models/BusinessStructure");
const logger = require("../config/logger");
const { ValidationError } = require("../middleware/errorhandler");

// Obtener todos los nodos de la estructura de un usuario
async function getAllNodesForUser(req, res, next) {
  const { userID } = req.params;
  try {
    logger.info(`Fetching all nodes for user ID: ${userID}`);
    const nodes = await BusinessStructure.getStructureByUser(userID);
    res.status(200).json(nodes);
  } catch (error) {
    logger.error(
      `Error fetching nodes for user ID: ${userID} - ${error.message}`
    );
    next(error);
  }
}

// Obtener un nodo por ID
async function getNodeById(req, res, next) {
  const { id } = req.params;
  try {
    logger.info(`Fetching node ID: ${id}`);
    const node = await BusinessStructure.getById(id);
    if (!node) {
      throw new ValidationError("El nodo no existe");
    }
    res.status(200).json(node);
  } catch (error) {
    logger.error(`Error fetching node by ID: ${id} - ${error.message}`);
    next(error);
  }
}

// Crear un nuevo nodo en la estructura
async function createNode(req, res, next) {
  const { name, parent_id, userID } = req.body;
  try {
    logger.info(`Attempting to create node: ${name}`);

    // Insertar el nuevo nodo en la base de datos
    const newNode = await BusinessStructure.create({ name, parent_id, userID });

    logger.info(`Node created successfully: ${name}`);
    res.status(201).json({
      message: "Nodo creado correctamente",
      data: newNode,
    });
  } catch (error) {
    logger.error(`Error creating node: ${name} - ${error.message}`);
    next(error);
  }
}

// Actualizar un nodo por ID
async function updateNode(req, res, next) {
  const { id } = req.params;
  const updatedNode = req.body;
  try {
    logger.info(`Attempting to update node with ID: ${id}`);

    // Verificar si el nodo existe
    const existingNode = await BusinessStructure.getById(id);
    if (!existingNode) {
      throw new ValidationError("El nodo no existe");
    }

    // Actualizar el nodo en la base de datos
    const node = await BusinessStructure.update(id, updatedNode);
    logger.info(`Node updated successfully: ${id}`);
    res.status(200).json({
      message: "Nodo actualizado correctamente",
      data: node,
    });
  } catch (error) {
    logger.error(`Error updating node with ID: ${id} - ${error.message}`);
    next(error);
  }
}

// Eliminar un nodo por ID
async function deleteNode(req, res, next) {
  const { id } = req.params;
  try {
    logger.info(`Attempting to delete node with ID: ${id}`);

    // Verificar si el nodo existe antes de eliminar
    const existingNode = await BusinessStructure.getById(id);
    if (!existingNode) {
      throw new ValidationError("El nodo no existe");
    }

    // Eliminar el nodo de la base de datos
    await BusinessStructure.delete(id);
    logger.info(`Node deleted successfully: ${id}`);
    res.status(200).json({ message: "Nodo eliminado correctamente" });
  } catch (error) {
    logger.error(`Error deleting node with ID: ${id} - ${error.message}`);
    next(error);
  }
}

// Obtener la estructura completa en forma de árbol para un usuario
async function getTreeForUser(req, res, next) {
  const { userID } = req.params;
  try {
    logger.info(`Fetching business structure tree for user ID: ${userID}`);
    const tree = await BusinessStructure.getTreeForUser(userID);
    res.status(200).json(tree);
  } catch (error) {
    logger.error(
      `Error fetching tree for user ID: ${userID} - ${error.message}`
    );
    next(error);
  }
}

module.exports = {
  getAllNodesForUser,
  getNodeById,
  createNode,
  updateNode,
  deleteNode,
  getTreeForUser,
};
