import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import styles from "./Profile.module.css";
import axios from "axios";

import { SERVER_URL } from "../../config";

export default function User() {
  const folder = `https://lh3.googleusercontent.com/d/`;

  const { user, authToken } = useContext(Context);
  const [edit, setEdit] = useState(true);
  const [name, setName] = useState(user ? user.profile.name : "");
  const [phone, setPhone] = useState(
    user ? (user.profile.phone ? user.profile.phone : "") : ""
  );
  const [email, setEmail] = useState(user ? user.email : "");
  const [location, setLocation] = useState(
    user ? (user.profile.location ? user.profile.location : "") : ""
  );
  const [linkedinId, setlinkedinId] = useState(
    user ? (user.profile.linkedinId ? user.profile.linkedinId : "") : ""
  );
  const [profileImage, setProfileImage] = useState(
    user ? user.profile.profileImage : "1AcQ_1wKhQOJgTFMB3CcHGnNSRQnWBh9A"
  );
  const [dob, setDob] = useState(
    user ? (user.profile.dob ? user.profile.dob : "") : ""
  );
  console.log(user);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Choose File");

  const onchange = async (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleChange = async (event) => {
    event.preventDefault();
    console.log(file);
    if (file) {
      const data = new FormData();
      const newfilename = Date.now() + file.name;
      data.append("name", newfilename);
      data.append("file", file);

      try {
        const res = await axios.post(`${SERVER_URL}/utils/upload`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        setProfileImage(res.data.fileId);
        const res2 = await axios.put(
          `${SERVER_URL}/profile`,
          {
            name,
            phone,
            linkedinId,
            location,
            profileImage: res.data.fileId,
            dob,
          },
          {
            headers: { Authorization: authToken },
          }
        );
        console.log(res2);
      } catch (err) {
        console.log(1);
        const res = await axios.put(
          `${SERVER_URL}/profile`,
          {
            name,
            phone,
            linkedinId,
            location,
            profileImage,
            dob,
          },
          {
            headers: { Authorization: authToken },
          }
        );
        console.log(err);
      }
    } else {
      const res = await axios.put(
        `${SERVER_URL}/profile`,
        {
          name,
          phone,
          linkedinId,
          location,
          profileImage,
          dob,
        },
        {
          headers: { Authorization: authToken },
        }
      );
    }
    setEdit(!edit);
  };

  return (
    <div className={styles["user"]}>
      <div
        className={!edit ? styles["ruserContainer"] : styles["userContainer"]}
      >
        <div className={styles["userShow"]}>
          <div className={styles["userShowTop"]}>
            <img
              src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
              className={!edit ? styles["ruserShowImg"] : styles["userShowImg"]}
            />
            <div className={styles["userShowTopTitle"]}>
              <span
                className={
                  !edit
                    ? styles["ruserShowUsername"]
                    : styles["userShowUsername"]
                }
              >
                {name}
              </span>
              <span
                className={
                  !edit
                    ? styles["ruserShowUserTitle"]
                    : styles["userShowUserTitle"]
                }
              >
                Software Engineer
              </span>
            </div>
          </div>
          <div
            className={
              !edit ? styles["ruserShowBottom"] : styles["userShowBottom"]
            }
          >
            <span className={styles["userShowTitle"]}>Account Details</span>
            {/* <div className={styles["userShowInfo"]}>
              <PermIdentity className={styles["userShowIcon"]} />
              <span className={styles["userShowInfoTitle"]}>{}</span>
            </div> */}

            {dob === "" ? (
              ""
            ) : (
              <>
                <div className={styles["userShowInfo"]}>
                  <CalendarToday className={styles["userShowIcon"]} />
                  <span className={styles["userShowInfoTitle"]}>
                    {dob[0] +
                      dob[1] +
                      dob[2] +
                      dob[3] +
                      dob[4] +
                      dob[5] +
                      dob[6] +
                      dob[7] +
                      dob[8] +
                      dob[9]}
                  </span>
                </div>
              </>
            )}
            {phone === "" ? (
              ""
            ) : (
              <>
                <span className={styles["userShowTitle"]}>Contact Details</span>
                <div className={styles["userShowInfo"]}>
                  <PhoneAndroid className={styles["userShowIcon"]} />
                  <span className={styles["userShowInfoTitle"]}>{phone}</span>
                </div>
              </>
            )}

            <div className={styles["userShowInfo"]}>
              <MailOutline className={styles["userShowIcon"]} />
              <span className={styles["userShowInfoTitle"]}>{email}</span>
            </div>

            {linkedinId === "" ? (
              ""
            ) : (
              <>
                <div className={styles["userShowInfo"]}>
                  <PermIdentity className={styles["userShowIcon"]} />
                  <span className={styles["userShowInfoTitle"]}>
                    {linkedinId}
                  </span>
                </div>
              </>
            )}

            {location === "" ? (
              ""
            ) : (
              <>
                <div className={styles["userShowInfo"]}>
                  <LocationSearching className={styles["userShowIcon"]} />
                  <span className={styles["userShowInfoTitle"]}>
                    {location}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        {edit && (
          <div className={styles["userUpdate"]}>
            <span className={styles["userUpdateTitle"]}>Edit</span>
            <form className={styles["userUpdateForm"]}>
              <div className={styles["userUpdateLeft"]}>
                <div className={styles["userUpdateItem"]}>
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={name}
                    className={styles["userUpdateInput"]}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* <div className={styles["userUpdateItem"]}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Anna Becker"
                    className={styles["userUpdateInput"]}
                  />
                </div> */}
                <div className={styles["userUpdateItem"]}>
                  <label>LinkedIn Id</label>
                  <input
                    type="text"
                    placeholder={linkedinId}
                    className={styles["userUpdateInput"]}
                    onChange={(e) => setlinkedinId(e.target.value)}
                  />
                </div>
                <div className={styles["userUpdateItem"]}>
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder={phone}
                    className={styles["userUpdateInput"]}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className={styles["userUpdateItem"]}>
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder={location}
                    className={styles["userUpdateInput"]}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className={styles["userUpdateItem"]}>
                  <label>DOB</label>
                  <input
                    type="date"
                    placeholder={dob}
                    className={styles["userUpdateInput"]}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles["userUpdateRight"]}>
                <div className={styles["userUpdateUpload"]}>
                  <img
                    className={styles["userUpdateImg"]}
                    src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                  />
                  {/* <label htmlFor="image">
                    <Publish className={styles["userUpdateIcon"]} />
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={onchange}
                    style={{ display: "none" }}
                  /> */}
                </div>
                <button
                  className={styles["userUpdateButton"]}
                  onClick={handleChange}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <button
        className={styles["editbutton"]}
        onClick={(e) => {
          setEdit(!edit);
        }}
      >
        Edit
      </button>
    </div>
  );
}
