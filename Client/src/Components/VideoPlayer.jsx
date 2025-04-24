export default function VideoPlayer() {
    return (
        <iframe 
            className="YOUTUBE"
            src="https://www.youtube.com/embed/tRU6fhKdRHg?autoplay=1&showinfo=0&rel=0&modestbranding=1"
            title="Muntlig Genomgång Examensarbete"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        />
    );
}
