//const pool = require('../database');
import * as sql from 'mssql';
import pool from '../database'

import { promises } from 'fs';
class InserWalkToPay{
  public async createTransactionCard(responseCardToken:any,responseWompi:any,cartdata:any,responseEstatusTransactionCard:any): Promise<any>{      
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
      pool.connect().then(() => {
        const request = new sql.Request(pool);
        const result =  request.query(cardquery);
        console.dir(result);
      });            
      console.log("Insercion completa.")
    } catch (error) {
      console.log("error",error);         
    }
  }

  public async createTransactionPSE(responseWompi:any,cartdata:any,responseEstatusTransactionCard:any): Promise<any>{
    
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
      pool.connect().then(() => {
        const request = new sql.Request(pool);
        const result =  request.query(cardquery);
        console.dir(result);
      });            
      console.log("Insercion completa.")
    } catch (error) {
      console.log("error",error);         
    }
  }

  public async updateTransaction(req:any): Promise<any>{
    const query = `UPDATE wompy_pay_card SET status = '${req.data.transaction.status}' WHERE token_datacredir = '${req.data.transaction.id}'`;          
    try {        
      pool.connect().then(() => {
        const request = new sql.Request(pool);
        const result =  request.query(query);
        console.dir(result);
      });            
      console.log(" transaction.updated complete.")
    } catch (error) {
      console.log("error",error);         
    }
  }


  
  

}

const inserWalkToPay = new InserWalkToPay;
export default inserWalkToPay;
