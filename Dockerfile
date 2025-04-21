# Etapa 1: build da aplicação com webpack
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagem final com app + json-server
FROM node:20

WORKDIR /app

# Copia apenas os arquivos necessários da etapa anterior
COPY --from=builder /app/dist /app/dist
COPY server.json ./
COPY package*.json ./

RUN npm install --only=production
RUN npm install -g serve json-server

EXPOSE 80 3333

CMD sh -c "serve dist -l 80 & json-server --watch server.json --port 3333"
