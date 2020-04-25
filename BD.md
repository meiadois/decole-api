## Educação


- Rede Social :heavy_check_mark:
	- Nome

	npx sequelize-cli model:generate --name SocialNetwork --attributes name:string

- Plataforma de Venda :heavy_check_mark:
	- Nome

	npx sequelize-cli model:generate --name Marketplace --attributes name:string
	
- Etapa :heavy_check_mark:
	- Mensagem
	- Ordem
  
	npx sequelize-cli model:generate --name Step --attributes message:string, order:integer

- Pré Requisito :heavy_check_mark:
	- Licao
  	- Etapa
  
	npx sequelize-cli model:generate --name Requirement --attributes lixo:string,
  
- Licao :heavy_check_mark:
	- Titulo
	- Descrição
	- Etapas
	- Redes Sociais (SocialNetworks)
	- Plataformas de Vendas (Marketplace)
	- Requisitos (Requirements)

	npx sequelize-cli model:generate --name Lesson --attributes title:string,description:string

- Percurso :heavy_check_mark:
	- Descricão
	- Licoes

	npx sequelize-cli model:generate --name Route --attributes description:string



## Parceiros

- Empresa :heavy_check_mark:
	- Nome
	- CEP
	- Segmento	
	- Serviços
	- Produtos
	- Likes
	- Thumbnail
	- CNPJ (Opcional)

	npx sequelize-cli model:generate --name Company --attributes name:string,cep:string,thumbnail:string,cnpj:string

- Serviço :heavy_check_mark:
	- Nome

	npx sequelize-cli model:generate --name Service --attributes name:string
	
- Produto :heavy_check_mark:
	- Nome

	npx sequelize-cli model:generate --name Product --attributes name:string

- Segmento :heavy_check_mark:
	- Nome

	npx sequelize-cli model:generate --name Segment --attributes name:string

- Like :heavy_check_mark:
	- Usuario de origem
	- Usuario de destino
	- Situacao : [Não respondida, Aceita, Negada, Removida]

	npx sequelize-cli model:generate --name Like --attributes sender_id:string,recipient_id:string,status:string

- Sequencia de Percursos :interrobang:
	- Percursos

	npx sequelize-cli model:generate --name RouteSequence

- Plano :interrobang:
	- Descrição
	- Preço
	- Nivel de acesso

	npx sequelize-cli model:generate --name Plan --attributes description:string,price:double,status:string

- Usuario :heavy_check_mark:
	- Usuario
	- Email
	- Senha
	- Empresa
	- Plano
	- Licoes Concluidas
	- Sequencia de Percursos
	- Percurso em andamento
	- Percursos concluidos

	npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string

## Relações
- 1 x 1
	- Usuario x Empresa

- 1 x n
	- Licao x Etapa
    - Licao x Pŕe Requisitos
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


## Comandos

### Subir migrations
`sequelize-cli db:migrate`

### Remover todas as migrations do banco
`sequelize-cli db:migrate:undo:all`