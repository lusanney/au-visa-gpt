"use client";

import { countryOptions } from "@/shared/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Group, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateApplication } from "@/client/applications";
import { ApplicationProfileSchema, NewApplicationRequestSchema } from "@/shared/types/application";

const FormSchema = NewApplicationRequestSchema.extend({
  profile: ApplicationProfileSchema,
});

type FormValues = z.infer<typeof FormSchema>;

const visaOptions = [
  { value: "191", label: "191 - Permanent Residence (Skilled Regional)" },
  { value: "190", label: "190 - Skilled Nominated" },
  { value: "189", label: "189 - Skilled Independent" },
];

export default function NewApplicationPage() {
  const router = useRouter();
  const createApp = useCreateApplication();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      visaCode: "191",
      profile: { fullName: "", email: "", nationality: "", dateOfBirth: "" },
    },
  });

  const onSubmit = form.handleSubmit(async (values: FormValues) => {
    await createApp.mutateAsync(values);
    router.push("/applications");
  });

  return (
    <Container size="sm" py="md">
      <Title order={2} mb="sm">
        New application
      </Title>
      <Box component="form" onSubmit={onSubmit}>
        <Stack gap="sm">
          <Select
            label="Visa code"
            data={visaOptions}
            value={form.watch("visaCode")}
            onChange={(v) => form.setValue("visaCode", v || "")}
            error={form.formState.errors.visaCode?.message}
          />
          <Text fw={600}>Applicant</Text>
          <TextInput
            label="Full name"
            {...form.register("profile.fullName")}
            error={form.formState.errors.profile?.fullName?.message}
          />
          <TextInput
            label="Email"
            {...form.register("profile.email")}
            error={form.formState.errors.profile?.email?.message}
          />
          <Select
            label="Nationality"
            data={countryOptions}
            value={form.watch("profile.nationality")}
            onChange={(v) => form.setValue("profile.nationality", v || "")}
            searchable
            error={form.formState.errors.profile?.nationality?.message}
          />
          <DateInput
            label="Date of birth"
            placeholder="DD MMM YYYY"
            value={form.watch("profile.dateOfBirth") ? new Date(form.watch("profile.dateOfBirth")) : null}
            onChange={(d: any) => {
              const date = d ? new Date(d) : null;
              form.setValue("profile.dateOfBirth", date ? date.toISOString() : "");
            }}
            valueFormat="DD MMM YYYY"
            error={form.formState.errors.profile?.dateOfBirth?.message}
          />

          <Group justify="flex-end" mt="sm">
            <Button type="submit" loading={createApp.isPending}>
              Create application
            </Button>
          </Group>
        </Stack>
      </Box>
    </Container>
  );
}
