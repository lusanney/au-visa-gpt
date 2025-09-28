"use client";

import { useApplication, useUpdateApplication } from "@/client/applications";
import { countryOptions } from "@/shared/countries";
import { ApplicationProfileSchema } from "@/shared/types/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Select, Stack, Tabs, Text, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function ApplicationDetailsClient({ id }: { id: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const { data: app, isLoading } = useApplication(id);
  const update = useUpdateApplication(id);
  const [editing, setEditing] = useState(false);

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

  const FormSchema = ApplicationProfileSchema;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: app?.profile ?? { fullName: "", email: "", nationality: "", dateOfBirth: "", phone: "" },
  });
  if (isLoading || !app) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <Group justify="space-between" align="center" mb="sm">
        <Title order={2}>Application #{app.id}</Title>
      </Group>
      <Tabs value={currentTab} onChange={(v) => router.replace(`?tab=${v}`)}>
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="documents">Documents</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="profile" pt="sm">
          {editing ? (
            <form
              onSubmit={form.handleSubmit(async (values) => {
                await update.mutateAsync({ profile: values });
                setEditing(false);
              })}
            >
              <Stack gap="xs">
                <TextInput
                  label="Full name"
                  {...form.register("fullName")}
                  error={form.formState.errors.fullName?.message}
                />
                <TextInput label="Email" {...form.register("email")} error={form.formState.errors.email?.message} />
                <Select
                  label="Nationality"
                  data={countryOptions}
                  value={form.watch("nationality")}
                  onChange={(v) => form.setValue("nationality", v || "")}
                  searchable
                  error={form.formState.errors.nationality?.message}
                />
                <DateInput
                  label="Date of birth"
                  placeholder="DD MMM YYYY"
                  value={form.watch("dateOfBirth") ? new Date(form.watch("dateOfBirth")) : null}
                  onChange={(d: any) => {
                    const date = d ? new Date(d) : null;
                    form.setValue("dateOfBirth", date ? date.toISOString() : "");
                  }}
                  valueFormat="DD MMM YYYY"
                  error={form.formState.errors.dateOfBirth?.message}
                />
                <Group justify="flex-end" mt="sm">
                  <Button variant="default" onClick={() => setEditing(false)} type="button">
                    Cancel
                  </Button>
                  <Button type="submit" loading={update.isPending}>
                    Save
                  </Button>
                </Group>
              </Stack>
            </form>
          ) : (
            <Stack gap="xs">
              <Text>
                <b>Visa:</b> {app.visaCode}
              </Text>
              <Text>
                <b>Created:</b> {new Date(app.createdAt).toLocaleString()}
              </Text>
              <Text>
                <b>Profile:</b> {JSON.stringify(app.profile)}
              </Text>
              <Group justify="flex-end">
                <Button variant="light" onClick={() => setEditing(true)}>
                  Edit profile
                </Button>
              </Group>
            </Stack>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="documents" pt="sm">
          <Stack gap="xs">
            <Text>Documents will appear here.</Text>
            <Button variant="light" onClick={() => router.push(`/applications/${id}/documents/upload`)}>
              Upload documents
            </Button>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
