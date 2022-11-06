const request = require('supertest')
const {connect} = require('./database')
const userModel = require('../models/user.model')
const app = require('../app');

describe('Auth: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should signup a user', async () => {
        const response = await request(app).post('/signup')
        .set('content-type', 'application/json')
        .send({ 
            username: 'Emjay', 
            password: '1234567', 
            firstName: 'Juliana',
            lastName: 'Micheal',
            email: 'julianamicheal06@gmail.com'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('username', 'Emjay')
        expect(response.body.user).toHaveProperty('first_name', 'Juliana')
        expect(response.body.user).toHaveProperty('last_name', 'Micheal')
        expect(response.body.user).toHaveProperty('email', 'julianamicheal06@gmail.com')        
    })


    it('should login a user', async () => {
        // create user in out db
        const user = await userModel.create({ username: 'julianamicheal@gmail.com', password: '123456'});

        // login user
        const response = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            username: 'julianamicheal06@gmail.com', 
            password: '123456'
        });
    

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')      
    })
})