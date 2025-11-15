
import React, { useState, useEffect } from 'react';
import { getGalleryImages, getHomepageContent } from '../services/productService';
import { GalleryImage, HomepageContent } from '../types';
import Navbar from './Navbar';
import Footer from './Footer';

const HomePage: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [content, setContent] = useState<HomepageContent | null>(null);

  useEffect(() => {
    setGalleryImages(getGalleryImages());
    setContent(getHomepageContent());
  }, []);

  if (!content) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <header id="home" className="text-center py-20 bg-green-100 bg-cover bg-center" style={{backgroundImage: `url('${content.heroImageUrl}')`}}>
        <div className="bg-black bg-opacity-40 py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white">{content.heroTitle}</h1>
          <p className="text-lg text-gray-200 mt-4">{content.heroSubtitle}</p>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        
        {/* About Us Section */}
        <section id="about" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">نبذة عنا</h2>
            <p className="text-gray-600 mt-2">قصتنا مع الذهب الأسود للزراعة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="prose lg:prose-lg max-w-none">
              <p dangerouslySetInnerHTML={{ __html: content.aboutText1 }}></p>
              <p dangerouslySetInnerHTML={{ __html: content.aboutText2 }}></p>
            </div>
            <div>
              <img src={content.aboutImageUrl} alt="حديقة خضراء" className="rounded-lg shadow-xl w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">معرض الصور</h2>
            <p className="text-gray-600 mt-2">شاهد جودة منتجاتنا على الطبيعة</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map(image => (
                  <img key={image.id} className="h-auto max-w-full rounded-lg shadow-md" src={image.imageUrl} alt="صورة من المعرض" />
              ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
