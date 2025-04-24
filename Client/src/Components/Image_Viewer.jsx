export default function Image_Viewer({imageText, imagePath}) {
    
    return(
        <div className = "image-viewer-container">
            <h1 id = "image-viewer-text">{imageText}</h1>
            <img id = "image-viewer-picture" src = {imagePath}/>
        </div>
    );
}