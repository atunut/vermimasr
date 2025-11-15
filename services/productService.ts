import { Product, GalleryImage, HomepageContent } from '../types';

const PRODUCTS_KEY = 'ecom_products';
const GALLERY_IMAGES_KEY = 'gallery_images';
const HOMEPAGE_CONTENT_KEY = 'homepage_content';

// --- Initial Data ---

const initialProducts: Product[] = [
    {
        id: '1',
        name: 'سماد فيرمي كومبوست (1 كجم)',
        description: 'سماد عضوي 100% غني بالعناصر الغذائية الأساسية لتحسين تهوية التربة وزيادة خصوبتها بشكل طبيعي.',
        price: 25.00,
        imageUrl: 'https://images.pexels.com/photos/776077/pexels-photo-776077.jpeg?auto=compress&cs=tinysrgb&w=600',
        whatsappNumber: '966555111222'
    },
    {
        id: '2',
        name: 'شاي الكومبوست السائل (1 لتر)',
        description: 'محلول مغذي سائل سريع الامتصاص، مثالي لتغذية النباتات الورقية وتقوية الجذور بشكل فوري.',
        price: 15.50,
        imageUrl: 'https://images.pexels.com/photos/324029/pexels-photo-324029.jpeg?auto=compress&cs=tinysrgb&w=600',
        whatsappNumber: '966555333444'
    }
];

const initialGalleryImages: GalleryImage[] = [
    { id: 'g1', imageUrl: 'https://images.pexels.com/photos/287733/pexels-photo-287733.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 'g2', imageUrl: 'https://images.pexels.com/photos/5923/garden-path-stone-nature.jpg?auto=compress&cs=tinysrgb&w=600' },
    { id: 'g3', imageUrl: 'https://images.pexels.com/photos/60013/garden-rose-soft-pink-60013.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 'g4', imageUrl: 'https://images.pexels.com/photos/2252482/pexels-photo-2252482.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const initialHomepageContent: HomepageContent = {
    heroTitle: 'الطبيعة في خدمتك',
    heroSubtitle: 'أفضل أنواع سماد الفيرمي كومبوست لزراعة صحية ومستدامة',
    heroImageUrl: 'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    aboutText1: 'نحن متخصصون في إنتاج وتسويق <strong>الفيرمي كومبوست</strong>، وهو سماد عضوي فائق الجودة يتم إنتاجه بواسطة ديدان الأرض. يُعرف هذا السماد بقدرته الهائلة على تحسين بنية التربة، زيادة خصوبتها، وتزويد النباتات بكافة العناصر الغذائية التي تحتاجها للنمو بشكل صحي وقوي.',
    aboutText2: 'مهمتنا هي توفير حلول زراعية طبيعية ومستدامة تساهم في الحصول على محاصيل وفيرة وخالية من الكيماويات، سواء كنتم من الهواة أو المزارعين المحترفين.',
    aboutImageUrl: 'https://images.pexels.com/photos/161504/new-zealand-landscapes-green-glacier-161504.jpeg?auto=compress&cs=tinysrgb&w=600'
};

// --- Generic LocalStorage Functions ---

const getFromStorage = <T>(key: string, initialValue: T): T => {
    try {
        const item = localStorage.getItem(key);
        if (!item) {
            localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error fetching ${key} from localStorage`, error);
        return initialValue;
    }
};

const saveToStorage = <T>(key: string, value: T) => {
    try {
        const item = JSON.stringify(value);
        localStorage.setItem(key, item);
    } catch (error) {
        console.error(`Error saving ${key} to localStorage`, error);
    }
};

// --- Product Management ---

export const getProducts = (): Product[] => getFromStorage(PRODUCTS_KEY, initialProducts);
const saveProducts = (products: Product[]) => saveToStorage(PRODUCTS_KEY, products);

export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: new Date().getTime().toString(),
  };
  const updatedProducts = [...products, newProduct];
  saveProducts(updatedProducts);
  return newProduct;
};

export const updateProduct = (updatedProduct: Product): Product | undefined => {
  const products = getProducts();
  const productIndex = products.findIndex((p) => p.id === updatedProduct.id);

  if (productIndex !== -1) {
    products[productIndex] = updatedProduct;
    saveProducts(products);
    return updatedProduct;
  }
  return undefined;
};

export const deleteProduct = (productId: string): void => {
  const products = getProducts();
  const updatedProducts = products.filter((p) => p.id !== productId);
  saveProducts(updatedProducts);
};


// --- Gallery Management ---

export const getGalleryImages = (): GalleryImage[] => getFromStorage(GALLERY_IMAGES_KEY, initialGalleryImages);
const saveGalleryImages = (images: GalleryImage[]) => saveToStorage(GALLERY_IMAGES_KEY, images);

export const addGalleryImage = (imageUrl: string): GalleryImage => {
    const images = getGalleryImages();
    const newImage: GalleryImage = {
        id: new Date().getTime().toString(),
        imageUrl,
    };
    const updatedImages = [...images, newImage];
    saveGalleryImages(updatedImages);
    return newImage;
};

export const deleteGalleryImage = (imageId: string): void => {
    const images = getGalleryImages();
    const updatedImages = images.filter(img => img.id !== imageId);
    saveGalleryImages(updatedImages);
};


// --- Homepage Content Management ---

export const getHomepageContent = (): HomepageContent => getFromStorage(HOMEPAGE_CONTENT_KEY, initialHomepageContent);
export const saveHomepageContent = (content: HomepageContent): void => saveToStorage(HOMEPAGE_CONTENT_KEY, content);
