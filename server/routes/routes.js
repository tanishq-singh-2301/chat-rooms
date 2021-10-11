const route = require('express').Router();
const services = require('../services/render');
const controller = require('../controller/controller');

// Normal Routes
route.get('/', services.home);
route.get('/room/:id', services.game);

// APIs
route.get('/api/test/', controller.test);

module.exports = route;