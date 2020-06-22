## Educação

- Accounts :heavy_check_mark:
  - Usuário
  - Canal
  
  npx sequelize-cli model:generate --name Account --attributes username:string

- Canal :heavy_check_mark:
  - Nome
  - Categoria
  
  npx sequelize-cli model:generate --name Channel --attributes name:string,category:string

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
	- Canais (Channels)
	- Requisitos (Requirements)

	npx sequelize-cli model:generate --name Lesson --attributes title:string,description:string

- Licoes Concluidas :heavy_check_mark:
	- Licao
	- Usuario

	npx sequelize-cli model:generate --name DoneLesson --attributes user_id:string

- Percurso :heavy_check_mark:
	- Descricão
	- Licoes

	npx sequelize-cli model:generate --name Route --attributes description:string

- Percursos Concluidos :heavy_check_mark:
	- Percurso
	- Usuario

	npx sequelize-cli model:generate --name DoneRoute --attributes user_id:string


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
	- Usuario x Empresa :heavy_check_mark:
	- Empresa x Segmento :heavy_check_mark:
	- Pré requisito x Etapa :heavy_check_mark:
	- Pré requisito x Lição :heavy_check_mark:
- 1 x n
	- Licao x Etapa :heavy_check_mark:
    - Licao x Pŕe Requisitos :heavy_check_mark:
	- Plano x Usuario
	- Usuario x Licoes Concluidas :heavy_check_mark:
	- Usuario x Percursos Concluidos :heavy_check_mark:

- n x n
	- Percurso x Licao (route_lessons) :heavy_check_mark:
	- Canal x Licao (channel_lessons) :heavy_check_mark:
	- Empresa x Like (company_likes) :heavy_check_mark:
	- Usuario x Percurso (user_routes) :heavy_check_mark:
	- Usuario x Empresa (user_companies) :heavy_check_mark:


## Comandos

### Criar migration
`sequelize migration:create --name=create-users`
### Subir migrations
`sequelize-cli db:migrate`


### Remover migration especifica
`npx sequelize-cli db:migrate:undo --name 20200424210933-create-like.js`

### Remover todas as migrations do banco
`sequelize-cli db:migrate:undo:all`


### Criar Seed
`sequelize seed:generate --name users`

## Subir Seeds
`sequelize-cli db:seed:all`

## Subir um
`npx sequelize-cli db:seed --seed 20191011121208-update-feature.js`

## Remover Seed especifico
`sequelize-cli db:seed:undo --seed name-of-seed-as-in-data`

## Remover todos os Seeds
`sequelize-cli db:seed:undo:all`
