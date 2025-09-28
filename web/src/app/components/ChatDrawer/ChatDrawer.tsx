"use client";

import { ActionIcon, Box, Group, Paper } from "@mantine/core";
import { ChatDrawerInner } from "./ChatDrawerInner";

export function ChatDrawer({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <Paper
      radius={0}
      withBorder
      style={{
        borderLeft: "1px solid var(--mantine-color-default-border)",
        height: "calc(100vh - 56px)",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        background: "var(--mantine-color-body)",
      }}
    >
      <Group align="flex-start" p={6}>
        <ActionIcon
          size="lg"
          variant="light"
          aria-label={open ? "Close assistant" : "Open assistant"}
          onClick={onToggle}
          title={open ? "Close assistant" : "Open assistant"}
        >
          {open ? "❯" : "🤖"}
        </ActionIcon>
      </Group>

      <Box
        style={{
          flex: 1,
          opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(8px)",
          transition: "opacity 200ms ease, transform 200ms ease",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <ChatDrawerInner />
      </Box>
    </Paper>
  );
}
