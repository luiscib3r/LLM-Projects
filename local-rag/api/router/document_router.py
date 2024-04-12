from fastapi import APIRouter, UploadFile, File
from api.service.document_service import DocumentServiceFactory
from pydantic import BaseModel

router = APIRouter(
    prefix="/document",
    tags=["Documents"],
)


class StoreDocumentResponse(BaseModel):
    chunks_ids: list[str]
    number_of_chunks: int


@router.post("")
async def store_document(
    file: UploadFile,
    document_service: DocumentServiceFactory,
) -> StoreDocumentResponse:
    """Store a document in the vector database."""
    result = await document_service.store_document(file)

    return StoreDocumentResponse(
        chunks_ids=result,
        number_of_chunks=len(result),
    )


class StoreDocumentFromUrlBody(BaseModel):
    url: str


@router.post("/url")
async def store_document_from_url(
    body: StoreDocumentFromUrlBody,
    document_service: DocumentServiceFactory,
) -> StoreDocumentResponse:
    """Create document from a web page and store it in the vector database."""
    print(body.url)

    result = await document_service.store_document_from_url(body.url)

    return StoreDocumentResponse(
        chunks_ids=result,
        number_of_chunks=len(result),
    )
