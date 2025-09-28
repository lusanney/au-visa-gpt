"use client";

import { Anchor, Button, Card, Container, Group, Stack, Table, Text, Title } from "@mantine/core";
import Link from "next/link";

import { useApplications } from "@/client/applications";

export default function ApplicationsPage() {
  const { data, isLoading } = useApplications();
  return (
    <Container size="lg" py="md">
      <Group justify="space-between" align="center" mb="sm">
        <Title order={2}>Applications</Title>
        <Button component={Link} href="/applications/new">
          New application
        </Button>
      </Group>

      <Card withBorder>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : !data || data.length === 0 ? (
          <Stack gap="xs">
            <Text>No applications yet.</Text>
            <Button component={Link} href="/applications/new" variant="light" size="sm">
              Create your first application
            </Button>
          </Stack>
        ) : (
          <Table highlightOnHover withRowBorders={false} stickyHeader>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Visa</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((app) => (
                <Table.Tr key={app.id}>
                  <Table.Td>
                    <Anchor component={Link} href={`/applications/${app.id}`}>
                      {app.id}
                    </Anchor>
                  </Table.Td>
                  <Table.Td>{app.visaCode}</Table.Td>
                  <Table.Td>{new Date(app.createdAt).toLocaleString()}</Table.Td>
                  <Table.Td style={{ textAlign: "right" }}>
                    <Button component={Link} href={`/applications/${app.id}`} size="xs" variant="light" color="slate">
                      Manage
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
}
