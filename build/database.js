"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Connections } = require('mssql-ease');
var node_mssql = require('node-mssql');
const sl = require('mssql');
const sql = __importStar(require("mssql"));
const keys_1 = __importDefault(require("./keys"));
const pool = new sql.ConnectionPool(keys_1.default.config);
exports.default = pool;
