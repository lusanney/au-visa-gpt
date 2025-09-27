# au-visa-gpt
GPT app for assistance in australian visa application

## Quick start (local)

1. Copy env file
```
cp .env.example .env
```

2. Start infra (Postgres + Qdrant)
```
podman compose up -d
# or: docker compose up -d
```

3. Run web app
```
cd web
pnpm install
pnpm dev
# open http://localhost:3000
```

4. OCR stub (optional)
```
python scripts/ocr.py --file /path/to/file.pdf
```
