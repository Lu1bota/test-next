import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const note = await getSingleNote(id);
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
    twitter: {
      card: "summary_large_image",
      title: `${note.title}`,
      description: note.content.slice(0, 3),
      images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const res = await params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["note", res.id],
    queryFn: () => getSingleNote(res.id),
  });

  return (
    <div>
      <h1>NoteDetails</h1>
      <br />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </div>
  );
};

export default NoteDetails;
