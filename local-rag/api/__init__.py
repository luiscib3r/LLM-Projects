from api.settings import settings
from api.router import document_router
from fastapi import FastAPI

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(document_router)
