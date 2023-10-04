import {useState, useEffect, React} from "react"
import "../../assets/styles/users/users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Loading from "../global/loading.jsx";

function Userregistrated() {
  const ipBackEnd = import.meta.env.VITE_IP_BACKEND;
  const portBackEnd = import.meta.env.VITE_PORT_BACKEND;
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let ruta=`http://${ipBackEnd}:${portBackEnd}/dashboard/users`;
    fetch(ruta, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
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
          <h2>Users</h2>
        </div>
        <table className="">
          <thead>
            <tr>
              <th scope="col">Profile</th>
              <th scope="col">UserName</th>
              <th scope="col">LoginAccount</th>
              <th scope="col">LastLogin</th>
              <th scope="col">CreationDate</th>
              <th scope="col">Role</th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loading/>
            ): (
              usersData.map((course) => (
                <tr key={course.id}>
                  <td><img src={course.profile} width={"30px"} /></td>
                  <td>{course.username}</td>
                  <td>{course.loginCount}</td>
                  <td>{course.lastLogin}</td>
                  <td>{course.creationDate}</td>
                  {
                    course.role==1? 
                    <td>Administrator</td>
                    : <td>Student</td>
                  }
                  {
                    course.state==1? 
                    <td className='state-button state-1'><span>Active</span></td>
                    : <td className='state-button state-0'><span>Disabled</span></td>
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