import { fetchNotes } from "@/lib/api";
import { Tag } from "@/types/note";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
// import NotesClient from './Notes.client';

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: NotesPageProps) => {
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
