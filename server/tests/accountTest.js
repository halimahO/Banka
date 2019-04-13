/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

let clientToken;
let staffToken;
let clientAcct;

describe('ACCOUNT TEST', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'testClient@gmail.com',
        password: 'asdfghjkl',
        firstName: 'Halle',
        lastName: 'Berry',
      });
    clientToken = response.body.data.token;
    const userResponse = await chai
      .request(app)
      .post('/api/v1/accounts')
      .set({ Authorization: `Bearer ${clientToken}` })
      .send({
        type: 'savings',
      });
    clientAcct = userResponse.body.data.accountNumber;
    const staffResponse = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'testStaff@gmail.com',
        password: 'asdfghjkl',
        firstName: 'Halle',
        lastName: 'Berry',
      });
    staffToken = staffResponse.body.data.token;
  });
  describe('TEST FOR CREATING A BANK ACCOUNT', () => {
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
  describe('TEST FOR CHANGING BANK ACCOUNT STATUS', () => {
    it('it should succesfully change account status', (done) => {
      console.log(staffToken);

      chai
        .request(app)
        .patch('/api/v1/accounts/:clientAcct')
        .set({ Authorization: `Bearer ${staffToken}` })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          done();
        });
    });

    it('it should throw an error if account number is invalid', (done) => {
      const sampleData = {
        type: '',
      };
      chai
        .request(app)
        .post('/api/v1/accounts/0000000')
        .set({ Authorization: `Bearer ${clientToken}` })
        .send(sampleData)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(404);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
