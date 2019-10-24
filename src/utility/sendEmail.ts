import * as nodemailer from 'nodemailer';
import  template  from './templateEmail'

class SendEmail{
    public async transport(){
        
    }

    public async sendMail(req:any,responseEstatusTransactionPSE?:any){        

        let addressNoticationTrans = [  'yulies1990@gmail.com', 'gloria.castaneda@kiero.co',
        'gustavo.baez@kiero.co', 'jose.mz@kiero.co', 'jose.marin@kiero.co','diana.gutierrez@kiero.co'];

        //addressNoticationTrans.push(req.data.email)
        const transport = await nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: 'yuli.espitia2@kiero.co',
                pass: 'Clavesegura2017'
            } 
        }) 

        const mailOptions = {
            from: 'yuli.espitia2@kiero.co',
            to: JSON.stringify(addressNoticationTrans),
            subject: 'Kiero | Vendiste un producto!',
            html: template.sendEmail(req,responseEstatusTransactionPSE)
        };
        const result = await transport.sendMail(mailOptions);
               
        return result;
        
    }


}
const sendEmail = new SendEmail();
export default sendEmail;
