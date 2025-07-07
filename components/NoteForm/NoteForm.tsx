"use client";

import { useRouter } from "next/navigation";
import {
  CategoryType,
  createNote,
  getCategories,
  NewNoteData,
} from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useEffect, useState } from "react";

// type Props = {
//   categories: CategoryType[];
// };

// { categories }: Props

const NoteForm = () => {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  }

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNoteData;
    mutate(values);
  };

  const handleCancel = () => router.push("/notes/filter/all");

  return (
    <form action={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          name="title"
          defaultValue={draft.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Content
        <textarea
          name="content"
          defaultValue={draft.content}
          onChange={handleChange}
        ></textarea>
      </label>

      <label>
        Category
        <select
          name="categoryId"
          defaultValue={draft.categoryId}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
