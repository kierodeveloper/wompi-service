import mysql from 'promise-mysql';
const { Connections } = require('mssql-ease');
var node_mssql = require('node-mssql');
const sl = require('mssql');

import * as sql from 'mssql';
import keys from './keys';

const pool = new sql.ConnectionPool(keys.config);

export default pool;