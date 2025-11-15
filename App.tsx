
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import ProductsPage from './components/ProductsPage';
import ContactPage from './components/ContactPage';
import GalleryPage from './components/GalleryPage';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    if (route.startsWith('#/#')) {
        return <HomePage />;
    }

    switch (route) {
      case '#/admin':
        return <AdminPage />;
      case '#/products':
        return <ProductsPage />;
      case '#/contact':
        return <ContactPage />;
      case '#/gallery':
        return <GalleryPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {renderPage()}
    </div>
  );
};

export default App;
