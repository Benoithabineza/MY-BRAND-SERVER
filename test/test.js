
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import  server from '../index.js';
//import { response } from 'express';

let should = chai.should()

chai.use(chaiHttp);

const {expect} = chai;

//Test for GET fetch all articles

describe ("ApiTesting",()=>{
    it("it should get all article",(done)=>{
        chai.request(server)
        .get("/fetchArticles")
        .end((req , res) => {
            res.body.should.be.a("object")
         })

      done();  
    })
});

//Test the GET ROUTE
/*describ("GET /fetchArticles", ()=> {
    it("it should GET all the tasks", (done) => {
        chai.request(server)
        .get("/fetchArticles")
        .end(response)
            response.should.have.status(200);
            response.body.should.be.a("array");
            done();
        

        
    })
})*/
    

//TEST UPDATE ARTICLE

describe ("New articles",()=>{
    it('Should update an article' , (done) => {
        let articleId = '5f95c86f0a004707b1f5312b';
        let updateInfo = {
          title : 'RWANDA URUNDI'
        }
        chai.request(server).patch('/updateArticle/' + articleId).send(updateInfo).end( (err,res) => {
            console.log(res);
          res.should.have.status(200);
          res.body.message.should.eql('Article Updated successfully');
          done();
        })
      })
  });


//Test for one post by id

describe("new article",()=>{
    it("should post one article",(done)=>{
        let articleId="5f8802180f0fa207ce54e863";
        chai.request(server).get('/fetchArticles/'+ articleId).end((err,res)=>{
            res.should.have.status(200);
            res.body.message.should.eql(':To fetche one article successfully');
            done();
        })
    })
})

// DELETE  A POST BY ID
describe("Post",()=>{
    it('shopuld delete one article',(done)=>{
        let articleId="5f95c86f0a004707b1f5312b";
    chai.request(server).delete('/deleteArticle/'+articleId).end((err,res)=>{
        res.body.message.should.eql('deleted succesfully');
        done();
    })    })
})





