import React from 'react';
import "../../assets/styles/users/users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

function Userregistrated() {
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
              <th scope="col">Key</th>
              <th scope="col">UserName</th>
              <th scope="col">LoginAccount</th>
              <th scope="col">LastLogin</th>
              <th scope="col">CreationDate</th>
              <th scope="col">Role</th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Usuario1</td>
              <td>30</td>
              <td>29/9/2023, 10:04:00 p. m.</td>
              <td>22/9/2023, 6:42:22 p. m.</td>
              <td>Administrator</td>
              <td className='state-button state-1'><span>Active</span></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Usuario2</td>
              <td>79</td>
              <td>1/10/2023, 3:04:00 p. m.</td>
              <td>17/8/2023, 8:35:17 p. m.</td>
              <td>Student</td>
              <td className='state-button state-0'><span>Inactive</span></td>
            </tr>
            <tr>
  <th scope="row">3</th>
  <td>Usuario3</td>
  <td>45</td>
  <td>5/10/2023, 8:15:00 p. m.</td>
  <td>12/9/2023, 11:20:45 p. m.</td>
  <td>Administrator</td>
  <td className='state-button state-1'><span>Active</span></td>
</tr>
<tr>
  <th scope="row">4</th>
  <td>Usuario4</td>
  <td>28</td>
  <td>8/10/2023, 1:30:00 p. m.</td>
  <td>3/8/2023, 5:12:30 p. m.</td>
  <td>Student</td>
  <td className='state-button state-0'><span>Inactive</span></td>
</tr>
<tr>
  <th scope="row">5</th>
  <td>Usuario5</td>
  <td>33</td>
  <td>15/10/2023, 11:45:00 a. m.</td>
  <td>19/9/2023, 2:18:15 a. m.</td>
  <td>Administrator</td>
  <td className='state-button state-1'><span>Active</span></td>
</tr>
<tr>
  <th scope="row">6</th>
  <td>Usuario6</td>
  <td>52</td>
  <td>20/10/2023, 6:20:00 a. m.</td>
  <td>8/7/2023, 4:50:22 a. m.</td>
  <td>Student</td>
  <td className='state-button state-0'><span>Inactive</span></td>
</tr>
<tr>
  <th scope="row">7</th>
  <td>Usuario7</td>
  <td>36</td>
  <td>25/10/2023, 2:55:00 a. m.</td>
  <td>1/10/2023, 9:30:18 p. m.</td>
  <td>Administrator</td>
  <td className='state-button state-1'><span>Active</span></td>
</tr>

          </tbody>
        </table>
      </div>
    </>
  );
}

export default Userregistrated;