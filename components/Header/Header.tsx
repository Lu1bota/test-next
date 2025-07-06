import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";

const Header = async () => {
  // const categories = await getCategories();

  return (
    <header className={css.header}>
      <nav>
        <ul className={css.navList}>
          <li>
            <Link href="/">Note Hub</Link>
          </li>
          <li>
            <CategoriesMenu />
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
