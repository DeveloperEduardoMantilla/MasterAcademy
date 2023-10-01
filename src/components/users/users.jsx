import {useState, useEffect, React} from "react"
import "../../assets/styles/users/users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Loading from "../global/loading.jsx";

function Userregistrated() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let ruta="http://localhost:5010/dashboard/users";
    fetch(ruta, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
                  <td>{course.fullName}</td>
                  <td>{course.loginCount}</td>
                  <td>{course.lastLogin}</td>
                  <td>{course.creationDate}</td>
                  <td>{course.role}</td>
                  <td className='state-button state-1'><span>Active</span></td>
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