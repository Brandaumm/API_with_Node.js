const express = require('express');
const app = express();
const pedidosRouter = require('./pedidos');
const rotasRouter = require('./rotas');

const pedidos = [
  { endereco: { rua: 'Rua A', numero: 123 }, latitude: -23.5505, longitude: -46.6333, produto: 'Produto A', quantidade: 1, id: 1 }
];

const rotas = [
  { latitude: -23.5505, longitude: -46.6333, id: 1 }
];

app.use(express.json());
app.use('/pedidos', pedidosRouter);
app.use('/rotas', rotasRouter);

app.get('/melhor-rota/:id', (req, res) => {
  try {
    const rotaId = parseInt(req.params.id, 10);
    const rota = rotas.find(r => r.id === rotaId);

    if (!rota) {
      return res.status(404).send('Rota não encontrada');
    }

    const deliveries = pedidos.map(pedido => ({
      produto: pedido.produto,
      quantidade: pedido.quantidade,
      rota: rota
    }));

    res.json(deliveries);
  } catch (error) {
    console.error('Erro ao obter a melhor rota:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
