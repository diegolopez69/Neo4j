let neo4j = require('neo4j-driver');
const rabbitPublisher = require('../services/rabbit.publisher.service');
let driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'test'));

class BaseController{
    constructor(){
        this.neo4j = neo4j;
        this.rabbitPublisher = rabbitPublisher;
        this.driver = driver;
    }
}

module.exports = BaseController;