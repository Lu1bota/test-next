"use client";

import { useRouter } from "next/navigation";
import { CategoryType, createNote, NewNoteData } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type Props = {
  categories: CategoryType[];
};

const NoteForm = ({ categories }: Props) => {
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push("/notes/filter/all");
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
  const router = useRouter();

  const handleCancel = () => router.push("/notes/filter/all");

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNoteData;
    mutate(values);
  };

  return (
    <form action={handleSubmit}>
      <label>
        Title
        <input type="text" name="title" />
      </label>

      <label>
        Content
        <textarea name="content"></textarea>
      </label>

      <label>
        Category
        <select name="category">
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
