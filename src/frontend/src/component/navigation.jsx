import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <div>
      ini navigasi
      <div>
        <Link to="/about">home</Link>
      </div>
      <div>
        <Link to="/about">about</Link>
      </div>
    </div>
  );
};

export default Navigation;
