# KM Care — Controle de Manutenção Veicular

App para acompanhar manutenções de veículos (troca de óleo, revisões, pneus)
com alertas por quilometragem e data, evitando esquecimentos de manutenções
importantes.

## Stack

- **Mobile**: React Native (Expo) + TypeScript
- **Validação de formulários**: React Hook Form + Zod
- **Backend**: NestJS + TypeScript
- **Banco de dados**: PostgreSQL (via Docker)

## Estrutura do projeto
```text
kmcare/
├── mobile/ # App React Native (Expo)
│   ├── src/
│   │   ├── screens/
│   │   │   ├── Login/
│   │   │   ├── VehicleList/
│   │   │   ├── VehicleForm/
│   │   │   ├── VehicleDetail/
│   │   │   └── MaintenanceForm/
│   │   ├── navigation/
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── backend/ # API NestJS (ainda não iniciado)
├── docker-compose.yml
└── README.md
```

## Como rodar localmente

### Pré-requisitos
- Node.js 20+
- Docker Desktop
- App Expo Go instalado no celular (Android ou iOS)

### Banco de dados
```bash
docker compose up -d
```
> **Nota**: o PostgreSQL roda na porta `5433` (não a `5432` padrão), configurado
> assim no `docker-compose.yml` para evitar conflito com instalações locais de
> Postgres. Use essa porta em qualquer cliente (DBeaver, psql, etc).

### Mobile
```bash
cd mobile
npm install
npx expo start
```
Escaneie o QR code com o app Expo Go no celular.

## Status do projeto

**Concluído:**
- [x] App mobile com 5 telas (Login, Lista de Veículos, Cadastro de Veículo,
      Detalhes do Veículo, Registro de Manutenção)
- [x] Validação de formulários com feedback de erro
- [x] Navegação entre telas
- [x] Ambiente de banco de dados via Docker

**Em andamento:**
- [ ] Backend (NestJS + PostgreSQL)
- [ ] Autenticação real (login mockado no momento)
- [ ] Conexão do app mobile com a API real (dados mockados no momento)

**Planejado:**
- [ ] Testes automatizados
- [ ] Deploy do backend
- [ ] Publicação do app (build via EAS)

🚧 Em desenvolvimento