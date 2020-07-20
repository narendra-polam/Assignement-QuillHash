'use strict';
const express = require('express');

const {login, fetchListByFilter, fetchAllListLogs} = require('./service');

const router = express.Router();

router.route('/login').post(login);
router.route('/logs/list').get(fetchAllListLogs);
router.route('/logs/filter').post(fetchListByFilter);

module.exports = router;