import { getNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

interface DetailsProps{
    params: Promise<{id:string}>
}

const Details = async ({ params }: DetailsProps) => {
    const { id } = await params;
    
    
    
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => getNoteById(id),
    })
    
    return <HydrationBoundary state={dehydrate(queryClient)}>
    <NoteDetailsClient />
    </HydrationBoundary>
}
export default Details;