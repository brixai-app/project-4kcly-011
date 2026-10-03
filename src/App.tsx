import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer, { CartItem } from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import WelcomeModal from './components/WelcomeModal';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import AdminSignIn from './pages/AdminSignIn';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminProductNew from './pages/AdminProductNew';
import AdminCategories from './pages/AdminCategories';
import AdminCollections from './pages/AdminCollections';
import AdminOrders from './pages/AdminOrders';
import AdminSiteContent from './pages/AdminSiteContent';

export default function App() {
  const currentStoreBrand = 'EarthThread Apparel';

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [user, setUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('ditris_user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Global Dynamic Products State with Brand-Match Guard
  const [products, setProducts] = useState<any[]>(() => {
    try {
      const savedBrand = localStorage.getItem('ditris_brand_owner');
      const savedProducts = localStorage.getItem('ditris_products');
      if (savedBrand === currentStoreBrand && savedProducts) {
        return JSON.parse(savedProducts);
      }
      return [{"displayCategory":"TOPS","id":"p1","description":"Soft, breathable, and made from 100% organic cotton - perfect for everyday wear.","imageCategory":"tops","title":"ORGANIC COTTON T-SHIRT","tag":"BESTSELLER","image":"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop","price":35},{"price":80,"description":"Classic fit jeans crafted from recycled denim fibers with minimal water usage.","imageCategory":"trousers","id":"p2","image":"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop","displayCategory":"BOTTOMS","title":"RECYCLED DENIM JEANS","tag":"NEW ARRIVAL"},{"image":"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop","price":60,"displayCategory":"TOPS","id":"p3","tag":"NEW ARRIVAL","description":"Cozy hoodie made from natural bamboo fibers, offering warmth with eco comfort.","imageCategory":"tops","title":"BAMBOO FLEECE HOODIE"},{"tag":"BESTSELLER","price":55,"image":"https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop","imageCategory":"bags","title":"HEMP CANVAS BACKPACK","id":"p4","displayCategory":"ACCESSORIES","description":"Durable and stylish backpack made from sustainable hemp canvas."},{"displayCategory":"BOTTOMS","image":"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop","price":70,"id":"p5","description":"Lightweight, airy dress designed from pure linen to keep cool and stylish.","imageCategory":"tops","tag":"NEW ARRIVAL","title":"LINEN SUMMER DRESS"},{"title":"VEGAN LEATHER SNEAKERS","tag":"NEW ARRIVAL","description":"Cruelty-free sneakers made with premium vegan leather and eco-friendly soles.","displayCategory":"FOOTWEAR","id":"p6","price":90,"image":"https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop","imageCategory":"sneakers"}];
    } catch {
      return [{"displayCategory":"TOPS","id":"p1","description":"Soft, breathable, and made from 100% organic cotton - perfect for everyday wear.","imageCategory":"tops","title":"ORGANIC COTTON T-SHIRT","tag":"BESTSELLER","image":"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop","price":35},{"price":80,"description":"Classic fit jeans crafted from recycled denim fibers with minimal water usage.","imageCategory":"trousers","id":"p2","image":"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop","displayCategory":"BOTTOMS","title":"RECYCLED DENIM JEANS","tag":"NEW ARRIVAL"},{"image":"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop","price":60,"displayCategory":"TOPS","id":"p3","tag":"NEW ARRIVAL","description":"Cozy hoodie made from natural bamboo fibers, offering warmth with eco comfort.","imageCategory":"tops","title":"BAMBOO FLEECE HOODIE"},{"tag":"BESTSELLER","price":55,"image":"https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop","imageCategory":"bags","title":"HEMP CANVAS BACKPACK","id":"p4","displayCategory":"ACCESSORIES","description":"Durable and stylish backpack made from sustainable hemp canvas."},{"displayCategory":"BOTTOMS","image":"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop","price":70,"id":"p5","description":"Lightweight, airy dress designed from pure linen to keep cool and stylish.","imageCategory":"tops","tag":"NEW ARRIVAL","title":"LINEN SUMMER DRESS"},{"title":"VEGAN LEATHER SNEAKERS","tag":"NEW ARRIVAL","description":"Cruelty-free sneakers made with premium vegan leather and eco-friendly soles.","displayCategory":"FOOTWEAR","id":"p6","price":90,"image":"https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop","imageCategory":"sneakers"}];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ditris_products', JSON.stringify(products));
      localStorage.setItem('ditris_brand_owner', currentStoreBrand);
    } catch {}
  }, [products]);

  // Global Dynamic Categories State
  const [categories, setCategories] = useState<any[]>([{"id":"c1","name":"NEW ARRIVALS","description":"NEW ARRIVALS CATEGORY","status":"VISIBLE"},{"id":"c2","name":"TOPS","description":"TOPS CATEGORY","status":"VISIBLE"},{"id":"c3","name":"BOTTOMS","description":"BOTTOMS CATEGORY","status":"VISIBLE"},{"id":"c4","name":"ACCESSORIES","description":"ACCESSORIES CATEGORY","status":"VISIBLE"},{"id":"c5","name":"SALE","description":"SALE CATEGORY","status":"VISIBLE"}]);

  // Global Dynamic Collections State
  const [collections, setCollections] = useState<any[]>([{"id":"col1","title":"EarthThread Apparel FLAGSHIP CAPSULE","season":"PERMANENT COLLECTION","bannerImage":"https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop"},{"id":"col2","title":"EarthThread Apparel EDITION N° 01","season":"CURRENT SEASON","bannerImage":"https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop"}]);

  // Global Dynamic Orders State with Brand-Match Guard
  const [orders, setOrders] = useState<any[]>(() => {
    try {
      const savedBrand = localStorage.getItem('ditris_brand_owner');
      const savedOrders = localStorage.getItem('ditris_orders');
      if (savedBrand === currentStoreBrand && savedOrders) {
        return JSON.parse(savedOrders);
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ditris_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Global Dynamic Site Content & Banners State with Brand-Match Guard
  const [siteContent, setSiteContent] = useState<any>(() => {
    try {
      const savedBrand = localStorage.getItem('ditris_brand_owner');
      const savedContent = localStorage.getItem('ditris_site_content');
      if (savedBrand === currentStoreBrand && savedContent) {
        const parsed = JSON.parse(savedContent);
        if (parsed?.brandName === currentStoreBrand) {
          return parsed;
        }
      }
      return {"brandName":"EarthThread Apparel","banner1":{"title":"EarthThread Apparel OFFICIAL","subtitle":"CATALOGUE N° 01 / EDITORIAL","image":"https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop","ctaText":"SHOP NOW"},"banner2":{"title":"NEW ARRIVALS","subtitle":"NEW ARRIVALS / SEASON 24","image":"https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop","ctaText":"SHOP NOW"},"announcementText":"COMPLIMENTARY WORLDWIDE EXPRESS DELIVERY ON ORDERS OVER $200"};
    } catch {
      return {"brandName":"EarthThread Apparel","banner1":{"title":"EarthThread Apparel OFFICIAL","subtitle":"CATALOGUE N° 01 / EDITORIAL","image":"https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop","ctaText":"SHOP NOW"},"banner2":{"title":"NEW ARRIVALS","subtitle":"NEW ARRIVALS / SEASON 24","image":"https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop","ctaText":"SHOP NOW"},"announcementText":"COMPLIMENTARY WORLDWIDE EXPRESS DELIVERY ON ORDERS OVER $200"};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ditris_site_content', JSON.stringify(siteContent));
      localStorage.setItem('ditris_brand_owner', currentStoreBrand);
    } catch {}
  }, [siteContent]);

  // Region & Location Preference State
  const [selectedRegion, setSelectedRegion] = useState({
    country: 'UNITED STATES',
    currency: 'USD ($)',
    code: 'US',
  });

  // Welcome / Location Detect Modal state (AUTO-TRIGGERS ON LOAD)
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(() => {
    try {
      return !sessionStorage.getItem('ditris_region_seen_' + currentStoreBrand);
    } catch {
      return true;
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const handleSignIn = (userData: any) => {
    setUser(userData);
    try {
      localStorage.setItem('ditris_user_session', JSON.stringify(userData));
    } catch {}
  };

  const handleSignOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('ditris_user_session');
    } catch {}
  };

  const handleToggleWishlist = (product: any) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.id === item.id && i.size === item.size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  // Product CRUD Handlers
  const handleSaveProduct = (productData: any) => {
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === productData.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...productData };
        return next;
      }
      return [productData, ...prev];
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Category CRUD Handlers
  const handleSaveCategory = (categoryData: any) => {
    setCategories(prev => {
      const idx = prev.findIndex(c => c.id === categoryData.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...categoryData };
        return next;
      }
      return [...prev, categoryData];
    });
  };

  // Collection CRUD Handler
  const handleCreateCollection = (collectionData: any) => {
    setCollections(prev => [collectionData, ...prev]);
  };

  // Order Placement Handler
  const handlePlaceOrder = (orderPayload: any) => {
    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'PROCESSING',
      items: cartItems,
      total: orderPayload.total || cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
      shipping: orderPayload.shipping || {},
    };
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]); // Clear bag after order
  };

  const handleUpdateBanner = (key: 'banner1' | 'banner2', updatedData: any) => {
    setSiteContent((prev: any) => ({
      ...prev,
      [key]: { ...prev[key], ...updatedData },
    }));
  };

  const handleSelectRegion = (region: { country: string; currency: string; code: string }) => {
    setSelectedRegion(region);
    try {
      sessionStorage.setItem('ditris_region_seen_' + currentStoreBrand, 'true');
    } catch {}
  };

  const wishlistIds = wishlistItems.map(i => i.id);

  return (
    <Router>
      <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-black selection:text-white">
        <Navbar
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          user={user}
          isAdminMode={isAdminMode}
          selectedRegion={selectedRegion}
          onSignOut={handleSignOut}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenRegion={() => setIsWelcomeOpen(true)}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  siteContent={siteContent}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistIds}
                  isAdminMode={isAdminMode}
                  onUpdateBanner={handleUpdateBanner}
                />
              }
            />
            <Route path="/shop" element={<Shop products={products} categories={categories} />} />
            <Route path="/shop/:category" element={<Shop products={products} categories={categories} />} />
            <Route path="/product/:id" element={<ProductDetails products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orders" element={<Orders orders={orders} />} />
            <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
            <Route path="/profile" element={<Profile user={user} onSignOut={handleSignOut} />} />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlistItems={wishlistItems}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  cartItems={cartItems}
                  onPlaceOrder={handlePlaceOrder}
                />
              }
            />
            <Route path="/admin" element={<AdminSignIn setIsAdminMode={setIsAdminMode} />} />
            <Route path="/admin/dashboard" element={<AdminDashboard products={products} orders={orders} />} />
            <Route
              path="/admin/products"
              element={
                <AdminProducts
                  products={products}
                  categories={categories}
                  onDeleteProduct={handleDeleteProduct}
                />
              }
            />
            <Route
              path="/admin/products/new"
              element={
                <AdminProductNew
                  products={products}
                  categories={categories}
                  onAddProduct={handleSaveProduct}
                />
              }
            />
            <Route
              path="/admin/products/:id/edit"
              element={
                <AdminProductNew
                  products={products}
                  categories={categories}
                  onEditProduct={handleSaveProduct}
                />
              }
            />
            <Route
              path="/admin/categories"
              element={
                <AdminCategories
                  categories={categories}
                  onSaveCategory={handleSaveCategory}
                />
              }
            />
            <Route
              path="/admin/collections"
              element={
                <AdminCollections
                  collections={collections}
                  onCreateCollection={handleCreateCollection}
                />
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminOrders
                  orders={orders}
                  setOrders={setOrders}
                />
              }
            />
            <Route
              path="/admin/site-content"
              element={
                <AdminSiteContent
                  siteContent={siteContent}
                  setSiteContent={setSiteContent}
                />
              }
            />
          </Routes>
        </main>

        <Footer isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />

        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        <WelcomeModal
          isOpen={isWelcomeOpen}
          onClose={() => {
            setIsWelcomeOpen(false);
            try { sessionStorage.setItem('ditris_region_seen_' + currentStoreBrand, 'true'); } catch {}
          }}
          selectedRegion={selectedRegion}
          onSelectRegion={handleSelectRegion}
          brandName={siteContent.brandName || 'EarthThread Apparel'}
        />
      </div>
    </Router>
  );
}
