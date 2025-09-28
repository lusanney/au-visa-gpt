import { Paper, Stack, Text, Title } from "@mantine/core";

export default function NotFound() {
  return (
    <Stack align="center" justify="center" mih="50vh" p="lg" style={{ background: "var(--background)" }}>
      <Paper withBorder p="lg" radius="md" maw={640} w="100%" style={{ background: "var(--surface)" }}>
        <Stack gap="sm">
          <Title order={3}>404</Title>
          <Text c="dimmed">This page could not be found.</Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
