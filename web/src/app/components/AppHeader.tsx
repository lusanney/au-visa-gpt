"use client";

import { Box, Button, Container, Group, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Button
      component={Link}
      href={href}
      variant={isActive ? "filled" : "subtle"}
      size="sm"
      color={isActive ? "" : "slate"}
    >
      {label}
    </Button>
  );
};

export function AppHeader() {
  return (
    <Box component="header" style={{ borderBottom: "1px solid var(--mantine-color-default-border)" }}>
      <Container size="lg" py="sm">
        <Group justify="space-between" align="center">
          <Group gap="sm" align="center">
            <Text fw={700}>AU Visa GPT</Text>
          </Group>
          <Group gap="xs">
            <NavLink href="/applications" label="Applications" />
            <NavLink href="/settings" label="Settings" />
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
