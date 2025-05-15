export default function Image_Viewer({imageText, imagePath}) {
    
    return(
        <div className = "image-viewer-container">
            <img id = "image-viewer-picture" src = {imagePath}/>
        </div>
    );
}