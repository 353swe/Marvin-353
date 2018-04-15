import React from 'react';

const NotFound = () => {
  document.title = '404 - Marvin';

  return (
    <div>
      <img alt="page not found" className="img-responsive imageIndexTop" src="/media/cards/404.png" />
    </div>
  );
};

export default (NotFound);
