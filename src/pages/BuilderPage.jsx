import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';

function BuilderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isPreviewingInBuilder = useIsPreviewing();
  const [content, setContent] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      const urlPath = location.pathname;
      
      try {
        const content = await builder
          .get('page', {
            userAttributes: {
              urlPath: urlPath || '/'
            },
            options: {
              noTargeting: false
            }
          })
          .promise();
        
        setContent(content);
        setNotFound(!content && !isPreviewingInBuilder);
        
        // if the page title is found, set the document title
        if (content?.data?.title) {
          document.title = content.data.title;
        }
      } catch (error) {
        console.error('Error fetching Builder content:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    
    fetchContent();
  }, [location.pathname, isPreviewingInBuilder]);

  // Custom link component for Builder to use React Router navigation
  const CustomLink = ({ attributes, children }) => {
    const { href } = attributes;
    const isExternalLink = href?.startsWith('http') || href?.startsWith('mailto:');
    
    const handleClick = (e) => {
      if (!isExternalLink && href) {
        e.preventDefault();
        navigate(href);
      }
    };
    
    return (
      <a {...attributes} onClick={handleClick}>
        {children}
      </a>
    );
  };

  // Show loading state
  if (loading && !isPreviewingInBuilder) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If no page is found, return a placeholder 404
  if (notFound && !isPreviewingInBuilder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg">The page you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-screen">
      {/* You can add your header component here */}
      <BuilderComponent 
        model="page" 
        content={content} 
        renderLink={(props) => <CustomLink {...props} />}
        options={{ includeRefs: true }}
      />
      {/* You can add your footer component here */}
    </div>
  );
}

export default BuilderPage;