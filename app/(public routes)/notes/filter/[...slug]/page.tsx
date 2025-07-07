import NoteList from "@/components/NoteList/NoteList";
import SearchBar from "@/components/SearchBar/SearchBar";
// import { getNotes } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesPageWithFilters = async ({ params }: Props) => {
  const { slug } = (await params) || [];
  const category = slug[0] || "";
  const title = slug[1] || "";
  // const queryParams = category === "all" ? "" : category;

  // const notes = await getNotes(queryParams, title);

  return (
    <div>
      <h1>Notes</h1>
      <br />
      <SearchBar categoryId={category} titleValue={title} />
      <br />
      <br />
      <NoteList
        categoryId={category === "all" ? undefined : category}
        title={title}
      />
    </div>
  );
};

export default NotesPageWithFilters;
