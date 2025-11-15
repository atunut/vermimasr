import React, { useState, useEffect } from 'react';
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '../services/productService';
import { GalleryImage } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};


const GalleryManager: React.FC = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = () => {
        setImages(getGalleryImages());
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };
    
    const handleAddImage = async () => {
        if (!imageFile) {
            alert('يرجى اختيار صورة أولاً.');
            return;
        }

        const base64Image = await fileToBase64(imageFile);
        addGalleryImage(base64Image);
        loadImages();
        setImageFile(null);
        // Clear file input
        const fileInput = document.getElementById('galleryImageUpload') as HTMLInputElement;
        if(fileInput) fileInput.value = '';

        setStatus('تمت إضافة الصورة بنجاح!');
        setTimeout(() => setStatus(''), 3000);
    };

    const handleDelete = (imageId: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
            deleteGalleryImage(imageId);
            loadImages();
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">إدارة معرض الصور</h2>
            
            <div className="mb-6 p-4 border rounded-md">
                <h3 className="text-lg font-semibold mb-2">إضافة صورة جديدة</h3>
                <div className="flex items-center space-x-4 space-x-reverse">
                    <input type="file" id="galleryImageUpload" onChange={handleImageChange} accept="image/*" className="flex-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
                    <button onClick={handleAddImage} className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors" disabled={!imageFile}>
                        إضافة
                    </button>
                </div>
                 {status && <p className="text-green-600 mt-2">{status}</p>}
            </div>

            <h3 className="text-lg font-semibold mb-4">الصور الحالية</h3>
            {images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map(image => (
                        <div key={image.id} className="relative group">
                            <img src={image.imageUrl} alt="Gallery item" className="w-full h-32 object-cover rounded-lg"/>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity">
                                <button
                                    onClick={() => handleDelete(image.id)}
                                    className="p-2 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="حذف الصورة"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-8">لا توجد صور في المعرض حالياً.</p>
            )}
        </div>
    );
};

export default GalleryManager;
