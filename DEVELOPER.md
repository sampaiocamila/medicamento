# DEVELOPER

Run `npm install` para instalar todas as dependencias.  
Run `npm start` para rodar o projeto localmente.
Navegue para [http://localhost:4002/](http://localhost:4002/).
A aplicação será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

## Produção e homologação

Para build de Produção, run `npm run build:p`.
Para build de homologação, run `npm run build:h`.

## Build docker image

`$ docker build app-biologicos`

## Run o container

`$ docker run -d -p 8080:80 app-biologicos`

Para Visualizar :

[http://localhost:8080/biologicos](http://localhost:8080/biologicos)

Para ajustar a configuração do nginx editar o :
`scripts/nginx.conf`

## Com o Docker-Compose, também é muito fácil iniciar vários contêineres ao mesmo tempo

`docker-compose up`

## Para Visualizar o tamanho dos arquivos de saída, com um mapa de árvore interativo

[http://localhost:8080/biologicos/docs/analyzer.html](http://localhost:8080/biologicos/docs/analyzer.html)

## Para Visualizar métricas de desempenho ou Performance, Progressive Web App, Acessibilidade, Boas práticas e SEO

[http://localhost:8080/biologicos/docs/lighthouse.html](http://localhost:8080/biologicos/docs/lighthouse.html)
