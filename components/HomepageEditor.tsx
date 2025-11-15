import React, { useState, useEffect } from 'react';
import { getHomepageContent, saveHomepageContent } from '../services/productService';
import { HomepageContent } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const HomepageEditor: React.FC = () => {
    const [content, setContent] = useState<HomepageContent | null>(null);
    const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
    const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        setContent(getHomepageContent());
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!content) return;
        const { name, value } = e.target;
        setContent({ ...content, [name]: value });
    };
    
    const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setHeroImageFile(e.target.files[0]);
        }
    };

    const handleAboutImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAboutImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content) return;

        let finalContent = { ...content };

        if (heroImageFile) {
            finalContent.heroImageUrl = await fileToBase64(heroImageFile);
        }
        if (aboutImageFile) {
            finalContent.aboutImageUrl = await fileToBase64(aboutImageFile);
        }

        saveHomepageContent(finalContent);
        setContent(finalContent);
        setHeroImageFile(null);
        setAboutImageFile(null);
        setStatus('تم حفظ التغييرات بنجاح!');
        setTimeout(() => setStatus(''), 3000);
    };

    if (!content) return <div>Loading editor...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">تخصيص الصفحة الرئيسية</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hero Section */}
                <fieldset className="border p-4 rounded-md">
                    <legend className="text-lg font-semibold px-2">قسم الهيرو (الرئيسي)</legend>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700">العنوان الرئيسي</label>
                            <input type="text" name="heroTitle" id="heroTitle" value={content.heroTitle} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                        </div>
                        <div>
                            <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700">العنوان الفرعي</label>
                            <input type="text" name="heroSubtitle" id="heroSubtitle" value={content.heroSubtitle} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                        </div>
                        <div>
                            <label htmlFor="heroImage" className="block text-sm font-medium text-gray-700">صورة الخلفية</label>
                            <input type="file" id="heroImage" onChange={handleHeroImageChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
                            <img src={heroImageFile ? URL.createObjectURL(heroImageFile) : content.heroImageUrl} alt="معاينة صورة الهيرو" className="mt-2 w-full h-auto rounded-lg object-cover max-h-40"/>
                        </div>
                    </div>
                </fieldset>

                {/* About Section */}
                <fieldset className="border p-4 rounded-md">
                    <legend className="text-lg font-semibold px-2">قسم "نبذة عنا"</legend>
                     <div className="space-y-4">
                        <div>
                            <label htmlFor="aboutText1" className="block text-sm font-medium text-gray-700">الفقرة الأولى</label>
                            <textarea name="aboutText1" id="aboutText1" value={content.aboutText1} onChange={handleChange} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
                        </div>
                        <div>
                            <label htmlFor="aboutText2" className="block text-sm font-medium text-gray-700">الفقرة الثانية</label>
                            <textarea name="aboutText2" id="aboutText2" value={content.aboutText2} onChange={handleChange} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
                        </div>
                        <div>
                            <label htmlFor="aboutImage" className="block text-sm font-medium text-gray-700">صورة القسم</label>
                            <input type="file" id="aboutImage" onChange={handleAboutImageChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
                            <img src={aboutImageFile ? URL.createObjectURL(aboutImageFile) : content.aboutImageUrl} alt="معاينة صورة نبذة عنا" className="mt-2 w-full h-auto rounded-lg object-cover max-h-40"/>
                        </div>
                    </div>
                </fieldset>

                <div className="flex items-center space-x-4">
                    <button type="submit" className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors">
                        حفظ التغييرات
                    </button>
                    {status && <p className="text-green-600">{status}</p>}
                </div>
            </form>
        </div>
    );
};

export default HomepageEditor;
