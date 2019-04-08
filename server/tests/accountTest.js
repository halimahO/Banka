import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('TEST ROUTE FOR CREATING A BANK ACCOUNT', () => {
    it('it should succesfully create a bank account', (done) => {
		const sampleData = {
			accountNumber: 1234567890,
			type: 'savings',
      firstName: 'Kemi',
      lastName: 'Gold',
      email: 'kemigold@yahoo.com'
		};
		chai
			.request(app)
			.post('/api/v1/accounts')
			.send(sampleData)
			.end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('status');
                expect(res.body.status).to.be.a('number');
                expect(res.body.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('type');
                expect(res.body.data).to.have.property('firstName');
                expect(res.body.data).to.have.property('lastName');
                expect(res.body.data).to.have.property('email');
                expect(res.body.data.type).to.be.a('string');
                expect(res.body.data.firstName).to.be.a('string');
                expect(res.body.data.lastName).to.be.a('string');
                expect(res.body.data.email).to.be.a('string');
                expect(res.body.data.type).to.equal('savings');
                expect(res.body.data.firstName).to.equal('kemi');
                expect(res.body.data.lastName).to.equal('Gold');
                expect(res.body.data.email).to.equal('kemigold@yahoo.com');
				done();
			});
	});

  it('it should throw an error for an empty firstname field', (done) => {
		const sampleData = {
			accountNumber: 1234567890,
			type: 'savings',
      firstName: '',
      lastName: 'Gold',
      email: 'kemigold@yahoo.com'
		};
		chai
			.request(app)
			.post('/api/v1/accounts')
			.send(sampleData)
			.end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('status');
                expect(res.body.status).to.be.a('number');
                expect(res.body.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.equal('Fistname field is empty');
				done();
			});
  });

  it('it should throw an error for an empty Lastname field', (done) => {
		const sampleData = {
			accountNumber: 1234567890,
			type: 'savings',
      firstName: 'Kemi',
      lastName: '',
      email: 'kemigold@yahoo.com'
		};
		chai
			.request(app)
			.post('/api/v1/accounts')
			.send(sampleData)
			.end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('status');
                expect(res.body.status).to.be.a('number');
                expect(res.body.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.equal('Lastname field is empty');
				done();
			});
	});
  
  it('it should throw an error for an empty email field', (done) => {
		const sampleData = {
			accountNumber: 1234567890,
			type: 'savings',
      firstName: 'Kemi',
      lastName: 'Gold',
      email: ''
		};
		chai
			.request(app)
			.post('/api/v1/accounts')
			.send(sampleData)
			.end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('status');
                expect(res.body.status).to.be.a('number');
                expect(res.body.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.equal('Email field is empty');
				done();
			});
  });
  
  it('it should throw an error for an empty type field', (done) => {
		const sampleData = {
			accountNumber: 1234567890,
			type: '',
      firstName: 'Kemi',
      lastName: 'Gold',
      email: 'kemigold@yahoo.com'
		};
		chai
			.request(app)
			.post('/api/v1/accounts')
			.send(sampleData)
			.end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('status');
                expect(res.body.status).to.be.a('number');
                expect(res.body.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.equal('Type field is empty');
				done();
			});
  });
  
});