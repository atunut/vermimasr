
import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import { Product } from '../types';
import Navbar from './Navbar';
import Footer from './Footer';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const whatsappNumber = "966000000000"; // General fallback number

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Navbar />
            <main className="container mx-auto p-4 md:p-8 flex-grow">
                <section id="products" className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800">منتجاتنا</h2>
                        <p className="text-gray-600 mt-2">جودة عالية لنتائج مضمونة</p>
                    </div>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
                                        <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="text-3xl font-bold text-teal-600">{product.price.toFixed(2)} ر.س</span>
                                            <a
                                                href={`https://wa.me/${product.whatsappNumber || whatsappNumber}?text=${encodeURIComponent(`أرغب في الاستفسار عن منتج: ${product.name}`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
                                            >
                                                <span>اطلب عبر واتساب</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.509 1.916 6.364l-.995 3.635 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-semibold text-gray-700">لا توجد منتجات لعرضها حالياً.</h2>
                            <p className="text-gray-500 mt-2">يرجى إضافة بعض المنتجات من لوحة التحكم.</p>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProductsPage;
