import React, { useState, useEffect } from "react";
import "../../assets/styles/users/users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Loading from "../global/loading.jsx";

function Userregistrated() {
  const [requestCourses, setRequestCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const ipBackEnd = import.meta.env.VITE_IP_BACKEND;
  const portBackEnd = import.meta.env.VITE_PORT_BACKEND;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ruta = `http://${ipBackEnd}:${portBackEnd}/dashboard/requestcourses`;
        const response = await fetch(ruta, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setRequestCourses(data.message);
        setLoading(false);
      } catch (error) {
        console.error("Error => ", error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  const allowEntry = async (p1, p2) => {
    try {
      console.log(user);
      const data = {
        userId: p2,
        course: p1,
        state: "1",
      };

      const options = {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const ruta = `http://${ipBackEnd}:${portBackEnd}/dashboard/allowCourse`;
      
      const response = await fetch(ruta, options);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
      }
      const responseData = await response.json();
      //console.log(responseData);

      setRequestCourses((prevCourses) =>
        prevCourses.map((courseItem) =>
          courseItem.userId === p2 && courseItem.course === p1
            ? { ...courseItem, state: 1 }
            : courseItem
        )
      );
    } catch (error) {
      console.error("Error durante la solicitud:", error);
    }
  };

  return (
    <>
      <div className="content-users">
        <div className="title">
          <FontAwesomeIcon className="rotate-vert-center" icon={faUsers} style={{ color: "#2980B9" }} />
          <h2>Request Courses</h2>
        </div>
        <table className="">
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Date</th>
              <th scope="col">UserId</th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loading />
            ) : (
              requestCourses.map((rc, key) => (
                <tr key={key}>
                  <td>{rc.course}</td>
                  <td>{rc.date}</td>
                  <td>{rc.userId}</td>
                  {rc.state == 1 ? (
                    <td className="state-button state-1">
                      <span>Permitido</span>
                    </td>
                  ) : (
                    <td className="state-button state-0" onClick={() => allowEntry(rc.course, rc.userId)}>
                      <span>Espera</span>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Userregistrated;
