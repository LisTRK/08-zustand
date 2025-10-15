import { getNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface DetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: DetailsProps): Promise<Metadata> {
  const { id } = await params;
  const { title, content } = await getNoteById(id);
  return {
    title: `Note: ${title}`,
    description: `${content.slice(0, 30)} ...`,

    openGraph: {
      title: `Note: ${title}`,
      description: `${content.slice(0, 30)} ...`,
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

const Details = async ({ params }: DetailsProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};
export default Details;
