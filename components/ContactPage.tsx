
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactPage: React.FC = () => {
    const whatsappNumber = "966000000000";
    const email = "contact@vermicompost.com";

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Navbar />
            <main className="container mx-auto p-4 md:p-8 flex-grow flex items-center justify-center">
                <section id="contact" className="w-full">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800">تواصل معنا</h2>
                        <p className="text-gray-600 mt-2">نسعد باستقبال استفساراتكم وطلباتكم</p>
                    </div>
                    <div className="max-w-lg mx-auto text-center bg-white p-8 rounded-lg shadow-lg">
                        <p className="text-lg mb-8">لأي استفسار أو لطلب كميات خاصة، لا تتردد في التواصل معنا عبر القنوات التالية:</p>
                        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse">
                            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-green-600 font-bold text-xl hover:text-green-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 ml-2" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.509 1.916 6.364l-.995 3.635 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                </svg>
                                واتساب
                            </a>
                            <a href={`mailto:${email}`} className="inline-flex items-center text-blue-600 font-bold text-xl hover:text-blue-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                البريد الإلكتروني
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
