"use client";

import { Button, Container, FileButton, Group, Select, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

import { useUploadDocument } from "@/client/documents";

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

export default function UploadDocumentPage() {
  const params = useParams<{ id: string }>();
  const applicationId = Number(params.id);
  const router = useRouter();
  const [category, setCategory] = useState<string>("unclassified");
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const upload = useUploadDocument(applicationId);

  const disabled = useMemo(() => !file || upload.isPending, [file, upload.isPending]);

  return (
    <Container size="lg" py="md">
      <Stack>
        <Title order={3}>Upload PDF</Title>
        <Text c="dimmed">PDF only. Max size per env configuration.</Text>
        <Group>
          <Select
            data={categories}
            label="Category"
            value={category}
            onChange={(v) => setCategory(v || "unclassified")}
          />
        </Group>
        <Group>
          <FileButton
            resetRef={resetRef}
            onChange={(f) => {
              if (f && f.type !== "application/pdf") {
                notifications.show({ color: "red", title: "Invalid file", message: "Only PDF allowed" });
                return;
              }
              setFile(f);
            }}
            accept="application/pdf"
          >
            {(props) => <Button {...props}>Choose PDF</Button>}
          </FileButton>
          {file ? <Text>{file.name}</Text> : <Text c="dimmed">No file selected</Text>}
        </Group>
        <Group justify="flex-end">
          <Button
            disabled={disabled}
            loading={upload.isPending}
            onClick={async () => {
              if (!file) return;
              try {
                await upload.mutateAsync({ file, category });
                router.push(`/applications/${applicationId}?tab=documents`);
              } catch {}
            }}
          >
            Upload
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
