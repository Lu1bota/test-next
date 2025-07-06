// components/CategoriesMenu/CategoriesMenu.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CategoryType, getCategories } from "@/lib/api";

const CategoriesMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  // Додаємо стан
  const [categories, setCategories] = useState<CategoryType[]>([]);

  // Додаємо ефект для запиту
  useEffect(() => {
    // Змінюємо стан
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div>
      <button onClick={toggle}>Notes</button>
      {isOpen && (
        <ul>
          <li>
            <Link href={`/notes/filter/all`} onClick={toggle}>
              All notes
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/notes/filter/${category.id}`} onClick={toggle}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesMenu;
