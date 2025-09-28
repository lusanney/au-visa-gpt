import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { http } from "@/lib/http";
import type { DocumentDto } from "@/shared/types/document";

export function useDocuments(applicationId: number, category?: string) {
  return useQuery({
    queryKey: ["documents", applicationId, category],
    queryFn: async () => {
      const qp = category ? `?category=${encodeURIComponent(category)}` : "";
      const resp = await http.get<DocumentDto[]>(`/api/applications/${applicationId}/documents${qp}`);
      return resp.data;
    },
    enabled: Number.isFinite(applicationId) && applicationId > 0,
  });
}

export function useUploadDocument(applicationId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { file: File; category: string; typeCode?: string; title?: string }) => {
      const form = new FormData();
      form.set("file", payload.file);
      form.set("category", payload.category);
      if (payload.typeCode) form.set("typeCode", payload.typeCode);
      if (payload.title) form.set("title", payload.title);
      const resp = await http.post<DocumentDto>(`/api/applications/${applicationId}/documents`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return resp.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents", applicationId] });
      notifications.show({ color: "green", title: "Uploaded", message: "Document uploaded" });
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.error || "Upload failed";
      notifications.show({ color: "red", title: "Upload failed", message: String(msg) });
    },
  });
}

export function usePdfHead(applicationId: number, documentId: number | null) {
  const query = useQuery({
    queryKey: ["pdf-head", applicationId, documentId],
    enabled: Number.isFinite(applicationId) && applicationId > 0 && documentId != null,
    queryFn: async () => {
      const url = `/api/applications/${applicationId}/documents/${documentId}/pdf`;
      const resp = await http.head(url);
      if (resp.status < 200 || resp.status >= 300) throw new Error("Preview unavailable");
      return true as const;
    },
    retry: 0,
  });
  if (query.isError) {
    // show once per error transition
    notifications.show({ color: "red", title: "Preview failed", message: "Unable to load PDF preview" });
  }
  return query;
}
