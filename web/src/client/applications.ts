import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { http } from "@/lib/http";
import type { ApplicationDto, NewApplicationRequest, UpdateApplicationRequest } from "@/shared/types/application";

export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const resp = await http.get<ApplicationDto[]>("/api/applications");
      return resp.data;
    },
  });
}

export function useCreateApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: NewApplicationRequest) => {
      const resp = await http.post<ApplicationDto>("/api/applications", payload);
      return resp.data;
    },
    onMutate: async (payload) => {
      const prev = qc.getQueryData<ApplicationDto[]>(["applications"]) || [];
      const temp: ApplicationDto = {
        id: -Date.now(),
        visaCode: payload.visaCode,
        profile: payload.profile,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      qc.setQueryData(["applications"], [temp, ...prev]);
      return { prev } as const;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["applications"] });
      notifications.show({ color: "green", title: "Created", message: "Application created" });
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["applications"], ctx.prev);
      notifications.show({ color: "red", title: "Create failed", message: "Could not create application" });
    },
  });
}

export function useApplication(id: number) {
  return useQuery({
    queryKey: ["applications", id],
    queryFn: async () => {
      const resp = await http.get<ApplicationDto>(`/api/applications/${id}`);
      return resp.data;
    },
    enabled: Number.isFinite(id) && id > 0,
  });
}

export function useUpdateApplication(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateApplicationRequest) => {
      const resp = await http.patch<ApplicationDto>(`/api/applications/${id}`, payload);
      return resp.data;
    },
    onSuccess: (data) => {
      qc.setQueryData(["applications", id], data);
      qc.invalidateQueries({ queryKey: ["applications"] });
      notifications.show({ color: "green", title: "Saved", message: "Application updated" });
    },
    onError: () => {
      notifications.show({ color: "red", title: "Save failed", message: "Could not update application" });
    },
  });
}
