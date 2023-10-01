import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from "../components/global/loading.jsx";

import "../assets/styles/courses/render.css"

export default function RenderCourse(){
    const [data, setData] = useState([]);
    const [selectedVideoTitle, setSelectedVideoTitle] = useState('');
    const [selectedSectionNumber, setSelectedSectionNumber] = useState(1);
    const [loading, setLoading] = useState(true)
    const { nameCurse } = useParams();

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(`http://192.168.128.23:5010/cursos/?course=${nameCurse}`);
            console.log(response);
            if (!response.ok) {
              throw new Error('No se pudo cargar la información desde la API');
            }
            const jsonData = await response.json();
            setData(Object.values(jsonData));
            console.log(data);
            setLoading(false);
          } catch (error) {
            console.error('Error al cargar datos desde la API:', error);
            setLoading(false);
          }
        }
        fetchData();
      }, []);

    const MIFUNCION = (title) => {
     setSelectedVideoTitle(title); 
    };
    
    const handleSummaryClick = (sectionNumber) => {
        setSelectedSectionNumber(sectionNumber);
        setSelectedVideoTitle(''); 
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
                                <div className="coments bg-white p-5 ">
                                    <h4>Comentes</h4>
                                    <p>Comentarios Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo commodi at incidunt consequuntur placeat ipsa aliquam totam ratione, sunt quis assumenda voluptate porro officia dolore accusantium officiis animi voluptas cupiditate!</p>
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
                                                <li key={index}  type="none">
                                                    <button onClick={() => MIFUNCION(video.video)}>{video.Titulo}</button>
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