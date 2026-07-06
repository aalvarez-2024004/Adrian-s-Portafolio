import "../styles/InfoCard.css";

function InfoCard({ titulo, contenido, detalle, index }) {
  return (
    <div className="stat-card">
      <span className="stat-card-tag">{titulo}</span>

      <div className="stat-card-inner">
        <span className="stat-card-fold" />
        <span className="stat-card-ghost">
          {String(index ?? 0).padStart(2, "0")}
        </span>

        <p className="stat-card-value">{contenido}</p>
        {detalle && <p className="stat-card-detail">{detalle}</p>}

        <span className="stat-card-dot" />
      </div>
    </div>
  );
}

export default InfoCard;