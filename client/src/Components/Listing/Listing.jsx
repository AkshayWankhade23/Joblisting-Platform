import styles from "./Style.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchLogo from "../../assets/Vector.jpg";

export const Listing = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const skillQuery = skills.join(',');
  
        const options = { method: "GET" };
        let apiUrl = `http://localhost:4000/api/job/job-posts?skillsRequired=${encodeURIComponent(skillQuery)}`;
  
        const response = await fetch(apiUrl, options);
        const data = await response.json();
  
        const filteredJobs = data.jobPosts.filter((job) =>
          job?.position?.toLowerCase().includes(search.toLowerCase())
        );
  
        setJobs([...filteredJobs]);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchJobs();
  }, [search, skills]);


  const handleSkill = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill !== '') {
      if (!skills.includes(selectedSkill)) {
        setSkills([...skills, selectedSkill]);
      }
    }
  };

  const handleRemove = (skill) => {
    const index = skills.indexOf(skill);
    skills.splice(index, 1);
    setSkills([...skills]);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerTop}>
          <img
            src={searchLogo}
            alt="searchLogo"
            className={styles.searchLogo}
          />
          <input
            className={styles.inputTop}
            value={search}
            onChange={handleSearch}
            type="text"
            name="search"
            placeholder="Type any job title"
          />
        </div>
        <div className={styles.containerBottom}>
          <select
            onChange={handleSkill}
            className={styles.inputSelect}
            name="remote"
          >
            <option value="">Skills</option>
            {codingSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          {skills.map((skill) => {
            return (
              <span className={styles.chip} key={skill}>
                {skill}
                <span
                  onClick={() => handleRemove(skill)}
                  className={styles.cross}
                >
                  X
                </span>
              </span>
            );
          })}
          {isLoggedIn ? (
            <button onClick={() => navigate("/addJob")} className={styles.edit}>
              + Add Job
            </button>
          ) : null}
        </div>
      </div>
      <div className={styles.bottom}>
        {jobs.map((data) => {
          return (
            <div key={data._id} className={styles.list}>
              <div className={styles.listLeft}>
                <div>
                  <img
                    src={data.logoURL}
                    alt="logoURL"
                    className={styles.companyLogo}
                  />
                </div>
                <div className={styles.infoLeft}>
                  <p className={styles.position}>{data.position}</p>
                  <p className={styles.extraInfo}>
                    <span className={styles.greyText}>11-50</span>
                    <span className={styles.greyText}>₹ {data.salary}</span>
                    <span className={styles.greyText}>{data.location}</span>
                  </p>
                  <p className={styles.extraInfo}>
                    <span className={styles.redText}>{data.remote}</span>
                    <span className={styles.redText}>{data.jobType}</span>
                  </p>
                </div>
              </div>
              <div>
                <div>
                  {data.skillsRequired.map((skill) => {
                    return (
                      <span className={styles.skill} key={skill}>
                        {skill}
                      </span>
                    );
                  })}
                </div>
                <div className={styles.btnGroup}>
                  {isLoggedIn ? (
                    <button
                      onClick={() =>
                        navigate("/addJob", {
                          state: { id: data._id, edit: true },
                        })
                      }
                      className={styles.edit}
                    >
                      Edit job
                    </button>
                  ) : null}
                  <button
                    onClick={() =>
                      navigate("/detail", { state: { id: data._id } })
                    }
                    className={styles.view}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const codingSkills = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "PHP",
  "Swift",
  "Objective-C",
  "SQL",
  "HTML",
  "CSS",
  "css",
  "Node",
  "React",
];
