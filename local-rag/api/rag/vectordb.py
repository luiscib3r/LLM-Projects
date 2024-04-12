from typing import Annotated
from fastapi import Depends
from langchain.vectorstores.pgvector import PGVector
from langchain_core.vectorstores import VectorStore
from api.settings import settings
from api.rag.embedding import EmbeddingFactory


def _vector_db_factory(
    embedding: EmbeddingFactory,
) -> VectorStore:
    return PGVector(
        embedding_function=embedding,
        connection_string=settings.database_uri(),
    )


VectorDbFactory = Annotated[VectorStore, Depends(_vector_db_factory)]
