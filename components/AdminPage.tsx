import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './LoginPage';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import HomepageEditor from './HomepageEditor';
import GalleryManager from './GalleryManager';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import { Product } from '../types';
import Link from './Link';

type AdminTab = 'products' | 'homepage' | 'gallery';

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isAdminLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
      loadProducts();
    }
  }, []);

  const loadProducts = useCallback(() => {
    setProducts(getProducts());
  }, []);

  const handleLoginSuccess = () => {
    sessionStorage.setItem('isAdminLoggedIn', 'true');
    setIsLoggedIn(true);
    loadProducts();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
  };
  
  const handleSaveProduct = (productData: Omit<Product, 'id'>, id?: string) => {
    if (id) {
      updateProduct({ ...productData, id });
    } else {
      addProduct(productData);
    }
    loadProducts();
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا المنتج؟')) {
      deleteProduct(productId);
      loadProducts();
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'products':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ProductForm 
                onSave={handleSaveProduct} 
                productToEdit={editingProduct}
                onCancelEdit={handleCancelEdit}
              />
            </div>
            <div className="lg:col-span-2">
              <ProductList 
                products={products} 
                onEdit={handleEditProduct} 
                onDelete={handleDeleteProduct}
              />
            </div>
          </div>
        );
      case 'homepage':
        return <HomepageEditor />;
      case 'gallery':
        return <GalleryManager />;
      default:
        return null;
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8 pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold">لوحة تحكم المسؤول</h1>
          <Link href="#/" className="text-sm text-blue-600 hover:underline">العودة إلى المتجر</Link>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
        >
          تسجيل الخروج
        </button>
      </header>

      <div className="mb-8 border-b border-gray-200">
        <nav className="flex space-x-4" aria-label="Tabs">
          <button onClick={() => setActiveTab('products')} className={`${activeTab === 'products' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            إدارة المنتجات
          </button>
          <button onClick={() => setActiveTab('homepage')} className={`${activeTab === 'homepage' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            تخصيص الرئيسية
          </button>
          <button onClick={() => setActiveTab('gallery')} className={`${activeTab === 'gallery' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            إدارة المعرض
          </button>
        </nav>
      </div>
      
      {renderTabContent()}

    </div>
  );
};

export default AdminPage;
