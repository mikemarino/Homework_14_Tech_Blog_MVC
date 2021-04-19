const path = require('path');
const express = require('express');
const session = require('express-session');

// express-handlebars: https://www.npmjs.com/package/express-handlebars 
// requires directory structure
// .
// ├── app.js
// └── views
//     ├── home.handlebars
//     └── layouts
//         └── main.handlebars
//     └── partials
//         └──page
//            └── nav.handlebars
//            └── title.handlebars
// 
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {
    expires: 30 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    // checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    // expiration: 24 * 60 * 60 * 1000 // The maximum age (in milliseconds) of a valid session.
  })
};

const app = express();
const PORT = process.env.PORT || 3001;
app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
// Create `ExpressHandlebars` instance with a default layout.
const hbs = exphbs.create({
          helpers,
          // Uses multiple partials dirs, templates in "shared/templates/" are shared
          // with the client-side of the app (see below).
          partialsDir: [
            "shared/templates/",
            "views/partials/",
          ],
});

// Inform Express.js on which template engine to use
// app.engine('handlebars', hbs.engine); // specify the views directory
// Register `hbs` as our view engine using its bound `engine()` function.
app.engine("hbs", exphbs({
  layoutsDir: path.join(__dirname, "views/layouts"),
  // new configuration parameter
  extname: "hbs",

  helpers,

  // Uses multiple partials dirs, templates in "shared/templates/" are shared
  // with the client-side of the app (see below).
  partialsDir: [
    "shared/templates/",
    "views/partials/",
  ],
}));

// instead of app.set('view engine', 'handlebars'); // register the template engine
app.set("view engine", "hbs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
