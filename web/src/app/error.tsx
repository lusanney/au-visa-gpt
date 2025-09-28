"use client";

import { Button, Paper, Stack, Text, Title } from "@mantine/core";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Stack align="center" justify="center" mih="50vh" p="lg">
      <Paper withBorder p="lg" radius="md" maw={640} w="100%" style={{ background: "var(--surface)" }}>
        <Stack gap="sm">
          <Title order={3}>Something went wrong</Title>
          <Text c="dimmed" size="sm">
            {error.message}
          </Text>
          <Button onClick={() => reset()} variant="filled" color="brand" w="fit-content">
            Try again
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
