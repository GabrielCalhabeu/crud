# CRUD

## Arquitetura
No projeto foi utilizado: MongoDB, para o banco de dados. Express-Axios para servidor-cliente. E Nodejs para o fontend.
Cada modelo em Mongoose (modelo do MongoDB) foi separado e exportado para o seu respectivo controllador, que é exportado para o router.

A parte do servidor foi salvo em CRUD/server.

Para o cliente, cada página foi separada em um folder, e todos os componentes da página ficam no mesmo arquivo. 
o App.js apenas aponta para o Home e todas as outras rotas.

Como o banco utilizado é NoSql, a maioria do tratamento de dado é feito no servidor, assim como a requisição de informações de outros documentos.
Para com as atualizações, elas acontecem de forma que uma entidade, ao ser atualizada, não impacta nos outros documentos, pois o seu ID permanece intacto.
Para com as remoções, o servidor não permite deleção caso a entidade tenha dependência.

Erros feitos pelo usuário, como tentar remover uma entidade inexistete, serão avisados pelo cliente.

## Execução
Para executar, é necessário usar npm start, em CRUD/web. e npm run dev em CRUD/server/src. <br/>
Atualmente o servidor se conecta em um banco em nuvem, e portanto o projeto não possui o banco. <br/>
Atualmente é teoricamente possível acessar o banco de qualquer computador, de qualquer rede, exceto a rede da UFOP (Ou redes que usam Proxy ou VPN). <br/>
Qualquer impossibilidade de aceesso ao banco, favor me contatar. <br/>

## Modo de uso
Para criar uma entidade, basta preencher o formulário. (o id não é necessário preencher, pois não é usado). <br/>
Para atualizar uma entidade, é precisso preencher o formulário e o id, e clicar no botão de atualizar. <br/>
para Remover um componente, é preciso preencher o id, e clicar no botão de remover. <br/>
Para ir voltar de uma página é necessário clicar na seta de voltar do browser.
