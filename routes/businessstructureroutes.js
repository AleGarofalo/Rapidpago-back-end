const express = require("express");
const router = express.Router();

const {
  getAllNodesForUser,
  getNodeById,
  createNode,
  updateNode,
  deleteNode,
  getTreeForUser,
} = require("../controllers/businessstructureController");

// Ruta para obtener todos los nodos de estructura comercial.
router.get("/getallnodes/:userID", getAllNodesForUser);

// Ruta para obtener un nodo por su ID.
router.get("/getnode/:id", getNodeById);

// Ruta para crear un nuevo nodo en la estructura.
router.post("/create", createNode);

// Ruta para actualizar un nodo de la estructura.
router.patch("/update/:id", updateNode);

// Ruta para eliminar un nodo de la estructura.
router.delete("/delete/:id", deleteNode);

// Ruta para obtener la estructura completa de un usuario en formato árbol.
router.get("/getstructurebyuser/:userID", getTreeForUser);

module.exports = router;
