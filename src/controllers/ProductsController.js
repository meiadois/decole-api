const ProductsRepository = require('../repositories/ProductsRepository');

module.exports = {
    async index(req, res) {
        const products = await ProductsRepository.findAll();
        return res.json(products);
    },
    async get(req, res) {
        const { id } = req.params;
        const product = await ProductsRepository.findOne(id);
        return res.json(product);
    },
    async store(req, res) {
        const { name, price, discount, type, value } = req.body;
        const product = await ProductsRepository.create({ name, price, discount, type, value });
        return res.json(product);
    },
    async update(req, res) {
        const { id } = req.params;
        const { name, price, discount, type, value } = req.body;
        const product = await ProductsRepository.update({ id, name, price, discount, type, value });
        return res.json(product);
    },
    async delete(req, res) {
        const { id } = req.params;
        const product = await ProductsRepository.delete(id);
        return res.json(product);
    },
    // TODO Verificar necessidade de criar em cada rota o método OPTIONs
    async options(req, res) {
        return res.status(501).json({ "Message": "Método em construção" });
        return res.json(
            {
                'Routes': {
                    '[GET]': [{
                        '/products': {
                            'Descrição': 'Retorna todos os produtos cadastrados.',
                            'Params': '',
                            'Body': '',
                            'Header': ''
                        },
                        '/products/:id': {
                            'Descrição': 'Retorna o produto especificado.',
                            'Params': '[id]',
                            'Body': '',
                            'Header': ''
                        }
                    }],
                    '[POST]': [{
                        '/produtos': 'Cria um produto'
                    }],
                    '[UPDATE]': [{
                        '/produtos/:id': 'Atualiza o produto especificado.'
                    }],
                    '[DELETE]': [{
                        '/produtos/:id': 'Deleta o produto especificado.'
                    }],
                }
            }
        );
    },
};