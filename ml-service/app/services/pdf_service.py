from io import BytesIO
import pdfplumber


def extract_text_from_pdf_bytes(file_bytes: bytes):
    """
    Extract selectable text from a PDF file.
    This works for normal PDFs, not scanned image-only PDFs.
    """

    if not file_bytes:
        raise ValueError("Empty PDF file")

    extracted_pages = []

    with pdfplumber.open(BytesIO(file_bytes)) as pdf:
        page_count = len(pdf.pages)

        for page_number, page in enumerate(pdf.pages, start=1):
            page_text = page.extract_text()

            if page_text and page_text.strip():
                extracted_pages.append(
                    f"--- Page {page_number} ---\n{page_text.strip()}"
                )

    full_text = "\n\n".join(extracted_pages).strip()

    return full_text, page_count