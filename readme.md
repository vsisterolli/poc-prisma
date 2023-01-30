A ouranimelist é uma API que permite o usuário registrar e acompanhar o status de todos os animes e séries que ele desejar.

Rotas:

------------------------------------------------------------------------------------------

AUTENTICAÇÃO

POST /signup

Recebe no body {
    "username": string,
    "password": string,
    "email": string
}

Retorna 201 CREATED caso bem sucedido ou 409 CONFLICT caso o email já tenha sido cadastrado.

POST /signin

Recebe no body {
    "email": string,
    "password": string
}

Retorna um JWT que deverá ser usado no formato de Bearer token nas rotas autenticadas.
HTTP STATUS 200 SUCCESS caso bem sucedido, 404 NOT FOUND caso o email não tenha sido encontrado, 401 UNAUTHORIZED senha incorreta.

-----------------------------------------------------------------------------------------

ANIMES

Todas as rotas de ANIMES requerem autenticação do JWT recebido ao logar no formato Bearer token.

GET /animes

Retorna a lista de todos os animes cadastrados pelo usuário, no seguinte formato:

{
    "id": number,
    "user_id": number,
    "image": string,
    "status": string,
    "name": string,
}

HTTP STATUS 200 SUCCESS caso bem sucedido ou 403 FORBIDDEN caso o token esteja inválido.

POST /animes

Permite o cadastro de um anime no seguinte formato:

{
    "name": string,
    "image": string
}

HTTP STATUS 201 CREATED caso bem sucedido ou 403 FORBIDDEN caso o token esteja inválido.

PATCH /animes/:id

Permite a atualização do status do anime dentre as opções "not watched", "watching", "watched". Para isso, enviar no body:

{
    "status": string // deve ser uma das 3 opções descritas;
}

HTTP STATUS 200 SUCCESS caso bem sucedido, 401 UNAUTHORIZED caso o token do usuário não corresponda ao usuário que cadastrou o anime, 404 NOT FOUND caso o id não seja encontrado, 403 FORBIDDEN caso o token esteja errado ou 422 ENTITY NOT PROCESSABLE caso o status do body esteja incorreto.

DELETE /animes/:id

Permite a deleção do anime.

HTTP STATUS 200 SUCCESS caso bem sucedido, 401 UNAUTHORIZED caso o token do usuário não corresponda ao usuário que cadastrou o anime, 404 NOT FOUND caso o id não seja encontrado ou 403 FORBIDDEN caso o token esteja errado.