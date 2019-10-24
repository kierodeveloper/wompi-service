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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { axios } from 'axios'
//var axios = require('axios')
const axios = require('axios');
const walk_to_pay_models_1 = __importDefault(require("../models/walk-to-pay.models"));
const sendEmail_1 = __importDefault(require("../utility/sendEmail"));
/* Prueba urls */
//var urlCard='http://sandbox.wompi.co/v1/tokens/cards' // Url card prueba  TOKEN
//var urlNequi='http://sandbox.wompi.co/v1/tokens/nequi' // Url Nequi prueba  TOKEN
//var urlCreateTransaction='http://sandbox.wompi.co/v1/transactions'  // Url card prueba  Transaccion
//var urlGetTransaction='http://sandbox.wompi.co/v1/transactions/'  // Url card prueba  Transaccion
//var urlGetBackPSE='http://sandbox.wompi.co/v1/pse/financial_institutions' // Traer bancos
//var urlCreateTransactionPSE='http://sandbox.wompi.co/v1/payment_links' // Traer bancos
// var getTokenTest = 'pub_test_7uXzVs56KTCjOP7IYiz3WbkC8lWBEzX0' // Token de prueba 
/*  Produccin  urls*/
var urlCard = 'http://production.wompi.co/v1/tokens/cards'; // Url card prueba  TOKEN
var urlNequi = 'http://sandbox.wompi.co/v1/tokens/nequi'; // Url Nequi prueba  TOKEN
var urlCreateTransaction = 'http://production.wompi.co/v1/transactions'; // Url card prueba  Transaccion
var urlGetTransaction = 'http://production.wompi.co/v1/transactions/'; // Url card prueba  Transaccion
var urlGetBackPSE = 'http://production.wompi.co/v1/pse/financial_institutions'; // Traer bancos
var urlCreateTransactionPSE = 'http://production.wompi.co/v1/payment_links'; // Traer bancos
var getTokenProduction = 'pub_prod_6SqAXiHbJoIQH2e9I85GgxA1Gmd9he20'; // Token de produccion   
class WalkToPayController {
    createTransactionPSE(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var dataUser = req.body;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenProduction
            };
            try {
                let payPSE = {
                    "payment_method_type": "PSE",
                    "payment_method": {
                        "type": "PSE",
                        "user_type": req.body.data.person_type,
                        "user_legal_id_type": req.body.data.document_typearg,
                        "user_legal_id": req.body.data.document_number,
                        "financial_institution_code": req.body.data.back,
                        "payment_description": req.body.product.Resultados.titulo // Nombre de lo que se está pagando. Máximo 64 caracteres
                    },
                    "amount_in_cents": parseInt(req.body.product.Resultados.precio + ('00')),
                    "currency": "COP",
                    "name": req.body.product.Resultados.titulo,
                    "customer_email": req.body.data.email,
                    "reference": "4444ff5555fasdf",
                    "description": req.body.product.Resultados.descripcion,
                    "image_url": req.body.product.Resultados.imagenes_Producto[0],
                    "redirect_url": "https://www.kiero.co/",
                    "single_use": false,
                    "collect_shipping": false
                };
                //sendEmail.sendMail(dataUser)
                var responseNequi = yield axios.post(urlCreateTransaction, payPSE, { headers: headers });
                var responseEstatusTransactionPSE = yield axios.get(urlGetTransaction + responseNequi.data.data.id, { headers: headers });
                walk_to_pay_models_1.default.createTransactionPSE(responseNequi.data.data, payPSE, responseEstatusTransactionPSE.data.data.status);
                sendEmail_1.default.sendMail(req.body, responseEstatusTransactionPSE);
                console.log("Completo");
                res.json({ message: 'Complete' });
            }
            catch (err) {
                console.log("ERROR");
                res.json({ message: 'Error' });
            }
        });
    }
    // CREAR TRANSACCION POR NEQUI 
    createTransactionNequi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenProduction
            };
            try {
                let tokenNequi = {
                    payment_method_type: 'NEQUI',
                    phone_number: '3991111111',
                    name: 'jose luis',
                };
                console.log(tokenNequi);
                var responseNequiToken = yield axios.post(urlNequi, tokenNequi, {
                    headers: headers
                });
                console.log(responseNequiToken);
                res.json({ message: 'Complete' });
            }
            catch (err) {
                console.log("ERROR", err.response.data.error);
                res.json({ message: 'Error' });
            }
        });
    }
    // Toma la tansaccion  
    PostBackPSEWompi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenProduction
            };
            try {
                walk_to_pay_models_1.default.updateTransaction(req.body);
                res.json({ status: 200 });
                console.log("All GOOG");
            }
            catch (err) {
                console.log("Any BAD", err);
            }
        });
    }
    // Trae los Bancos
    getBancks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenProduction
            };
            try {
                var response = yield axios.get(urlGetBackPSE, {
                    headers: headers
                });
                res.json(response.data.data);
                console.log("Ok");
            }
            catch (err) {
                console.log("ERROR", err);
            }
        });
    }
    // Create transaccion
    createTransactionBack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Data', req.body.data.numberCreditChange.toString());
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getTokenProduction
            };
            try {
                let tokenCard = {
                    // '4111111111111111'
                    "number": req.body.data.numberCreditChange.toString(),
                    "exp_month": req.body.data.month,
                    "exp_year": req.body.data.year.toString(),
                    "cvc": req.body.data.cvv,
                    "card_holder": req.body.data.name // Nombre del tarjeta habiente (string de mínimo 5 caracteres)          
                };
                var responseCardToken = yield axios.post(urlCard, tokenCard, {
                    headers: headers
                });
                var cartdata = {
                    "payment_method_type": "CARD",
                    "payment_method": {
                        "type": "CARD",
                        "installments": req.body.data.quotas,
                        "token": responseCardToken.data.data.id // Token de la tarjeta de crédito
                    },
                    // Otros campos de la transacción a crear...
                    "amount_in_cents": parseInt(req.body.product.Resultados.precio + ('00')),
                    "currency": "COP",
                    "name": req.body.product.Resultados.titulo,
                    "customer_email": req.body.data.email,
                    "reference": '454sf4544545565',
                    "description": req.body.product.Resultados.descripcion,
                    "image_url": req.body.product.Resultados.imagenes_Producto[0],
                    "redirect_url": "https://www.kiero.co/",
                    "single_use": false,
                    "collect_shipping": false
                };
                var responseWompi = yield axios.post(urlCreateTransaction, cartdata, {
                    headers: headers
                });
                var responseEstatusTransactionCard = yield axios.get(urlGetTransaction + responseWompi.data.data.id, {
                    headers: headers
                });
                walk_to_pay_models_1.default.createTransactionCard(responseCardToken.data.data, responseWompi.data.data, cartdata, responseEstatusTransactionCard.data.data.status);
                console.log("Ok");
                sendEmail_1.default.sendMail(req.body, responseEstatusTransactionCard);
                res.json({ message: 'Complete' });
            }
            catch (err) {
                console.log("ERRORfasdf", err.response.data.error);
                res.json({ message: 'Error' });
            }
        });
    }
}
const walkToPayController = new WalkToPayController;
exports.default = walkToPayController;
/*

Ok {
  id: '1703-1568674629-37774',
  created_at: '2019-09-16T22:57:09.065Z',
  amount_in_cents: 2500000,
  reference: '4546645gf',
  customer_email: 'josemase55@gmail.com',
  currency: 'COP',
  payment_method_type: 'CARD',
  payment_method: {
    type: 'CARD',
    extra: {
      bin: '424242',
      name: 'VISA-4242',
      brand: 'VISA',
      exp_year: '29',
      exp_month: '06',
      last_four: '4242'
    },
    installments: 2
  },
  status: 'PENDING',
  status_message: null,
  shipping_address: null,
  redirect_url: 'https://www.mitienda.co',
  payment_source_id: null,
  payment_link_id: null,
  customer_data: null,
  bill_id: null
}


*/
/*
numberCredit: '1111 1111 1111 1111 ',
  name: '7777 undefined77',
  numberDoc: '2222222222',
  typeDoc: 'NIT',
  month: '02',
  year: 2020,
  cvv: '1233',
  quotas: 2,
  paymentMethod: '1'



*/
/*
 

*/ 
