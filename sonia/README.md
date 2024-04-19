# Sonia

## This project use `pnpm` as package manager

```bash
corepack enable pnpm
```

## Install dependencies

```bash
pnpm install
```

## Setup Database

You can edit `.env` file to change the database connection.

### Start local database with docker

```bash
docker compose -f docker-compose.dev.yaml up -d
```

### Generate prisma client

```bash
pnpm db:generate
```

### Create database

```bash
pnpm db:migrate
```

### Seed database with some LLM Api examples

```bash
pnpm db:seed
```

### Use prisma studio to edit LLM Apis and set your api keys

```bash
pnpm db:studio
```