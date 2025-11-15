
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
      <p>&copy; {new Date().getFullYear()} VERMI MASR. جميع الحقوق محفوظة.</p>
      <a href="#" className="text-sm text-gray-400 hover:text-white mt-2 inline-block">العودة للأعلى</a>
    </footer>
  );
};

export default Footer;
