const request = require('supertest');
const app = require("../app");
const { User, sequelize } = require('../models');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const { queryInterface, Sequelize } = sequelize;

let userToken = ''
const userData = {
    email: 'admin@shop.com',
    password: '12345678',
    role: 'admin'
}
beforeAll(done => {
  User.findOne({where: {email: userData.email}})
  .then(user => {
    userToken = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }, process.env.secret );
    done();
  })
  .catch(err => {
    done(err);
  })
})

afterAll(async (done) => {
  try {
    await queryInterface.dropTable('Products');
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER
      }
    });
    done();
  } catch (err) {
    done(err);
  }
})


describe('POST /product', function() {
    test('Create Product', function(done) {
      return request(app)
        .post('/product')
        .set('token', userToken)
        .set('Accept', 'application/json')
        .send({
          name: 'PULLOVER SWEAT Basquiat x WB HOODIE (PJG)',
          image_url: 'https://im.uniqlo.com/images/common/pc/goods/431825/item/30_431825_large.jpg?_ga=2.255244427.221025172.1604997277-106034054.1604997277&_gac=1.258715256.1604997283.CjwKCAiAkan9BRAqEiwAP9X6Ucuci_Ke7MyAuU8B5qJ4mRDgvjNZwNZWuqxM2gJnrzxJeGMeS1aajhoCMuMQAvD_BwE',
          price: 399000,
          stock: 10
        })
        .then((res) => {
          const {status, body} = res
          expect(body).not.toBeNull()
          expect(status).toBe(201);
          expect(body).toHaveProperty('msg', 'success add product');
          expect(body).toHaveProperty('product', 'PULLOVER SWEAT Basquiat x WB HOODIE (PJG)');
          done();
        })
        .catch(err => {
          done(err);
        })
    });
  
});

describe('GET /product', () => {
  test('Get all product', (done) => {
    return request(app)
      .get('/product')
      .set('token', userToken)
      .set('Accept', 'application/json')
      .then(res => {
        console.log(res.body, res.status)
        const { status, body } = res
        expect(status).toBe(200)
        expect(body).not.toBeNull()
        expect(body).toHaveProperty('dataProduct', expect.any(Array))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('DELETE /product/:id', () => {
test('Delete product by id', (done) => {
    let target = 1
    return request(app)
      .delete('/product/' + target)
      .set('token', userToken)
      .set('Accept', 'application/json')
      .then(res => {
        const {status, body} = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('msg', 'Product deleted')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})