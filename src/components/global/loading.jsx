import imgLoading from "../../assets/img/loading.gif"
export default function Loading(){
    return(
        <>
        <div className="content-loading">
            <img className="loading" src={imgLoading} alt="Loading..." />
        </div> 
        </>
    )
}