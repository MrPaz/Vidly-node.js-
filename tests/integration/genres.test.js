const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

let server;

describe('api/genres', () => {
    let token;
    let name;
    
    beforeEach(() => { 
        server = require('../../index');
        token = new User().generateAuthToken();
        name = 'genre1';       
    });
    
    afterEach(async () => { 
        await Genre.remove({});
        await server.close();
    });

    const exec = async () => {
        return await request(server)
        .post('/api/genres/')
        .set('x-auth-token', token)
        .send({ name }); // ES6 if key & value are same can just use key
    }
    
    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);

            const res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', async () => {
        it('should return genre if passed valid id', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();

            const res = await request(server).get(`/api/genres/${genre._id}`);

            expect(res.status).toBe(200);
            expect(res.body.name).toBe(genre.name);           
        });
    });

    describe('GET /:id', () => {
        it('should return 404 if passed invalid id', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();

            const res = await request(server).get('/api/genres/123');

            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        it('should return 401 if client is not logged in', async () => {
            token = ''; // simulates client not logged in

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if genre is less than 5 characters', async () => {
            name = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });
        
        it('should return 400 if genre is more than 50 characters', async () => {
            name = new Array(52).join('a'); // generates 51 char string

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save genre if genre is valid', async () => {
            await exec();
            
            const result = await Genre.find({ name: 'genre1' });

            expect(result).not.toBe(null);
        });

        it('should return genre if genre is valid', async () => {
            const res = await exec();
            
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
});