
import React, { useState } from 'react';
import Link from './Link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-green-800">VERMI MASR</a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 space-x-reverse items-center">
            <a href="/" className="text-gray-700 hover:text-green-600">الرئيسية</a>
            <Link href="#/products" className="text-gray-700 hover:text-green-600">منتجاتنا</Link>
            <Link href="#/#about" className="text-gray-700 hover:text-green-600">نبذة عنا</Link>
            <Link href="#/gallery" className="text-gray-700 hover:text-green-600">معرض الصور</Link>
            <Link href="#/contact" className="text-gray-700 hover:text-green-600">تواصل معنا</Link>
            <Link href="#/admin" className="text-sm text-blue-600 hover:underline">لوحة التحكم</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600" aria-label="toggle menu">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <a href="/" className="block py-2 text-gray-700 hover:text-green-600">الرئيسية</a>
          <Link href="#/products" onClick={closeMenu} className="block py-2 text-gray-700 hover:text-green-600">منتجاتنا</Link>
          <Link href="#/#about" onClick={closeMenu} className="block py-2 text-gray-700 hover:text-green-600">نبذة عنا</Link>
          <Link href="#/gallery" onClick={closeMenu} className="block py-2 text-gray-700 hover:text-green-600">معرض الصور</Link>
          <Link href="#/contact" onClick={closeMenu} className="block py-2 text-gray-700 hover:text-green-600">تواصل معنا</Link>
          <Link href="#/admin" onClick={closeMenu} className="block py-2 text-sm text-blue-600 hover:underline">لوحة التحكم</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
