"use client";

import { Anchor, Breadcrumbs, Container } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

function segmentLabel(segment: string) {
  if (!segment) return "";
  if (/^\d+$/.test(segment)) return segment; // numeric id
  const raw = segment.replace(/-/g, " ");
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export function BreadcrumbsBar() {
  const pathname = usePathname();
  const parts = (pathname || "/").split("/").filter(Boolean);

  const items = parts.map((part, idx) => {
    let href = "/" + parts.slice(0, idx + 1).join("/");
    // Special case: documents under applications should point to tabbed details
    if (part === "documents" && parts[0] === "applications" && parts.length >= 3 && idx >= 2) {
      const appId = parts[1];
      href = `/applications/${appId}?tab=documents`;
    }
    const isLast = idx === parts.length - 1;
    const label = segmentLabel(part);
    return isLast ? (
      <Anchor key={href} component={Link} href={href} c="dimmed" underline="never">
        {label}
      </Anchor>
    ) : (
      <Anchor key={href} component={Link} href={href} underline="never">
        {label}
      </Anchor>
    );
  });

  if (items.length === 0) return null;

  return (
    <Container size="lg" py="xs">
      <Breadcrumbs separator="›">{items}</Breadcrumbs>
    </Container>
  );
}
