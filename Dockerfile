FROM node:22.16.0

WORKDIR /app

# Copia package.json e package-lock.json para aproveitar cache
COPY package*.json ./

RUN npm install

# Copia todo o código da aplicação
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
