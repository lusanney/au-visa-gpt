#!/usr/bin/env python3
import argparse
import json
import os
import sys

try:
    from PyPDF2 import PdfReader  # type: ignore
except Exception:  # pragma: no cover
    PdfReader = None  # type: ignore


def extract_text_layer(path: str) -> str:
    if PdfReader is None:
        return ""
    try:
        reader = PdfReader(path)
        texts = []
        for page in reader.pages:
            try:
                texts.append(page.extract_text() or "")
            except Exception:
                texts.append("")
        return "\n".join(t for t in texts if t)
    except Exception:
        return ""


def main() -> int:
    parser = argparse.ArgumentParser(description="OCR stub: extract text or fallback")
    parser.add_argument("--file", required=True, dest="file_path")
    args = parser.parse_args()

    file_path = args.file_path
    result = {"pages": [], "text": "", "issues": []}

    if not os.path.exists(file_path):
        result["issues"].append("file_not_found")
        print(json.dumps(result))
        return 1

    text = ""
    if file_path.lower().endswith(".pdf"):
        text = extract_text_layer(file_path)
        if not text:
            result["issues"].append("no_text_layer_or_extraction_failed")
            # Note: Tesseract fallback not implemented in stub
    else:
        result["issues"].append("unsupported_format")

    result["text"] = text if text else "[stub]"
    print(json.dumps(result))
    return 0


if __name__ == "__main__":
    sys.exit(main())
