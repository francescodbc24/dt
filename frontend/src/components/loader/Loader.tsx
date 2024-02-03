import { FunctionComponent } from "react";
import GridLoader from "react-spinners/GridLoader";
import "./styles.scss";
interface LoaderProps {
  loading: boolean;
}

const Loader: FunctionComponent<LoaderProps> = ({ loading }) => {
  return loading ? (
    <div className="back-drop">
      <div className="back-drop-container">
        <GridLoader size={50} color={"blue"}></GridLoader>
      </div>
    </div>
  ) : null;
};

export default Loader;
