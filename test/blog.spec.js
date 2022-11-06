const request = require('supertest')
const  {connect}= require('./database')
const app = require('../app')
const  blogModel = require('./model/blog')
const userModel = require('./model/users')
const { connect } = require('mongoose')


describe('Blog Route' , () =>{
    let conn;
    let token;


    beforeAll(async  () =>{
        conn = await connect()
        await userModel.create({username:'julianamicheal06@gmail.com' , password:'123456'})


        const loginResponse = await request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({
           username : 'julianamichealgmail.com',
           password:'654321'
        });
        token = loginResponse.body.token;

    })
    afterEach(async () =>{
        await conn.cleanup()
    })
    afterAll(async() =>{
        await conn.disconnect()
    })
    it('Should return blog',async () =>{
        await blogModel.create({
                 author:'Chinua Achebe',
                 title:'Things Fall Apart',
                 state: 'draft',
                 read_count: 0,
                 read_Time:'',

        })

        await blogModel.create({
           
                author:'Chinua Achebe',
                title:'Things Fall Apart',
                state: 'draft',
                read_count: 0,
                read_Time:'',
           
        })
        const response = await request(app)
        .get('/blog')
        .set('content-type' , 'application/json')
        .set('Authorization', `Bearer ${token}`)


        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('orders')
        expect(response.body).toHaveProperty('status', true)
    })


    
    it('should return orders with state 2', async () => {
           
        await blogSchema.create({
                 author:'Chinua Achebe',
                 title:'Things Fall Apart',
                 state: 'draft',
                 read_count: 0,
                 read_Time:'',
        

        })

        await blogSchema.create({
          
                 author:'Chinua Achebe',
                 title:'Things Fall Apart',
                 state: 'draft',
                 read_count: 0,
                 read_Time:'',
            

        })

        const response = await request(app)
        .get('/blog?state=2')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('blog')
        expect(response.body).toHaveProperty('status', true)
        expect(response.body.blog.every(blog => blog.state === 2)).toBe(true)
    })
})

