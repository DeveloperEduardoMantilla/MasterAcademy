import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from "../components/global/loading.jsx";

import "../assets/styles/courses/render.css"

export default function RenderCourse(){
    const [data, setData] = useState([]);
    const [selectedVideoTitle, setSelectedVideoTitle] = useState('');
    const [selectedSectionNumber, setSelectedSectionNumber] = useState(1);
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState([])
    const { nameCurse } = useParams();
    const [comment, setComment] = useState('');

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(`http://192.168.128.23:5010/cursos/?course=${nameCurse}`);
            if (!response.ok) {
              throw new Error('No se pudo cargar la información desde la API');
            }
            const jsonData = await response.json();
            setData(Object.values(jsonData));
            

            let options = {
                method: "GET",
                credentials: "include" 
            };
            let userData = await(await fetch("http://localhost:5010/dashboard/userLogout", options)).json();
            setUserData(userData)

            setLoading(false);
          } catch (error) {
            console.error('Error al cargar datos desde la API:', error);
            setLoading(false);
          }
        }
        fetchData();
      }, []);

    const renderVideo = (title) => {
     setSelectedVideoTitle(title); 
    };
    
    const handleSummaryClick = (sectionNumber) => {
        setSelectedSectionNumber(sectionNumber);
        setSelectedVideoTitle(''); 
    };

    const sendRecord = async () => {
        try {
          const response = await fetch('', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              comment: comment,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Error al enviar el comentario');
          }
          setComment('');
        } catch (error) {
          console.error('Error al enviar el comentario:', error);
        }
      };

    return(
        <>
            {loading ? (
                <Loading/>
            ): (
                <div className="content-curse-c1">
                    <div className="content-v1">
                        <div className="content-curse-m1">
                            <div className="curse-video">
                                {selectedVideoTitle && (
                                    <video
                                    autoPlay
                                    src={`http://192.168.128.23:5010/cursos/play?course=${nameCurse}&seccion=${selectedSectionNumber}&video=${selectedVideoTitle}`}
                                    controls
                                    ></video>
                                )}
                                <div className="coments">
                                    <div className='comen-user'>
                                        <img src={userData.profile} alt="" />
                                        <div className="comen-form">
                                            <form action="">
                                                <input type="text" value={comment}  onChange={(e) => setComment(e.target.value)}/>
                                                <button onClick={sendRecord}>Enviar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-curse-m2">
                            <div className="accordion accordion-flush bg-dark" id="accordionFlushExample">
                                {data.map((section, i)=>{
                                    const sectionNumber = i + 1; 
                                    const videos = section.videos;

                                    let idTarget=`flush-heading${i}`
                                    let idTarget2=`flush-collapse${i}`
                                    return (
                                    <div key={i} className="accordion-item">
                                        <h2 className="accordion-header" id={idTarget}>
                                        <summary onClick={() => handleSummaryClick(sectionNumber)}>
                                            <button open={sectionNumber === selectedSectionNumber} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+idTarget2} aria-expanded="false" aria-controls={idTarget2}>
                                                {section.sectionName}
                                            </button>
                                        </summary>
                                        </h2>
                                        <div id={idTarget2} className="accordion-collapse collapse" aria-labelledby={idTarget} data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <ul>
                                            
                                            {videos.map((videoObj, index) => {
                                                const video = Object.values(videoObj)[0];
                                                return (
                                                <li key={index}  type="none" >
                                                    <button onClick={() => renderVideo(video.video)}>{video.Titulo}</button>
                                                </li>
                                                );
                                            })}
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )} 
        </>
    )
}