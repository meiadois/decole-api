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

	npx sequelize-cli model:generate --name Company --attributes name:string,cep:string,cnpj:string

- Serviço
	- Nome

	npx sequelize-cli model:generate --name Service --attributes name:string
	
- Produto
	- Nome

	npx sequelize-cli model:generate --name Product --attributes name:string

- Segmento (Opções de Naiara)
	- Nome

	npx sequelize-cli model:generate --name Segment --attributes name:string

- Like
	- Usuario de origem
	- Usuario de destino
	- Situacao : [Não respondida, Aceita, Negada]

	npx sequelize-cli model:generate --name Like --attributes sender_id:string,recipient_id:string,status:string

- Sequencia de Percursos
	- Percursos

	npx sequelize-cli model:generate --name RouteSequence

- Plano
	- Descrição
	- Preço
	- Nivel de acesso

	npx sequelize-cli model:generate --name Plan --attributes description:string,price:double,status:string

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

	npx sequelize-cli model:generate --name User username:string,email:string,password:string

## Relações
- 1 x 1
	- Usuario x Empresa

- 1 x n
	- Licao x Etapa
	- Plano x Usuario
	- Usuario x Licoes Concluidas
	- Usuario x Percursos Concluidos

- n x n
	- Percurso x Licao (route_lessons)
	- Licao x Plataforma de Venda (marketplace_lessons)
	- Licao x Rede Social (social_network_lessons)
	- Empresa x Like (company_likes)
	- Empresa x Segmento (company_segments)
	- Empresa x Produto (company_products)
	- Empresa x Serviço (company_services)
	- Usuario x Percurso (user_routes)



sequelize-cli db:migrate