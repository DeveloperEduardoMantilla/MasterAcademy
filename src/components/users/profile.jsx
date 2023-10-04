import "../../assets/styles/users/profile.css"
import {useState, useEffect, React} from "react"

const Profile =()=>{
    const [UserData, setUserData] = useState([]);
    const ipBackEnd = import.meta.env.VITE_IP_BACKEND;
    const portBackEnd = import.meta.env.VITE_PORT_BACKEND;
    useEffect(() => {
      let ruta=`http://${ipBackEnd}:${portBackEnd}/dashboard/userLogout`;
      fetch(ruta, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.log("Error => " + error);
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