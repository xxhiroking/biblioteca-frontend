import './LoadingSkeleton.css';

const LoadingSkeleton = () => {
  return (
    <div className="libros-grid">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-badge"></div>
          </div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text short"></div>
          <div className="skeleton-actions">
            <div className="skeleton skeleton-button"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
