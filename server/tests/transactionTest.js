/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {
  wrongAcctNo, wrongId, wrongAccount, wrongLogin, wrongTransaction,
  clientField, adminField, staffField, missingAdmin, missingClient,
  missingLogin, missingStaff, missingtestAdmin, emptyAccount, emptyAdmin,
  emptyClient, emptyLogin, emptyStaff, emptyTestAdmin, emptytransaction,
  login, account, transaction, testAdmin, clientField2, staffField2, adminField2,
} from './testData';

const { expect } = chai;
chai.use(chaiHttp);

let clientToken;
let staffToken;
let adminToken;
let clientAcctNo;

describe('TRANSACTION TEST', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(clientField);

    clientToken = response.body.data.token;

    const userResponse = await chai
      .request(app)
      .post('/api/v1/accounts')
      .set({ Authorization: `Bearer ${clientToken}` })
      .send({
        type: 'savings',
      });
    clientAcctNo = userResponse.body.data.accountNumber;

    const adminresponse = await chai
      .request(app)
      .post('/api/v1/admin')
      .send(adminField);
    adminToken = adminresponse.body.data.token;

    const staffResponse = await chai
      .request(app)
      .post('/api/v1/staff')
      .set({ Authorization: `Bearer ${adminToken}` })
      .send(staffField);
    staffToken = staffResponse.body.data.token;
  });

  describe('CASHIER CAN DEBIT ACCOUNT', () => {
    it('it should return 201 if cashier successfully debits account', async () => {
      const res = await chai.request(app)
        .post('/api/v1/transactions/:clientAcctNo/debit')
        .set({ Authorization: `Bearer ${staffToken}` })
        .send(transaction);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.a('number');
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('object');
    });

    it('it should return 400 if account number is wrong', async () => {
      const res = await chai.request(app)
        .post('/api/v1/transactions/:wrongAcctNo/debit')
        .set({ Authorization: `Bearer ${staffToken}` })
        .send(transaction);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 400 if amount is not a positive number', async () => {
      const res = await chai.request(app)
        .post('/api/v1/transactions/:clientAcctNo/debit')
        .set({ Authorization: `Bearer ${staffToken}` })
        .send(wrongAccount);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 403 if if user is not authorized', async () => {
      const res = await chai.request(app)
        .post('/api/v1/transactions/:clientAcctNo/debit')
        .set({ Authorization: `Bearer ${clientToken}` })
        .send(transaction);
      expect(res).to.have.status(403);
      expect(res).to.have.property('error');
    });
  });

  describe('CASHIER CAN CREDIT ACCOUNT', () => {
    it('it should return 201 if cashier successfully debits account', async () => {
      const res = await chai.request(app)
        .post('/api/v1/transactions/:clientAcctNo/credit')
        .set({ Authorization: `Bearer ${staffToken}` })
        .send(transaction);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.a('number');
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('object');
    });

    it('it should return 400 if account number is wrong', async () => {
      const res = await chai.request(app)
        .post('/api/v1/transactions/:wrongAcctNo/credit')
        .set({ Authorization: `Bearer ${staffToken}` })
        .send(transaction);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 400 if amount is not a positive number', async () => {
      const res = await chai.request(app)
        .post('/api/v1/transactions/:clientAcctNo/credit')
        .set({ Authorization: `Bearer ${staffToken}` })
        .send(wrongAccount);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 403 if if user is not authorized', async () => {
      const res = await chai.request(app)
        .post('/api/v1/transactions/:clientAcctNo/credit')
        .set({ Authorization: `Bearer ${clientToken}` })
        .send(transaction);
      expect(res).to.have.status(403);
      expect(res).to.have.property('error');
    });
  });
});
