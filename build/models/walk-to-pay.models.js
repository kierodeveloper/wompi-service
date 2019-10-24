"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
//const pool = require('../database');
const sql = __importStar(require("mssql"));
const database_1 = __importDefault(require("../database"));
class InserWalkToPay {
    createTransactionCard(responseCardToken, responseWompi, cartdata, responseEstatusTransactionCard) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardquery = `INSERT INTO wompy_pay_card (token_datacredir, reference_product, payment_method_type, id_reference, status, amount_in_cents, name,card_holder)
    VALUES (
      '${responseWompi.id}',
      '${responseWompi.reference}',
      '${responseWompi.payment_method_type}',
      '${responseWompi.reference}',
      '${responseEstatusTransactionCard}',
      '${responseWompi.amount_in_cents}',
      '${cartdata.name}',
      '${cartdata.numberDoc}'
      );`;
            try {
                database_1.default.connect().then(() => {
                    const request = new sql.Request(database_1.default);
                    const result = request.query(cardquery);
                    console.dir(result);
                });
                console.log("Insercion completa.");
            }
            catch (error) {
                console.log("error", error);
            }
        });
    }
    createTransactionPSE(responseWompi, cartdata, responseEstatusTransactionCard) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardquery = `INSERT INTO wompy_pay_card (token_datacredir, reference_product, payment_method_type, id_reference, status, amount_in_cents, name,card_holder)
    VALUES (
      '${responseWompi.id}',
      '${responseWompi.reference}',
      '${responseWompi.payment_method_type}',
      '${responseWompi.reference}',
      '${responseEstatusTransactionCard}',
      '${responseWompi.amount_in_cents}',
      '${cartdata.name}',
      '${cartdata.payment_method.user_legal_id}'
      );`;
            try {
                database_1.default.connect().then(() => {
                    const request = new sql.Request(database_1.default);
                    const result = request.query(cardquery);
                    console.dir(result);
                });
                console.log("Insercion completa.");
            }
            catch (error) {
                console.log("error", error);
            }
        });
    }
    updateTransaction(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE wompy_pay_card SET status = '${req.data.transaction.status}' WHERE token_datacredir = '${req.data.transaction.id}'`;
            try {
                database_1.default.connect().then(() => {
                    const request = new sql.Request(database_1.default);
                    const result = request.query(query);
                    console.dir(result);
                });
                console.log(" transaction.updated complete.");
            }
            catch (error) {
                console.log("error", error);
            }
        });
    }
}
const inserWalkToPay = new InserWalkToPay;
exports.default = inserWalkToPay;
