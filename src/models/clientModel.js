/*
Modelo Client, clientId, userId, industry, company, language
 */

class Client {
    constructor({ clientId, userId, industry, company, language }) {
        this.clientId = clientId;
        this.userId = userId;
        this.industry = industry;
        this.company = company;
        this.language = language;
    }
}

module.exports = Client;