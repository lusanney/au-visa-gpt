"use client";
import { Button, TextInput, Group } from "@mantine/core";
import { useState } from "react";

import { helloApi } from "@/client/hello";
import type { HelloRequest } from "@/shared/types/hello";

export default function Home() {
  const [name, setName] = useState<HelloRequest["name"]>("Van");
  const [msg, setMsg] = useState<string>("");
  return (
    <main style={{ padding: 24 }}>
      <h1>AU Visa GPT</h1>
      <p>Starter app is running.</p>
      <Group gap="sm">
        <TextInput label="Name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        <Button
          onClick={async () => {
            const data = await helloApi({ name });
            setMsg(data.message);
          }}
        >
          Call Python
        </Button>
      </Group>
      {msg && <p style={{ marginTop: 12 }}>Python says: {msg}</p>}
    </main>
  );
}
