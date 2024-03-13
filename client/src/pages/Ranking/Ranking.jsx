import Datatable from "../../components/Datatable/Datatable";
import { Layout, Search, SearchFilter } from "../../components";
import styles from "./Ranking.module.css";

const Ranking = () => {
  return (
    <div className={styles["rankingContainer"]}>
      <Layout />
      <div className={styles["rankingSubContainer"]}>
        <h1>Ranking Resumes</h1>
        <SearchFilter />
      </div>
    </div>
  );
};

export default Ranking;
