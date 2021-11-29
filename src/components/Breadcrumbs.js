import { Link } from "react-router-dom";

export default function Breadcrumbs({ links }) {
  return (
    <div className="breadcrumbs">
      {links.map((link, index) => {
        return (
          <Link key={link.text + index} to={link.link}>
            {link.text}
          </Link>
        );
      })}
    </div>
  );
}
