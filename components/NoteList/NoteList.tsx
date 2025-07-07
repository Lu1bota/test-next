"use client";

import { getNotes, NoteListType } from "@/lib/api";
import NoteItem from "../NoteItem/NoteItem";
import { useEffect, useState } from "react";

type NoteListProps = {
  categoryId?: string;
  title?: string;
};

const NoteList = ({ categoryId, title }: NoteListProps) => {
  const [items, setItems] = useState<NoteListType | null>(null);

  useEffect(() => {
    getNotes(categoryId, title).then((data) => setItems(data));
  }, [categoryId, title]);

  if (!items) return <div>Loading...</div>;

  return (
    <ul>
      {items && items.notes.map((el) => <NoteItem key={el.id} item={el} />)}
    </ul>
  );
};

export default NoteList;
