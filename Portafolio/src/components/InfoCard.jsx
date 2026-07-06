import "../styles/InfoCard.css";

function InfoCard({ titulo, contenido, detalle }) {
  return (
    <div className="info-card">
      <div className="info-card-header">
        <span className="dot" />
        <h3>{titulo}</h3>
        <span className="dot" />
      </div>
      <div className="info-card-body">
        <p className="info-card-contenido">{contenido}</p>
        <p className="info-card-detalle">{detalle}</p>
      </div>
    </div>
  );
}

export default InfoCard;