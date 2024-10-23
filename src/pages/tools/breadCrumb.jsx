import React from 'react';

const Breadcrumb = ({ path, activeIndex }) => {
  return (
    <div className="breadcrumbs">
      {path.map((item, index) => (
        <span key={index} className={index === activeIndex ? 'active' : ''}>
          {item}
          {index < path.length - 1 && <span className="separator"> &gt; </span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
