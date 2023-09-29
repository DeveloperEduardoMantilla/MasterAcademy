import { useEffect, useState } from 'react';

function Secciones() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState('');
  const [selectedSectionNumber, setSelectedSectionNumber] = useState(1); // Inicialmente, selecciona la primera sección

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://192.168.128.23:5010/cursos/?course=git');
        if (!response.ok) {
          throw new Error('No se pudo cargar la información desde la API');
        }
        const jsonData = await response.json();
        setData(Object.values(jsonData));
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos desde la API:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  const MIFUNCION = (title) => {
    setSelectedVideoTitle(title); // Actualiza selectedVideoTitle con el título del video seleccionado
  };

  const handleSummaryClick = (sectionNumber) => {
    setSelectedSectionNumber(sectionNumber); // Actualiza selectedSectionNumber con el número de sección seleccionado
    setSelectedVideoTitle(''); // Borra el título del video al hacer clic en un summary
  };

  return (
    
    <div>
      
      <h1>Aprende Git:</h1>
      <div className="contenido">
        {data.map((section, i) => {
          const sectionNumber = i + 1; // Asigna un número a cada sección según su posición
          const videos = section.videos;
          return (
            <details key={i} open={sectionNumber === selectedSectionNumber}>
              <summary onClick={() => handleSummaryClick(sectionNumber)}>
                {section.sectionName}
              </summary>
              {videos.map((videoObj, index) => {
                const video = Object.values(videoObj)[0];
                return (
                  <div key={index}>
                    <button onClick={() => MIFUNCION(video.video)}>{video.Titulo}</button>
                  </div>
                );
              })}
            </details>
          );
        })}
      </div>
      {selectedVideoTitle && (
        <video
          autoPlay
          src={`http://192.168.128.23:5010/cursos/play?course=git&seccion=${selectedSectionNumber}&video=${selectedVideoTitle}`}
          width="320"
          height="240"
          controls
        ></video>
      )}
    </div>
  );
}

export default Secciones;