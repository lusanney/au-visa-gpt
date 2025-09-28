import { Loader, Stack, Text } from "@mantine/core";

export default function Loading() {
  return (
    <Stack align="center" justify="center" mih="50vh" p="lg" style={{ background: "var(--background)" }}>
      <Loader color="brand" />
      <Text c="dimmed">Loading…</Text>
    </Stack>
  );
}
