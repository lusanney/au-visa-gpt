"use client";

import { useDocuments, usePdfHead } from "@/client/documents";
import type { DocumentDto } from "@/shared/types/document";
import { Accordion, Badge, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function DocumentsTab({ appId }: { appId: number }) {
  const [previewId, setPreviewId] = useState<number | null>(null);
  const previewQuery = usePdfHead(appId, previewId);
  const router = useRouter();

  const categories = [
    { value: "identity", label: "Identity" },
    { value: "financial", label: "Financial" },
    { value: "employment", label: "Employment" },
    { value: "form", label: "Form" },
    { value: "police", label: "Police" },
    { value: "education", label: "Education" },
    { value: "residential", label: "Residential" },
    { value: "health", label: "Health" },
    { value: "other", label: "Other" },
    { value: "unclassified", label: "Unclassified" },
  ];
  const { data: allDocs = [], isLoading, isError } = useDocuments(appId);
  const total = allDocs.length;
  const counts = categories.reduce<Record<string, number>>((acc, c) => {
    acc[c.value] = allDocs.filter((d) => d.category === c.value).length;
    return acc;
  }, {});

  useEffect(() => {
    if (isError) notifications.show({ color: "red", title: "Load failed", message: "Unable to load documents" });
  }, [isError]);

  if (isLoading) return <Text>Loading documents…</Text>;

  if (total === 0)
    return (
      <Stack>
        <Text c="dimmed">No documents uploaded yet.</Text>
      </Stack>
    );
  return (
    <Stack>
      <Group justify="space-between">
        <Text>
          Total documents: <b>{total}</b>
        </Text>
      </Group>
      <Accordion multiple>
        {categories.map((c) => (
          <Accordion.Item key={c.value} value={c.value}>
            <Accordion.Control>
              <Group justify="space-between" w="100%">
                <Text>{c.label}</Text>
                <Badge variant="light">{counts[c.value] || 0}</Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <CategoryDocuments docs={allDocs.filter((d) => d.category === c.value)} onOpenPreview={setPreviewId} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      <Group justify="flex-end" mt="sm">
        <Button variant="light" onClick={() => router.push(`/applications/${appId}/documents/upload`)}>
          Upload documents
        </Button>
      </Group>
      <Modal opened={previewId != null} onClose={() => setPreviewId(null)} title="Preview" size="60rem">
        {previewId != null ? (
          previewQuery.isLoading ? (
            <Text>Loading PDF preview…</Text>
          ) : previewQuery.data ? (
            <iframe
              src={`/api/applications/${appId}/documents/${previewId}/pdf`}
              style={{ width: "100%", height: "80vh", border: 0 }}
              title="PDF Preview"
            />
          ) : (
            <Stack>
              <Text c="red">Unable to render preview.</Text>
              <Button component="a" href={`/api/applications/${appId}/documents/${previewId}/pdf`} target="_blank">
                Open PDF in new tab
              </Button>
            </Stack>
          )
        ) : null}
      </Modal>
    </Stack>
  );
}

function CategoryDocuments({ docs, onOpenPreview }: { docs: DocumentDto[]; onOpenPreview: (id: number) => void }) {
  if (docs.length === 0) return <Text c="dimmed">No documents</Text>;
  return (
    <Stack>
      {docs.map((d) => (
        <Group key={d.id} justify="space-between">
          <Stack gap={0} style={{ flex: 1 }}>
            <Text>{d.title || d.originalFilename}</Text>
            <Text c="dimmed" size="xs">
              {(d.byteSize / (1024 * 1024)).toFixed(2)} MB · Uploaded {new Date(d.createdAt).toLocaleString()}
            </Text>
          </Stack>
          <Badge variant="filled" color={statusColor(d.status)}>
            {statusLabel(d.status)}
          </Badge>
          <Group>
            <Button size="xs" variant="light" onClick={() => onOpenPreview(d.id)}>
              Preview
            </Button>
          </Group>
        </Group>
      ))}
    </Stack>
  );
}

function statusLabel(status: string): string {
  switch (status) {
    case "uploaded":
      return "Received";
    case "pending":
      return "Pending";
    case "running":
      return "Processing";
    case "completed":
      return "Processed";
    case "failed":
      return "Failed";
    default:
      return status;
  }
}

function statusColor(status: string): string {
  switch (status) {
    case "uploaded":
      return "gray";
    case "pending":
      return "yellow";
    case "running":
      return "blue";
    case "completed":
      return "green";
    case "failed":
      return "red";
    default:
      return "gray";
  }
}

export default DocumentsTab;
