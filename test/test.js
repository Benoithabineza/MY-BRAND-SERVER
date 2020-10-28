
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import  server from '../index.js';
import { response } from 'express';

let should = chai.should()

chai.use(chaiHttp);

const {expect} = chai;
//Test for fetch all articles

describe ("ApiTesting",()=>{
    it("it should get all article",()=>{
        chai.request(server).get("/fetchArticles").end((req , res) => {
            res.body.should.be.a("array")
         })

      done();  
    })
});
    
//Test for delete articles
describe("delete/deleteArticle/:articleID",()=>{
    it("it should  delete an existing article",
    (done) =>{
        const taskid =1;
        chai.request(server)
        .delete("/deleteArticle/:articleID"+ taskid)
        .end(err.response) => {
            response.should.have.status(200);
            done();
        }
        });
    });

