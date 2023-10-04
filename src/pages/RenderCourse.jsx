import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from "../components/global/loading.jsx";
import {useForm} from "react-hook-form";     

import "../assets/styles/courses/render.css"
import Swal from 'sweetalert2';

export default function RenderCourse(){

    const {register, handleSubmit,reset} = useForm();

    const [data, setData] = useState([]);
    const [selectedVideoTitle, setSelectedVideoTitle] = useState('');
    const [selectedSectionNumber, setSelectedSectionNumber] = useState(1);
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState([])
    const { nameCurse } = useParams();
    const [comment, setComment] = useState(false);


    const getComments=async()=>{
        const response = await ( await fetch(`http://localhost:5010/dashboard/comment/${nameCurse}`)).json();
        setComment(response);
    }

    useEffect(() => {
        getComments()
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

    const newComment = async (data)=>{
        if(!data.comment){
            window.alert("Perro")
        }else{
            const date = new Date();
            const options = {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
            };

            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
            
            let data2 = {
                "class":nameCurse,
                "userId":userData.id,
                "comment":data.comment,
                "date":formattedDate
              }
              
              let optionsPost = {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(data2),
                headers: {
                  "Content-Type": "application/json",  
            }}

            await fetch("http://localhost:5010/dashboard/comment", optionsPost);
            reset();
            Swal.fire({
                position: 'bottom-end', 
                icon: 'success',
                title: 'Comment sent ',
                toast: true, 
                showConfirmButton: false, 
                timer: 3000, 
                timerProgressBar: true
              })
        }
        
    
    }   
     
    const onSubmit = (data) => (
        newComment(data)        
    )


    return(
        <>
            {loading ? (
                <Loading/>
            ): (
                <div className="content-curse-c1">
                    <div className="content-v1">
                        <div className="content-curse-m1">
                            <div className="curse-video">
                                {
                                selectedVideoTitle==""?(
                                    <video
                                    autoPlay
                                    src={`http://192.168.128.23:5010/cursos/play?course=${nameCurse}&seccion=1&video=${data[0].videos[0][1].video}`}
                              

                                    controls
                                    ></video>
                                    
                                ):(
                                selectedVideoTitle && (
                                    <video
                                    autoPlay
                                    src={`http://192.168.128.23:5010/cursos/play?course=${nameCurse}&seccion=${selectedSectionNumber}&video=${selectedVideoTitle}`}
                                    controls
                                    ></video>
                                ))
                                }
                                <div className="coments">
                                <div className='comen-user'>
                                        <img src={userData.profile} alt="" />
                                        <div className="comen-form">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <input {...register("comment")} />
                                                <button required type='submit' className='btn btn-primary'>Enviar</button>
                                            </form>
                                            </div>
                                </div>
                                <div className='list-comments'>
                                    
                                    {
                                        
                                        comment.map((rc, key) => (
                                            
                                        <div className='comments-users' key={key}>
                                            <div className="user-coment-img">
                                                <img src={rc.user[0].profile} alt="" />
                                            </div>
                                            <div className="details-comments">
                                                <h2>{rc.user[0].username}</h2>
                                                <p>{rc.comment}</p>
                                            </div>
                                        </div>
                                            ))
                                    }
                                </div>
                                
                                    
                                </div>
                            </div>
                        </div>
                        <div className="content-curse-m2">
                            <div className="accordion accordion-flush " id="accordionFlushExample">
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