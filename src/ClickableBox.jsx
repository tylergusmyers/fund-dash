import { Link } from "react-router-dom";

export default function ClickableBox({ name }) {
  return (
    <Link to={`/graph/${name}`} className="select-box">
      {name}
    </Link>
  );
}
