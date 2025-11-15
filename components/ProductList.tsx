import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">قائمة المنتجات</h2>
      {products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col md:flex-row items-center p-4 border rounded-lg hover:shadow-lg transition-shadow">
              <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-md md:mr-4 mb-4 md:mb-0"/>
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600 truncate">{product.description}</p>
                <p className="font-semibold text-teal-600">{product.price.toFixed(2)} ر.س</p>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse mt-4 md:mt-0 md:ml-4">
                <button 
                  onClick={() => onEdit(product)}
                  className="p-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  aria-label="تعديل المنتج"
                  title="تعديل"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={() => onDelete(product.id)}
                  className="p-2 rounded-full text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  aria-label="حذف المنتج"
                  title="حذف"
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
         <p className="text-center text-gray-500 py-8">لا توجد منتجات. أضف منتجًا جديدًا للبدء.</p>
      )}
    </div>
  );
};

export default ProductList;