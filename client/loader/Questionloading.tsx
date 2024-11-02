import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Questionloading = () => {
  return (
    <div style={{ marginTop: "15px", marginBottom: "25px" }}>
      <div>
        <Skeleton height={38} />
        <Skeleton
          height={22}
          style={{ marginTop: "10px", marginBottom: "2px" }}
        />
        <Skeleton height={75} style={{ marginBottom: "5px" }} />
        <Skeleton height={25} />
      </div>
    </div>
  );
};

export default Questionloading;
