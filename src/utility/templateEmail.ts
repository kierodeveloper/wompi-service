class Template{

    public sendEmail(req:any,responseEstatusTransaction:any){
        
        console.log('_____________________________________________')
        for(var i in req.product.Resultados){
            console.log(req.product.Resultados[i])
        }
        
        console.log('_____________________________________________')
        let stateMessage = ""
        switch (responseEstatusTransaction.data.data.status){
            case 'APPROVED':
                stateMessage = "Transacción Aprobada"
                break;
            case 'PENDING':
                stateMessage = "Transacción Pendiente"
                break;
            case 'DECLINED':
                stateMessage = "Transacción Invalida"
                break;
       }
        const template = `
        <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    
        <style>
            .clcard {
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                max-width: 300px;
                margin: auto;
                text-align: center;
                font-family: arial;
               
                background-color: rgb(248, 245, 245);
            }
    
            .clprice {
                color: grey;
                font-size: 22px;
            }
    
            .clcard button {
                border: none;
                outline: 0;
                padding: 12px;
                color: white;
                background-color: #000;
                text-align: center;
                cursor: pointer;
                width: 100%;
                font-size: 18px;
            }
    
            .clcard button:hover {
                opacity: 0.7;
            }
    
            .card {
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                max-width: 350px;
                margin: auto;
                text-align: center;
                font-family: arial;
                border-radius: 10%;
                background-color: rgb(248, 245, 245);
                border-color: red;
            }
    
            .cardClient {
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                max-width: 350px;
                border-bottom-right-radius: 10%;
                text-align: right;
                font-family: arial;
    
                border-color: red;
            }
    
            .title {
                color: grey;
                font-size: 18px;
            }
    
            .button {
                border: none;
                outline: 0;
                display: inline-block;
                padding: 8px;
                color: white;
                background-color: rgba(200, 9, 9, 0.842);
                text-align: center;
                cursor: pointer;
                width: 90%;
                font-size: 18px;
                border-radius: 10%;
            }
    
            .split {
                border: none;
                outline: 0;
                padding: 12px;
                color: white;
                background-color: rgba(200, 9, 9, 0.842);
                text-align: center;
    
                width: 92%;
                font-size: 18px;
            }
    
            a {
                text-decoration: none;
                font-size: 22px;
                color: red;
            }
    
            .button:hover,
            a:hover {
                opacity: 0.6;
            }
    
            .chip {
                display: inline-block;
                padding: 0 25px;
                height: 50px;
                font-size: 16px;
                line-height: 50px;
                border-radius: 25px;
    
    
            }
    
            .chip img {
                float: left;
                margin: 0 10px 0 -25px;
                height: 80px;
                width: 80px;
                border-radius: 50%;
            }
    
            .row {
                width: 100%;
                margin: 0 auto;
            }
    
            .block {
                width: 100%;
                float: left;
                padding: 1px
            }
        </style>
    </head>
    <!-- h2 style="text-align:center">User Profile Card</h2 -->
    <div class="row">
    
        <div class="card">
            <table style="text-align: center">
                <tr>
                    <td>
                        <img src="https://resourcekiero.s3-us-west-2.amazonaws.com/logo-kiero.png" alt="John"
                            style="width:70%">
                    </td>
                    <td>
                        <h3 style="color:red">${stateMessage}</h3>
                    </td>
                </tr>
            </table>
    
    
            <p class="title">Kiero International Group</p>
            <div class="chip">
                <img width="300" height="300"
                    src="${req.product.Resultados.imagenes_Producto[0]}">
            </div>
            <br>
            <br>
            <div style="margin: 24px 0;">
                <a href="#" style="color:blue"><i class="fa fa-twitter"></i></a>
                <a href="#" style="color:blue"><i class="fa fa-facebook"></i></a>
            </div>
            <p><a class="button" value="" href="https://www.kiero.co/">Contactanos</a></p>
        </div>
    
    
        <div class="clcard">
            <div class="split"></div>

            <table style="text-align: center">
                <tr>               
                    <th><p style="color:red">Datos usuario</p></th>                    
                </tr>
                <tr>
                    <td>
                        
                        <p> 🧑 ${req.data.name}</p>
                        <p> 💳 ${req.data.document_number ? req.data.document_number : req.data.numberDoc}</p>
                        <p> 📞 ${req.data.phone_number ? req.data.phone_number : ""}</p>
                        <p> 💴 ${req.data.name_bank ? req.data.name_bank : req.data.paymentMethod}</p>
                        <p> 📫 ${req.data.email}</p>                        
                    </td>                    
                </tr>
                <div style="margin: 24px 0;">
                    <a href="#" style="color:blue"><i class="fa fa-twitter"></i></a>
                    <a href="#" style="color:blue"><i class="fa fa-facebook"></i></a>
                </div>
            </table>
            <div class="split"></div>
        </div>
        
        <div class="clcard">
            <table style="text-align: center">
                <tr>               
                    <th><p style="color:red">Datos Producto</p></th>
                </tr>
                <tr>                
                    <td>
                        <p> 🧿 ${req.product.Resultados.titulo}</p>
                        <p> $ ${req.product.Resultados.precio}</p>
                        <p> 🧮 ${req.product.Resultados.color}</p>
                        <p> 🧮 ${req.product.Resultados.id_Producto}</p>                         
                    </td>
                </tr>
                <div style="margin: 24px 0;">
                    <a href="#" style="color:blue"><i class="fa fa-twitter"></i></a>
                    <a href="#" style="color:blue"><i class="fa fa-facebook"></i></a>
                </div>
            </table>
            <div class="split"></div>
        </div>
    </div>
        
        `
        return template;
    }
}

const template = new Template();
export default template;