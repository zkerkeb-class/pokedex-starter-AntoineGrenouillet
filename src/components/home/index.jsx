import { useNavigate } from "react-router-dom";
import './index.css';

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button className="home-button" onClick={() => navigate("/")}>
      🏠
    </button>
  );
};

export default HomeButton;
