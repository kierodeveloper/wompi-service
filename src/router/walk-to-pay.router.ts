import { Router } from 'express'
import  path from 'path'
import walkToPayController from '../controller/walk-to-pay.controller'
 
 
//import {  } from './templates'
 
class WalkToPay{
    router:Router = Router();
 
    constructor(){
         this.config();
    }
    config():void{
         this.router.get('/wompi/getListBanks',walkToPayController.getBancks)
         
         this.router.post('/wompi/stateBackEWompiTransaction',walkToPayController.PostBackPSEWompi) // Estado Transaccion

         this.router.post('/wompi/createTransaction',walkToPayController.createTransactionBack)
         this.router.post('/wompi/createTransactionNequi',walkToPayController.createTransactionNequi)
         this.router.post('/wompi/createTransactionPSE',walkToPayController.createTransactionPSE)
    }
}
 
export default new WalkToPay().router;
//export default walkToPay_Routes.router;
