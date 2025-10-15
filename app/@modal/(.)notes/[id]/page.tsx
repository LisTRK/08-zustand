import { getNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import NotePreviewClient from "./NotePreview.client";

type generateMetadataProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: generateMetadataProps) {
  const { id } = await params;
  const note = await getNoteById(id);
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://notehub.com/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: "article",
    },
  };
}

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

const NotePreviewPage = async ({ params }: NotePreviewProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
};

export default NotePreviewPage;
