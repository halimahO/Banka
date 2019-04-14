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

describe('USER TEST', () => {
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

  describe('USER SIGNUP', () => {
    it('it should return 201 if signs up is successful', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(clientField2);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.a('number');
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('object');
    });

    it('it should return 400 if there are missing fields', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(missingClient);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 400 if the fields are empty', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(emptyClient);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
  });

  describe('USER LOGIN', () => {
    it('it should return 201 if client successfully logs in', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(login);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.a('number');
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('object');
    });

    it('it should return 400 if the login fields are empty', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(emptyLogin);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 400 if there is a missing field in login', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(missingLogin);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 400 if there inputs in fields are invalid', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(wrongLogin);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
  });

  describe('ADMIN CAN CREATE STAFF/ADMIN', () => {
    it('it should return 201 if admin successfully creates an admin', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(staffField2);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.a('number');
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('object');
    });

    it('it should return 201 if admin successfully creates a staff', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(adminField2);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.a('number');
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('object');
    });

    it('it should return 403 if there is a missing field in the create staff form', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .send(missingStaff);
      expect(res).to.have.status(403);
      expect(res).to.have.property('error');
    });

    it('it should return 403 if the create admin fields are empty', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .send(emptyAdmin);
      expect(res).to.have.status(403);
      expect(res).to.have.property('error');
    });

    it('it should return 403 if there is a missing field in the create admin form', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .send(missingAdmin);
      expect(res).to.have.status(403);
      expect(res).to.have.property('error');
    });

    it('it should return 403 if the create staff fields are empty', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .send(emptyStaff);
      expect(res).to.have.status(403);
      expect(res).to.have.property('error');
    });
  });
});
