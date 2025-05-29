import { useState } from "react";
import "./MercadoPlay.css";

function MercadoPlay() {
  const [mediaItems] = useState([
    {
      id: 1,
      title: "Trailer GTA 6",
      type: "youtube-video",
      url: "https://www.youtube.com/embed/VQRLujxTm3c?si=WnZpl2xgTNA1eypb",
      description: "Trailer oficial de GTA 6",
    },
    {
      id: 2,
      title: "Podcast de Tecnología",
      type: "audio",
      url: "https://archive.org/download/TechPodcast/TechPodcast.mp3",
      description: "Una charla sobre las últimas tendencias tecnológicas.",
    },
    {
      id: 3,
      title: "Tutorial CSS Grid",
      type: "youtube-video",
      url: "https://www.youtube.com/embed/EiNiSFIPIQE?si=N7jLCiYMTOogcDCP",
      description: "Tutorial paso a paso sobre CSS Grid.",
    },
  ]);

  return (
    <div className="mercado-play-container">
      <h2>Mercado Play</h2>
      <p className="mercado-play-intro">
        Disfruta de nuestro contenido multimedia exclusivo.
      </p>

      <div className="media-list">
        {mediaItems.map(({ id, title, type, url, description }) => (
          <div key={id} className="media-item">
            <h3 className="media-title">{title}</h3>
            <p className="media-description">{description}</p>
            {type === "youtube-video" ? (
              <div className="youtube-wrapper">
                <iframe
                  width="100%"
                  height="315"
                  src={url}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : type === "audio" ? (
              <audio className="media-audio" controls>
                <source src={url} type="audio/mpeg" />
                Tu navegador no soporta el audio.
              </audio>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MercadoPlay;
