"use client";

import { useApplication, useUpdateApplication } from "@/client/applications";
import { countryOptions } from "@/shared/countries";
import { ApplicationProfileSchema } from "@/shared/types/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function ProfileTab({ appId }: { appId: number }) {
  const { data: app, isLoading } = useApplication(appId);
  const update = useUpdateApplication(appId);
  const [editing, setEditing] = useState(false);

  const FormSchema = ApplicationProfileSchema;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: app?.profile ?? { fullName: "", email: "", nationality: "", dateOfBirth: "", phone: "" },
  });

  if (isLoading || !app) return <Text>Loading...</Text>;

  return editing ? (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        await update.mutateAsync({ profile: values });
        setEditing(false);
      })}
    >
      <Stack gap="xs">
        <TextInput label="Full name" {...form.register("fullName")} error={form.formState.errors.fullName?.message} />
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
  );
}

export default ProfileTab;
