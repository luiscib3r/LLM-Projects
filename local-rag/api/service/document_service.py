from typing import Annotated
from fastapi import Depends, UploadFile

from langchain_core.vectorstores import VectorStore
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders.url_selenium import SeleniumURLLoader


from api.rag.vectordb import VectorDbFactory
from api.service.exceptions import DocumentTypeNotSupported
from api.tools.pdf_loader import PDFLoader
from api.tools.text_loader import TextLoader


class DocumentService:
    def __init__(self, vectordb: VectorStore):
        self.vectordb = vectordb
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, chunk_overlap=80
        )

    async def store_document(self, file: UploadFile):
        loader = await self._get_document_loader(file)
        documents = await loader.aload()
        texts = self.splitter.split_documents(documents)
        result = await self.vectordb.aadd_documents(texts)

        return result

    async def _get_document_loader(self, file: UploadFile):
        if file.content_type == "application/pdf":
            return PDFLoader(await file.read())
        elif (
            file.content_type == "text/plain"
            or file.content_type == "text/markdown"
            or file.content_type == "text/csv"
            or file.content_type == "text/html"
            or file.content_type == "application/json"
            or file.content_type == "application/xml"
        ):
            return TextLoader(await file.read())
        else:
            raise DocumentTypeNotSupported(file.content_type)

    async def store_document_from_url(self, url: str):
        loader = SeleniumURLLoader(urls=[url])
        documents = await loader.aload()
        texts = self.splitter.split_documents(documents)
        result = await self.vectordb.aadd_documents(texts)
        return result


def _document_service_factory(
    vectordb: VectorDbFactory,
):
    return DocumentService(vectordb)


DocumentServiceFactory = Annotated[DocumentService, Depends(_document_service_factory)]
