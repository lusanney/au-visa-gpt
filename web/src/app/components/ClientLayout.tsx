"use client";

import { Box } from "@mantine/core";
import { useState } from "react";
import { AppHeader } from "./AppHeader";
import { BreadcrumbsBar } from "./BreadcrumbsBar";
import { ChatDrawer } from "./ChatDrawer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
      <AppHeader />
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: chatOpen ? "1fr 420px" : "1fr 40px",
          transition: "grid-template-columns 250ms ease",
        }}
      >
        <Box mt="xs">
          <BreadcrumbsBar />
          {children}
        </Box>

        <ChatDrawer open={chatOpen} onToggle={() => setChatOpen((v) => !v)} />
      </Box>
    </>
  );
}
