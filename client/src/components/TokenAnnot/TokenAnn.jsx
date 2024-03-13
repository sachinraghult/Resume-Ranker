import React from "react";
import { useEffect } from "react";
import { TokenAnnotator } from "react-text-annotate";
import styles from "./TokenAnn.module.css";
const TEXT =
  "Name is XYZ. Studied in fer uf,fuheuhu and fuhiue. Skills are fuhr ufhiue,iurur. 9 Years of Experience. Organizations worked in ABC, DEF ";
const TAG_COLORS = {
  INSTITUTION: "#0000ff",
  NAME: "#00ff00",
  SKILLS: "#00ffff",
  EXPERIENCE: "#ff0000",
  ORGANIZATION: "#ff00ff",
};

const TokenAnn = () => {
  var chars = [];
  var d = [];
  var chars_result = [];
  var tokens_charsplit = [];
  const [tag, setTag] = React.useState("");
  const [value, setValue] = React.useState([]);
  const handleChange = (v) => {
    setValue(v);

    for (var i in v) {
      for (var j in v[i]["tokens"]) {
        d = v[i]["tokens"][j].split("");
        for (var k in d) {
          chars.push(d[k]);
        }
        chars.push(" ");
      }
      tokens_charsplit = [
        ...tokens_charsplit,
        {
          start: TEXT.search(v[i]["tokens"][0]),
          end: TEXT.search(v[i]["tokens"][0]) + chars.length,
          tag: v[i]["tag"],
          tokens: chars,
        },
      ];
      chars = [];
    }
    // for(var i in v)
    // {
    //     tokens_charsplit=[...tokens_charsplit,{"start":v[i]["start"],"end":v[i]["end"],"tag":v[i]["tag"],"tokens":chars_result[i]}];
    // }
    console.log(tokens_charsplit);
  };
  useEffect(() => {
    setTag("NAME");
  }, []);
  return (
    <div className={styles["annotator"]}>
      <h1>Annotator</h1>
      <div className={styles["container"]}>
        <div className={styles["annotator-container"]}>
          <select
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            className={styles["annotator-select"]}
          >
            <option value="NAME">NAME</option>
            <option value="INSTITUTION">INSTITUTION</option>
            <option value="SKILLS">SKILLS</option>
            <option value="EXPERIENCE">EXPERIENCE</option>
            <option value="ORGANIZATION">ORGANIZATION</option>
          </select>
          <TokenAnnotator
            className={styles["TokenAnnotator"]}
            tokens={TEXT.split(" ")}
            value={value}
            onChange={handleChange}
            getSpan={(span) => ({
              ...span,
              tag: tag,
              color: TAG_COLORS[tag],
            })}
          />
        </div>
      </div>
    </div>
  );
};
export default TokenAnn;
