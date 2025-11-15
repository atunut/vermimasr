import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';

interface ProductFormProps {
  onSave: (productData: Omit<Product, 'id'>, id?: string) => void;
  productToEdit: Product | null;
  onCancelEdit: () => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const ProductForm: React.FC<ProductFormProps> = ({ onSave, productToEdit, onCancelEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const isEditing = productToEdit !== null;

  const resetForm = useCallback(() => {
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setImageFile(null);
    setWhatsappNumber('');
  }, []);

  useEffect(() => {
    if (isEditing && productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price.toString());
      setImageUrl(productToEdit.imageUrl);
      setWhatsappNumber(productToEdit.whatsappNumber || '');
      setImageFile(null); // Reset file input when editing starts
    } else {
      resetForm();
    }
  }, [productToEdit, isEditing, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price) {
      alert('يرجى ملء جميع الحقول.');
      return;
    }

    let finalImageUrl = imageUrl;
    if (imageFile) {
      finalImageUrl = await fileToBase64(imageFile);
    }
    
    if (!finalImageUrl && !isEditing) {
        alert('يرجى رفع صورة للمنتج.');
        return;
    }

    onSave({
      name,
      description,
      price: parseFloat(price),
      imageUrl: finalImageUrl,
      whatsappNumber,
    }, productToEdit?.id);
    
    resetForm();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0])); // for preview
    }
  };

  const handleCancel = () => {
    onCancelEdit();
    resetForm();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{isEditing ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">اسم المنتج</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">وصف المنتج</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">السعر</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"/>
        </div>
         <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">رقم واتساب (اختياري)</label>
          <input type="text" id="whatsapp" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" placeholder="e.g., 9665XXXXXXXX"/>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">صورة المنتج</label>
          <input type="file" id="image" onChange={handleImageChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
        </div>
        {imageUrl && <img src={imageUrl} alt="معاينة المنتج" className="mt-4 w-full h-auto rounded-lg object-cover max-h-48"/>}

        <div className="flex items-center space-x-2 space-x-reverse">
            <button type="submit" className="flex-1 w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
            {isEditing ? 'تحديث المنتج' : 'إضافة المنتج'}
            </button>
            {isEditing && (
                <button type="button" onClick={handleCancel} className="flex-1 w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                    إلغاء
                </button>
            )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
