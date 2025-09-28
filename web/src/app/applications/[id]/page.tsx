import { Container } from "@mantine/core";
import { notFound } from "next/navigation";

import { ApplicationDetailsClient } from "./DetailsClient";

type Props = { params: Promise<{ id: string }> };

export default async function ApplicationDetailsPage({ params }: Props) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (Number.isNaN(id)) return notFound();

  return (
    <Container size="lg" py="md">
      <ApplicationDetailsClient id={id} />
    </Container>
  );
}
