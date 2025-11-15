
import React, { useState, useEffect } from 'react';
import { getGalleryImages } from '../services/productService';
import { GalleryImage } from '../types';
import Navbar from './Navbar';
import Footer from './Footer';

const GalleryPage: React.FC = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setImages(getGalleryImages());
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Navbar />
            <main className="container mx-auto p-4 md:p-8 flex-grow">
                <section id="gallery-page" className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800">معرض الصور</h2>
                        <p className="text-gray-600 mt-2">شاهد جودة منتجاتنا وجمال الطبيعة</p>
                    </div>
                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map(image => (
                                <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                                    <img 
                                        className="h-full w-full object-cover" 
                                        src={image.imageUrl} 
                                        alt="صورة من المعرض" 
                                    />
                                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <p className="text-center text-gray-500 py-8">لا توجد صور في المعرض حالياً.</p>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default GalleryPage;
