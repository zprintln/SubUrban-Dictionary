import { useParams } from "react-router-dom";

const DetailsScreen = () => {
  const { id } = useParams();
  return <div>Details for "{id}"</div>;
};

export default DetailsScreen;
