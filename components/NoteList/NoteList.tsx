"use client";

import { getNotes, NoteListType } from "@/lib/api";
import NoteItem from "../NoteItem/NoteItem";
import { useEffect, useState } from "react";

// type Props = {
//   items: NoteListType;
// };
// { items }: Props

const NoteList = () => {
  const [items, setitems] = useState<NoteListType | null>(null);

  useEffect(() => {
    getNotes().then((data) => setitems(data));
  }, []);

  return (
    <ul>
      {items && items.notes.map((el) => <NoteItem key={el.id} item={el} />)}
    </ul>
  );
};

export default NoteList;
