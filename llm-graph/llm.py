from settings import settings
from langchain_groq.chat_models import ChatGroq
from langchain_community.embeddings import OllamaEmbeddings

llm = ChatGroq(
    api_key=settings.GROQ_API_KEY,
    model=settings.GROQ_MODEL_ID,
)

embeddings = OllamaEmbeddings(
    model=settings.OLLAMA_EMBEDDING_MODEL_ID,
)
