const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const mongoose = require('mongoose');
const request = require('supertest');

let server;
let customerId;
let movieId;
let rental;
let token;

const exec = () => {
    return request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId }); // ES6 syntax. Key is same as value, so can just use key
};

describe('/api/returns', async () => {
    beforeEach(async () => { 
        server = require('../../index');
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        });

        await rental.save();
    });
    afterEach(async () => {
        await Rental.remove({});
        await server.close();
    });

    it('should return 401 if client is not logged in', async () => {
        token = null;

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if customerId is not provided', async () => {
        customerId = null;

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 400 if movieId is not provided', async () => {
        movieId = null;

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('shold return 404 if no rental for this movie', async () => {
        rental.movie._id = '';

        const res = await exec();

        expect(res.status.toBe(404));
    });

    it('shold return 404 if no rental for this customer', async () => {
        rental.customer._id = '';

        const res = await exec();

        expect(res.status.toBe(404));
    });

})