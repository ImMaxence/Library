# Utiliser l'image officielle Node.js
FROM node:22-alpine

# Ajouter les dépendances nécessaires pour sharp
RUN apk add --no-cache \
  vips-dev \
  fftw-dev \
  libc6-compat \
  bash

# Définir le répertoire de travail
WORKDIR /app

# Copier le package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances avec sharp, incluant les dépendances optionnelles
RUN npm install --build-from-source sharp

# Copier le reste de l'application
COPY . .

# Exposer le port du backend
EXPOSE 8000

# Démarrer l'application
CMD ["npm", "start"]
