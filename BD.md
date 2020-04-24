## Educação


- Rede Social 
	- Nome
	
	npx sequelize-cli model:generate --name SocialNetwork --attributes name:string

- Plataforma de Venda
	- Nome

	npx sequelize-cli model:generate --name Marketplace --attributes name:string
	
- Etapa
	- Mensagem

	npx sequelize-cli model:generate --name Step --attributes message:string

- Licao
	- Titulo
	- Descrição
	- Etapas
	- Redes Sociais
	- Plataformas de Vendas

	npx sequelize-cli model:generate --name Lesson --attributes title:string,description:string

- Percurso
	- Descricão
	- Licoes

	npx sequelize-cli model:generate --name Route --attributes description:string



## Parceiros

- Empresa
	- Nome
	- CEP
	- Segmento	
	- Serviços
	- Produtos
	- Likes
	- CNPJ (Opcional)

- Serviço
	- Nome
	
- Produto
	- Nome

- Segmento (Opções de Naiara)
	- Nome

- Like
	- Usuario de origem
	- Usuario de destino
	- Situacao : [Não respondida, Aceita, Negada]

- Sequencia de Percursos
	- Percursos

- Usuario
	- Usuario
	- Email
	- Senha
	- Empresa
	- Plano
	- Licoes Concluidas
	- Sequencia de Percursos
	- Percurso em andamento
	- Percursos concluidos

## Relações
- 1 x n
	- Licao x Etapa

	- Usuario x Empresa
	- Usuario x Licoes (Licoes concluidas)
	- Usuario x Percursos (Percursos concluidos)

- n x n
	- Percurso x Licao
	- Licao x Plataforma de Venda
	- Licao x Rede Social

	- Empresa x Like
	- Empresa x Segmento
	- Empresa x Produto
	- Empresa x Serviço