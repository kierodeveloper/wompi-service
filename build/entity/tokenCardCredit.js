"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenCardCredit {
    constructor(number, exp_month, exp_year, cvc, card_holder) {
        this.number = number;
        this.exp_month = exp_month;
        this.exp_year = exp_year;
        this.cvc = cvc;
        this.card_holder = card_holder;
    }
    get getNumber() { return this.number; }
    set setNumber(number) { this.number = number; }
}
exports.TokenCardCredit = TokenCardCredit;
