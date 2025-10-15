import { fetchNotes } from "@/lib/api";
import { Tag } from "@/types/note";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface generationMetadataProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: generationMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  console.log("slug: ", slug);

  const tag: Tag | string = slug[0];
  return {
    title: `Notes - ${tag === "All" ? "All tags" : tag}`,
    description: `Browse notes tagged with ${
      tag === "All" ? "all tags" : tag
    }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
    openGraph: {
      title: `Notes - ${tag === "All" ? "All tags" : tag}`,
      url: `https://notehub.com/notes/filter/${tag}`,
      description: `Browse notes tagged with ${
        tag === "All" ? "all tags" : tag
      }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes - ${tag === "All" ? "All tags" : tag} | NoteHub`,
        },
      ],
    },
  };
}

const NotesPage = async ({ params }: generationMetadataProps) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const tag = slug[0] === "All" ? undefined : (slug[0] as Tag);

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => {
      if (tag) return fetchNotes();
      else return fetchNotes("", 1, tag);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
