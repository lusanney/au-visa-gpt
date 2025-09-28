import { Container } from "@mantine/core";
import { notFound } from "next/navigation";

import { ApplicationDetailsClient } from "./DetailsClient";

type Props = { params: { id: string } };

export default async function ApplicationDetailsPage({ params }: Props) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return notFound();

  return (
    <Container size="lg" py="md">
      <ApplicationDetailsClient id={id} />
    </Container>
  );
}
