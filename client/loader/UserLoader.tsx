import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserLoader = () => {
  return (
    <div>
      <Skeleton height={38} />
      <Skeleton height={38} />
      <Skeleton height={38} />
      <Skeleton height={38} />
    </div>
  );
};

export default UserLoader;
