<table>
  <tr>
    <td><img src="https://github.com/luiizsilverio/nlw-copa/blob/master/web/src/assets/logo.svg" /></td>
    <td><h1>NLW-COPA</h1></td>
  </tr>
</table>

## Conteúdo
* [Sobre a aplicação](#sobre-a-aplicação)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Iniciando a Aplicação](#car-Iniciando-a-aplicação)
* [Screenshots](#camera_flash-screenshots)
* [Licença](#balance_scale-licença)
* [Contato](#email-contato)

## Sobre a aplicação
Aplicação desenvolvida durante o NLW Copa, promovido pela Rocketseat.<br />
Durante o evento, foram desenvolvidas 3 aplicações, uma API em Node, uma aplicação React com Next e um App em React Native.<br />
A aplicação web permite cadastrar bolões. A aplicação mobile faz uma autenticação por meio da conta do GMail; permite fazer palpites dos jogos e buscar um bolão.<br />
<br />

## :hammer_and_wrench: Tecnologias
* Back-end
  * __Node__ + __Fastify__ + __Typescript__
  * __Prisma ORM__ com SQLite
  * Autenticação __JWT__
  * Validação dos dados com __Zod__
* Front-end
  * __React__ + __Next__ + __Typescript__
  * __TailwindCSS__ para estilização
  * Acesso à API com __Axios__
* Mobile
  * __React Native__ com __Expo__
  * __Phosphor-react-native__ para exibir ícones.
  * Componentes de interface com __Native Base__
<br />

## :car: Iniciando a aplicação
Baixe o repositório com git clone e entre na pasta do projeto.
```bash
$ git clone https://github.com/luiizsilverio/nlw-copa
```
* Back-end
Renomeie o arquivo __.env.example__ para __.env__.
```bash
$ cd server
$ npm install
$ npm run dev
```
* Front-end
```bash
$ cd ..
$ cd web
$ npm install
$ npm run dev
```
* Mobile
  * Renomeie o arquivo __.env.example__ para __.env__
  * Informe a URL da API, o Client ID e outros dados de configuração
```bash
$ cd ..
$ cd mobile
$ npm install
$ expo start
```

## :camera_flash: Screenshots
![](https://github.com/luiizsilverio/nlw-copa/blob/master/mobile/assets/nlw-copa.gif)

## :balance_scale: Licença
Este projeto está licenciado sob a [licença MIT](LICENSE).

## :email: Contato

E-mail: [**luiiz.silverio@gmail.com**](mailto:luiiz.silverio@gmail.com)
