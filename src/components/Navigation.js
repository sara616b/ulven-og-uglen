import { Link } from "react-router-dom";

export default function Navigation({ title }) {
  return (
    <div>
      <Link to="/">
        <button>{title}</button>
      </Link>
      <div>
        <Link to="/webshop">
          <button>Webshop</button>
        </Link>
        <Link to="/blog">
          <button>Blog</button>
        </Link>
        <Link to="/about">
          <button>Om Forlaget</button>
        </Link>
        <Link to="/basket">
          <button>Kurv</button>
        </Link>
      </div>
    </div>
  );
}
