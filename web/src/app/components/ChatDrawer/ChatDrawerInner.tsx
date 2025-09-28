"use client";

import { Box, Button, Group, ScrollArea, Stack, Text, Textarea } from "@mantine/core";
import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export function ChatDrawerInner() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! Ask me anything about visas or your application." },
  ]);
  const [input, setInput] = useState("");

  const onSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
  };

  return (
    <Stack gap="sm" style={{ height: "100%" }}>
      <ScrollArea style={{ flex: 1 }} offsetScrollbars>
        <Stack gap="xs" p="xs">
          {messages.map((m, i) => (
            <Box
              key={i}
              p="sm"
              style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? "var(--mantine-color-brand-1)" : "var(--mantine-color-default)",
                borderRadius: 10,
                maxWidth: 520,
              }}
            >
              <Text size="sm">{m.content}</Text>
            </Box>
          ))}
        </Stack>
      </ScrollArea>
      <Group align="end" p="xs">
        <Textarea
          autosize
          minRows={2}
          maxRows={6}
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          w="100%"
          style={{ flex: 1 }}
          styles={{ input: { background: "var(--background)" } }}
        />
        <Button onClick={onSend}>Send</Button>
      </Group>
    </Stack>
  );
}
