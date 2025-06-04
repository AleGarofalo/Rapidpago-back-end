const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors"); // Importa el paquete CORS

const userRoutes = require("./routes/userroutes");
const serviceRoutes = require("./routes/serviceroutes");
const businessRoutes = require("./routes/businessroutes");
const businessStructureRoutes = require("./routes/businessstructureroutes");
const pointsaleRoutes = require("./routes/pointsaleroutes");
const terminalRoutes = require("./routes/terminalroutes");
const sectorRoutes = require("./routes/sectorroutes");
const industryRoutes = require("./routes/industryroutes");
const countryRoutes = require("./routes/countryroutes");
const stateRoutes = require("./routes/stateroutes");
const cityRoutes = require("./routes/cityroutes");
const municipalityRoutes = require("./routes/municipalityroutes");
const parishRoutes = require("./routes/parishroutes");
const postalzoneRoutes = require("./routes/postalzoneroutes");
const roleRoutes = require("./routes/roleroutes");
const currencyRoutes = require("./routes/currencyroutes");
const feetypeRoutes = require("./routes/feetyperoutes");
const itemRoutes = require("./routes/itemroutes");
const modelRoutes = require("./routes/modelroutes");
const motiveRoutes = require("./routes/motiveroutes");
const paymenttypeRoutes = require("./routes/paymenttyperoutes");
const saleparameterRoutes = require("./routes/saleparameterroutes");
const saleRoutes = require("./routes/saleroutes");
const saletypeRoutes = require("./routes/saletyperoutes");
const sellingpriceRoutes = require("./routes/sellingpriceroutes");
const ContactPersonRoutes = require("./routes/contactpersonroutes");
const StockRoutes = require("./routes/inventoryroutes");
const orderRoutes = require("./routes/orderroutes");
const orderpaymentRoutes = require("./routes/orderpaymentroutes");
const salepaymentRoutes = require("./routes/salepaymentroutes");
const sftp = require("./routes/sftproutes");
const attachmentRoutes = require("./routes/attachmentroutes");
const basePathRoutes = require("./routes/basepathroutes");
const dashboardRoutes = require("./routes/dashboardroutes");

const logger = require("./config/logger");
const { errorHandler } = require("./middleware/errorhandler");

const app = express();

require("dotenv").config();

// Configuración de CORS
app.use(cors());

// Asegúrate de que el logger esté configurado correctamente y sea utilizado
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  // Puedes agregar más lógica de middleware si es necesario
  next();
});

app.use("/dashboard", dashboardRoutes);
app.use("/user", userRoutes);
app.use("/service", serviceRoutes);
app.use("/business", businessRoutes);
app.use("/businessstructure", businessStructureRoutes);
app.use("/pointsale", pointsaleRoutes);
app.use("/terminal", terminalRoutes);
app.use("/sector", sectorRoutes);
app.use("/industry", industryRoutes);
app.use("/country", countryRoutes);
app.use("/state", stateRoutes);
app.use("/city", cityRoutes);
app.use("/municipality", municipalityRoutes);
app.use("/parish", parishRoutes);
app.use("/postalzone", postalzoneRoutes);
app.use("/role", roleRoutes);
app.use("/currency", currencyRoutes);
app.use("/feetype", feetypeRoutes);
app.use("/item", itemRoutes);
app.use("/model", modelRoutes);
app.use("/motive", motiveRoutes);
app.use("/paymenttype", paymenttypeRoutes);
app.use("/saleparameter", saleparameterRoutes);
app.use("/sale", saleRoutes);
app.use("/saletype", saletypeRoutes);
app.use("/sellingprice", sellingpriceRoutes);
app.use("/contactperson", ContactPersonRoutes);
app.use("/inventory", StockRoutes);
app.use("/order", orderRoutes);
app.use("/orderpayment", orderpaymentRoutes);
app.use("/salepayment", salepaymentRoutes);
app.use("/sftp", sftp);
app.use("/attachment", attachmentRoutes);
app.use("/basepath", basePathRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log("Server running on port", app.get("port"));
});
