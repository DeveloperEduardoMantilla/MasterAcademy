import {useState, useEffect, React} from "react"
import "../../assets/styles/users/users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Loading from "../global/loading.jsx";

function Userregistrated() {
  const [requestCourses, setRequestCourses] = useState([]);
  const [loading, setLoading] = useState(true)
  const ipBackEnd = import.meta.env.VITE_IP_BACKEND;
  const portBackEnd = import.meta.env.VITE_PORT_BACKEND

  useEffect(() => {
    let ruta=`http://${ipBackEnd}:${portBackEnd}/dashboard/requestcourses`;
    fetch(ruta, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setRequestCourses(data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error => " + error);
        setLoading(true);
      });
  }, []);
  return (
    <>
      <div className="content-users">
        <div className="title">
          <FontAwesomeIcon className="rotate-vert-center" icon={faUsers} style={{ color: "#2980B9", }} />
          <h2>Request Courses</h2>
        </div>
        <table className="">
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Date</th>
              <th scope="col">UserId</th>
              <th scope="col">AdminId</th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loading/>
            ): (
              requestCourses.map((rc, key) => (
                <tr key={key}>
                  <td>{rc.course}</td>
                  <td>{rc.date}</td>
                  <td>{rc.userId}</td>
                  <td>{rc.adminId}</td> 
                  {
                    rc.state==1? 
                    <td className='state-button state-1'><span>Permitido</span></td>
                    : <td className='state-button state-0'><span>Espera</span></td>
                  }
                  
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