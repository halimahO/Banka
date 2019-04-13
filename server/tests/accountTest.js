/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

let clientToken;
let staffToken;
let cashierToken;
let adminToken;

describe('TEST ROUTE FOR CREATING A BANK ACCOUNT', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'testClient@gmail.com',
        password: 'asdfghjkl',
        firstName: 'Halle',
        lastName: 'Berry',
      })
      .end((err, res) => {
        clientToken = res.body.data.token;
        done();
      });
  });
  it('it should succesfully create a bank account', (done) => {
    const sampleData = {
      type: 'savings',
    };
    chai
      .request(app)
      .post('/api/v1/accounts')
      .send(sampleData)
      .set({ Authorization: `Bearer ${clientToken}` })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.a('number');
        expect(res.body.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('it should throw an error for an empty type field', (done) => {
    const sampleData = {
      type: '',
    };
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set({ Authorization: `Bearer ${clientToken}` })
      .send(sampleData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.a('number');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
