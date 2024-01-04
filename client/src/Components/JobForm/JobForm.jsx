import { useState, useEffect } from "react";
import styles from "./Style.module.css";
import { useNavigate, useLocation } from "react-router";
import {toast} from "react-hot-toast";
import { server } from "../../App";

export const JobForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    logoURL: "",
    position: "",
    salary: "",
    jobType: "",
    remote: "",
    location: "",
    description: "",
    about: "",
    skillsRequired: "",
  });
  // console.log(formData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (state && state.id) {
      const { id, edit } = state;
      // console.log(edit);
      if (edit) {
        setEdit(edit);
      }
      if (id) {
        setId(id);
        const options = { method: "GET" };
        fetch(`${server}/api/job/job-posts/${id}`, options)
          .then((response) => response.json())
          .then((response) => setFormData({ ...response.jobPost }))
          .catch((err) => console.error(err));
      }
    }
  }, [state]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are filled in
    if (
      !formData.companyName ||
      !formData.logoURL ||
      !formData.position ||
      !formData.salary ||
      !formData.jobType ||
      !formData.remote ||
      !formData.location ||
      !formData.description ||
      !formData.about ||
      !formData.skillsRequired
    ) {
      // alert("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    // Set the bearer token
    const token = window.localStorage.getItem("token");
    const recruiterName = window.localStorage.getItem("name");
    if (!token) {
      // alert("Login to create a job");
      toast.error("Login to create a job");
      return;
    }
    const data = { ...formData, name: recruiterName };
    // console.log("token", token);
    // Send the POST request
    try {
      const response = await fetch(`${server}/api/job/job-posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // alert("An error ocurred, please try again");
        toast.error("An error ocurred, please try again");
      }

      const responseData = await response.json();
      // console.log(responseData);
      // alert("Job created successfully");
      toast.success("Job created successfully");
      navigate("/listing");
    } catch (error) {
      console.error("There was a problem with the request:", error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    if (
      !formData.companyName ||
      !formData.logoURL ||
      !formData.position ||
      !formData.salary ||
      !formData.jobType ||
      !formData.remote ||
      !formData.location ||
      !formData.description ||
      !formData.about ||
      !formData.skillsRequired
    ) {
      // alert("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    // Set the bearer token
    const token = window.localStorage.getItem("token");
    const recruiterName = window.localStorage.getItem("name");
    if (!token) {
      // alert("Login to create a job");
      toast.error("Login to create a job");
      return;
    }
    const data = { ...formData, name: recruiterName };
    // Send the POST request
    try {
      const response = await fetch(
        `${server}/api/job/job-posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        // alert("An error ocurred, please try again");
        toast.error("An error ocurred, please try again");
      }

      const responseData = await response.json();
      // console.log(responseData);
      // alert("Job edited successfully");
      toast.success("Job edited successfully");
      navigate("/listing");
    } catch (error) {
      console.error("There was a problem with the request:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        {edit ? <>Edit</> : <>Add</>} job description
      </h1>
      <div className={styles.jobForm}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="companyName">
            Company Name:
          </label>
          <input
            className={styles.input}
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="logoURL">
            Logo URL:
          </label>
          <input
            className={styles.input}
            type="text"
            name="logoURL"
            value={formData.logoURL}
            onChange={handleChange}
            placeholder="Enter logo URL"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="position">
            Position:
          </label>
          <input
            className={styles.input}
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter job position"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="salary">
            Salary:
          </label>
          <input
            className={styles.input}
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter job salary"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="jobType">
            Job Type:
          </label>
          <select
            className={styles.input}
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="remote">
            Remote:
          </label>
          <select
            className={styles.input}
            name="remote"
            value={formData.remote}
            onChange={handleChange}
          >
            <option value="Remote">Remote</option>
            <option value="Office">Office</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="location">
            Location:
          </label>
          <input
            className={styles.input}
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter job location"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="description">
            Description:
          </label>
          <textarea
            className={styles.input}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="about">
            About:
          </label>
          <textarea
            className={styles.input}
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Enter company description"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="skillsRequired">
            Skills:
          </label>
          <input
            className={styles.input}
            type="text"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
            placeholder="skills"
          />
        </div>
      </div>
      <button onClick={() => navigate("/listing")} className={styles.cancel}>
        Cancel
      </button>
      {edit ? (
        <button onClick={handleEdit} className={styles.add}>
          Edit Job
        </button>
      ) : (
        <button onClick={handleSubmit} className={styles.add}>
          + Add Job
        </button>
      )}
    </div>
  );
};
