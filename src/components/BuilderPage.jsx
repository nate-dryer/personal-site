// src/components/BuilderPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';

function BuilderPage() {
  const location = useLocation();
  const isPreviewing = useIsPreviewing();
  const [content, setContent] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const urlPath = location.pathname;
      
      const content = await builder
        .get('page', {
          userAttributes: {
            urlPath: urlPath || '/'
          }
        })
        .toPromise();
      
      setContent(content);
      setNotFound(!content && !isPreviewing);
    };
    
    fetchContent();
  }, [location.pathname, isPreviewing]);

  if (notFound) {
    return <div>Page not found</div>; // You can replace with a custom 404 component
  }
  
  return (
    <>
      <BuilderComponent
        model="page"
        content={content}
      />
    </>
  );
}

export default BuilderPage;