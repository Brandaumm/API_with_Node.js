const request = require('supertest');
const app = require('../src/index');

describe('API Endpoints', () => {
    let pedidoId;
    let rotaId;

    // Testa criação e listagem de pedidos
    it('should create and list pedidos', async () => {
        const res = await request(app)
            .post('/pedidos')
            .send({
                endereco: { rua: 'Rua A', numero: 123 },
                latitude: -23.5505,
                longitude: -46.6333,
                produto: 'Produto A',
                quantidade: 1
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        pedidoId = res.body.id;

        const resList = await request(app).get('/pedidos');
        expect(resList.statusCode).toBe(200);
        expect(resList.body.length).toBeGreaterThan(0);
    });

    // Testa criação e listagem de rotas
    it('should create and list rotas', async () => {
        const res = await request(app)
            .post('/rotas')
            .send({
                latitude: -23.5505,
                longitude: -46.6333
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        rotaId = res.body.id;

        const resList = await request(app).get('/rotas');
        expect(resList.statusCode).toBe(200);
        expect(resList.body.length).toBeGreaterThan(0);
    });

    // Testa obtenção da melhor rota
    it('should get the best route', async () => {
        const res = await request(app).get(`/melhor-rota/${rotaId}`);

        console.log('Response Status:', res.statusCode);
        console.log('Response Body:', res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
