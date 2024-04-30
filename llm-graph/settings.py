from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )

    # Neo4j
    NEO4J_URL: str
    NEO4J_USERNAME: str
    NEO4J_PASSWORD: str

    # Groq
    GROQ_API_KEY: str
    GROQ_MODEL_ID: str

    # Ollama
    OLLAMA_EMBEDDING_MODEL_ID: str


settings = Settings()
