# Run RAG locally

## Install Ollama

[https://ollama.com](https://ollama.com)

## Setup PostgreSQL with PgVector in Docker

You can change postgresql environment variables in the `.env` file

```bash
docker compose up -d
```

## Install python dependencies

```bash
pip install -r requirements.txt
```

Also you can use `pipenv`

```bash
pipenv install
```

## Look at the notebook

[Local RAG Notebook](notebook/local-rag.ipynb)