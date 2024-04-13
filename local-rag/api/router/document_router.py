from fastapi import APIRouter, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from api.service.document_service import DocumentServiceFactory
from pydantic import BaseModel, Field

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
    try:
        result = await document_service.store_document(file)

        return StoreDocumentResponse(
            chunks_ids=result,
            number_of_chunks=len(result),
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class StoreDocumentFromUrlBody(BaseModel):
    url: str


@router.post("/url")
async def store_document_from_url(
    body: StoreDocumentFromUrlBody,
    document_service: DocumentServiceFactory,
) -> StoreDocumentResponse:
    """Create document from a web page and store it in the vector database."""
    try:
        result = await document_service.store_document_from_url(body.url)

        return StoreDocumentResponse(
            chunks_ids=result,
            number_of_chunks=len(result),
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/ids")
async def get_documents_ids(
    document_service: DocumentServiceFactory,
) -> list[str]:
    """Get all documents ids."""
    try:
        result = await document_service.get_documents_ids()

        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class DocumentChunk(BaseModel):
    page_content: str
    metadata: dict = Field(default_factory=dict)


class DocumentsIdsBody(BaseModel):
    document_ids: list[str]


@router.post("/ids")
async def get_documents_by_ids(
    body: DocumentsIdsBody,
    document_service: DocumentServiceFactory,
) -> list[DocumentChunk]:
    """Get documents by ids."""
    try:
        result = await document_service.get_documents_by_ids(body.document_ids)

        return [
            DocumentChunk(page_content=doc.page_content, metadata=doc.metadata)
            for doc in result
        ]
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class GenericResponse(BaseModel):
    message: str


@router.delete("/ids")
async def delete_documents_by_ids(
    body: DocumentsIdsBody,
    document_service: DocumentServiceFactory,
) -> GenericResponse:
    """Delete documents by ids."""
    try:
        await document_service.delete_documents(body.document_ids)

        return GenericResponse(message="Documents deleted")
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
