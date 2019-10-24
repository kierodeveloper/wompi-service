import express, {Application} from 'express';
import WalkToPay from './router/walk-to-pay.router';
import morgan from 'morgan';
import cors from 'cors';

 
class Server{
  
   public app: Application;
  
   constructor(){
       this.app = express();
       this.config();
       this.router();
      
   }
 
   config():void{
       this.app.set('port',  process.env.PORT ||  3002)

       this.app.use(morgan('dev'));
       this.app.use(cors());
       this.app.use(express.json());
       this.app.use(express.urlencoded({extended: false}));
   }
 
   router():void{
       this.app.use(WalkToPay);       
   }
 
   start():void{
       this.app.listen(this.app.get('port'), ()=>{
           console.log("Server on port ",this.app.get('port'))
       })
   }
}
 
const server = new Server()
server.start();