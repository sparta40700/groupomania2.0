const express = require("express");
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
//const requireAuth = require("./middleware/auth-middleware");
const userRoutes = require("./routes/user.routes.js");
const postRoutes = require("./routes/post.routes.js");
const profileRoutes = require("./routes/profile-routes.js")
const { path } = require("express/lib/application");
require("dotenv").config();
//const { checkUser } = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionsSuccessStatus: 200,
  //allowedHeaders: ["sessionId", "Content-Type",""],
  //exposedHeaders: ["sessionId"],
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//jwt
//app.get("*", checkUser);
/*app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});*/

app.use("/images", express.static('images'))

//routes
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);

//serveur
console.log(process.env.PORT);
//console.log(process.env);
app.listen(process.env.PORT, () => {
  console.log("Server started on port " + "8000");
});
