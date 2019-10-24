export class TokenCardCredit {    
    number:string ;
    exp_month:string;
    exp_year:string;
    cvc:string;
    card_holder:string;
    
    constructor(number:string,exp_month:string,exp_year:string,cvc:string,card_holder:string){
        this.number = number;
        this.exp_month = exp_month;
        this.exp_year = exp_year;
        this.cvc = cvc;
        this.card_holder = card_holder;
    }
    get getNumber(): string { return this.number }
    set setNumber(number:string){ this.number = number }

}

