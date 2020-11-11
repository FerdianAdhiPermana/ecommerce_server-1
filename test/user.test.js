const request = require('supertest')
const app = require('../app')

let user_data = {
    email: 'admin@shop.com',
    password: '12345678',
    role: 'admin'
}

describe('Login / Success Case', () => {
    test('Should send an object  with keys : msg, status-code, id and email', (done) =>{
        request(app)
        .post('/login')
        .send(user_data)
        .end(function(err, res){
            if(err) throw err;
            else{
                expect(res.status).toBe(201);
                expect(res.body).toHaveProperty('msg', 'success login account');
                expect(res.body).toHaveProperty('status-code', 201);
                expect(res.body).toHaveProperty('id', expect.any(Number));
                expect(res.body).toHaveProperty('email', user_data.email);
                expect(res.body).toHaveProperty('password', user_data.password);
                done()
            }
        })
    })
})

describe('Login / Error Case', () => {
    test('Failed because of invalid email format', (done) =>{
        const user_invalid_email = {
            ...user_data,
            email: 'admin.com'
        }
        request(app)
        .post('/login')
        .send(user_invalid_email)
        .end(function(err, res){
            const errors = ['invalid email format']
            if(err) throw err;
            else{
                expect(res.status).toBe(400);
                expect(res.body).toHaveProperty('errors', expect.any(Array));
                expect(res.body.errors).toEqual(expect.arrayContaining(errors));
                done();
            }
       })
    })
})

describe('Login / Error Case', () => {
    test('Failed because of invalid null password', (done) =>{
    request(app)
    .post('/login')
    .send({
        email: 'admin@shop.com'
    })
    .end(function(err, res){
        const errors = ['password']
        if(err) throw err;
        else{
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors', expect.any(Array));
            expect(res.body.errors).toEqual(expect.arrayContaining(errors));
            done();
        }
     })
  })
})