
# Imagen oficial de Node.js
FROM node:22-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --omit=dev

# Copiar el código del frontend
COPY . .

# Puerto de Node.js
EXPOSE 3000

# Ejecutar aplicación
CMD ["node", "app.js"]
