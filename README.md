# KM Care — Controle de Manutenção Veicular

App para acompanhar manutenções de veículos (troca de óleo, revisões, pneus)
com alertas por quilometragem e data, evitando esquecimentos de manutenções
importantes.

## Stack

- **Mobile**: React Native (Expo) + TypeScript
- **Backend**: NestJS + TypeScript
- **Banco de dados**: PostgreSQL (via Docker)

## Estrutura do projeto
kmcare/
├── mobile/ # App React Native (Expo)
├── backend/ # API NestJS
└── docker-compose.yml

## Como rodar localmente

### Pré-requisitos
- Node.js 20+
- Docker Desktop

### Banco de dados
\`\`\`bash
docker compose up -d
\`\`\`

### Mobile
\`\`\`bash
cd mobile
npm install
npx expo start
\`\`\`
Escaneie o QR code com o app Expo Go no celular.

## Status do projeto
🚧 Em desenvolvimento