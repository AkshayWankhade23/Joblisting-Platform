import styles from "./Style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export const Details = ( {isLoggedIn }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(undefined);
  const { state } = useLocation();
  const { id } = state;

  useEffect(() => {
    const options = { method: "GET" };

    fetch(`http://localhost:4000/api/job/job-posts/${id}`, options)
      .then((response) => response.json())
      .then((response) => setData({ ...response.jobPost }))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      {data ? (
        <>
          <div className={styles.container}>
            <div><img src={data.logoURL} alt="logo" className={styles.companyLogo} /></div>
            <div className={styles.companyName}>{data.companyName}</div>
          </div>
          <div className={styles.containerBottom}>
            <div className={styles.preHeading}>
              <p className={styles.lightText}>{data.jobType}</p>
            </div>
            <div className={styles.heading}>
              <div>
                <p className={styles.boldText}>{data.position}</p>
                <p className={styles.locationText}>{data.location}</p>
              </div>
              <div>
                {isLoggedIn ? (<button
                  onClick={() => {
                    navigate("/addJob", {
                      state: { id: data._id, edit: true },
                    });
                  }}
                  className={styles.edit}
                >
                  Edit Job
                </button>) : null}
              </div>
            </div>
            <div className={styles.perks}>
              <div>
                <p className={styles.lightText}>Stipend</p>
                <p className={styles.lightText}>{data.salary}</p>
              </div>
              <div>
                <p className={styles.lightText}>Duration</p>
                <p className={styles.lightText}>6 Months</p>
              </div>
            </div>
            <div className={styles.info}>
              <h2>About Company</h2>
              <p>{data.about}</p>
            </div>
            <div className={styles.info}>
              <h2>Skill(s) Required</h2>
              {data.skillsRequired.map((skill) => {
                return (
                  <span className={styles.skill} key={skill}>
                    {skill}
                  </span>
                );
              })}
            </div>
            <div className={styles.info}>
              <h2>About the job/internship</h2>
              <p>{data.description}</p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
