import "../../assets/styles/users/profile.css"
import {useState, useEffect, React} from "react"

const Profile =()=>{
    const [UserData, setUserData] = useState([]);
    useEffect(() => {
      let ruta="http://localhost:5010/dashboard/userLogout";
      fetch(ruta, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          console.log(data);
        })
        .catch((error) => {
          console.log("Error 23 => " + error);
        });
    }, []);

    return (
        <>
            <div className="content-profile">
                <div className="background-profile">
                </div>
                <div className="details-profile">
                    <div className="profile">
                        <div className="info">
                            <div className="content-info">
                                <img src={UserData.profile} alt=""></img>
                                <p>{UserData.loginCount}</p>
                            </div>
                        </div>
                        <h2>{UserData.username}</h2>
                        {
                            UserData.role ===1 ?
                            <h3>Administrator</h3>
                            :   
                            <h3>Student</h3>
                        }
                        
                        <h4>{UserData.creationDate}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;