"use client";

import { useApplication } from "@/client/applications";
import { Tabs, Text, Title } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { z } from "zod";
import DocumentsTab from "./DocumentsTab";
import ProfileTab from "./ProfileTab";

export function ApplicationDetailsClient({ id }: { id: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const { data: app, isLoading } = useApplication(id);

  const TabSchema = z.object({ tab: z.enum(["profile", "documents"]).default("profile") });
  const currentTab = useMemo(() => {
    const parsed = TabSchema.safeParse({ tab: params.get("tab") || undefined });
    return parsed.success ? parsed.data.tab : "profile";
  }, [params]);

  useEffect(() => {
    // ensure tab param exists for shareability
    if (!params.get("tab")) router.replace(`?tab=${currentTab}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !app) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <Title order={2}>Application #{app.id}</Title>
      </div>
      <Tabs value={currentTab} onChange={(v) => router.replace(`?tab=${v}`)}>
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="documents">Documents</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="profile" pt="sm">
          <ProfileTab appId={id} />
        </Tabs.Panel>
        <Tabs.Panel value="documents" pt="sm">
          <DocumentsTab appId={id} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
