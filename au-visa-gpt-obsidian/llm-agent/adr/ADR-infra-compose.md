---
id: ADR-20250927-infra-compose
tags: [adr]
status: accepted
---
# Infra: Podman + Docker Compose (no Kubernetes)

TL;DR:
- Single VM (local machine now), Podman/Compose, reverse proxy later; no K8s.

Context:
- Solo project, handful of containers, want simplicity and low cost.

Options:
- Compose (chosen)
- ECS/Fargate
- Kubernetes

Decision:
- Compose + named volumes; keep ports local; backups via scripts.

Consequences:
- Minimal ops; easy to move to VM or managed DB later.

Links: [[llm-agent/README]], [[now]]

