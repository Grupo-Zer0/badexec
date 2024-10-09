# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que la aplicación va a correr
EXPOSE 3000

# Define el comando para correr la aplicación
CMD ["npm", "start"]

# Build with docker build -t badweb .

# Run with docker run -p 3000:3000 badweb