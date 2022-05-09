#!/bin/bash
echo "Iniciando instalação..."
echo ""

echo "Iniciando Back End"
cd back-app
docker-compose up -d

echo "Backend executando em: http://localhost:6868/"

echo "Iniciando Front End"
echo ""

cd ..
cd "front-app"
npm install
npm run serve

echo "Frontend executando em: http://localhost:8080/"
echo ""
echo ""

