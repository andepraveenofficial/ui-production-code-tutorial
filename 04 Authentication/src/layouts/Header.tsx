import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth(); // Get the auth state

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>MyApp</div>
      <nav>
        <ul className={styles.navLinks}>
          <li>
            <Link className={styles.navLink} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/contact">
              Contact
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link className={styles.navLink} to="/course">
                  Course
                </Link>
              </li>
              <li>
                <Link className={styles.navLink} to="/support">
                  Support
                </Link>
              </li>
            </>
          )}
          {isLoggedIn ? (
            <li>
              <button className={styles.button} onClick={logout}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <button className={styles.button}>Login</button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
