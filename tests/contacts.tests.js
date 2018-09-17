const expect = require('chai').expect,
    request = require('supertest'),
    app = require('../server'),
    {sequelize}  = require('../server/models')


describe('SMS API',() => {
    before((done) => {
        sequelize.sync({ force: true }).then(() => {
            done();
        })
    });

    after(() => {
        process.exit(0);
    })
    
    describe('Contact route', () => {
        describe('/POST route', () => {
            it('does not allow the request body to be empty', (done) => {
                const req = {};
                request(app)
                .post('/api/contacts')
                .send(req)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.equal('Body cannot be empty');
                    done();
                });
            });
        
            it('does not allow empty fields', (done) => {
                const req = {
                    phoneNumber: '09086576454'
                };
                request(app)
                .post('/api/contacts')
                .send(req)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.success).to.equal(false);
                    expect(res.body.error.errors[0].message).to.equal('Contact.fullName cannot be null');
                    done();
                });
            });
        
            it('creates a new contact', (done) => {
                const req = {
                  fullName: 'Hope Ng',
                  phoneNumber: 900348342,
                };
                request(app)
                .post('/api/contacts')
                .send(req)
                .expect(201)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.success).to.equal(true);
                    expect(res.body.data).to.be.a('object');
                    expect(res.body.data.fullName).to.equal(req.fullName);
                    expect(res.body.data.phoneNumber).to.equal(req.phoneNumber);
                    expect(res.body.message).to.equal('Successfuly created contact');
                    done();
                });
            });
        });

        describe('/GET route', () => {
            it('Retrieves all contacts', (done) => {
                request(app)
                .get('/api/contacts')
                .set('Accept', 'application.json')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.success).to.equal(true);
                    expect(res.body.data).to.be.an('array');
                    expect(res.body.message).to.equal('Successfuly retrieved all contacts');
                    done();
                });
            });

            it('Retrieves a single contact', (done) => {
                request(app)
                .get('/api/contacts/1')
                .set('Accept', 'application.json')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.success).to.equal(true);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.message).to.equal('Successfuly retrieved contact');
                    expect(res.body.data).to.have.property('fullName');
                    expect(res.body.data.fullName).not.to.equal(null);
                    expect(res.body.data).to.have.property('phoneNumber');
                    expect(res.body.data.phoneNumber).not.to.equal(null);
                    done();
                });
            });
        })
    })

});