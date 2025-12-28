import React, { useState, useEffect, useContext } from 'react';
import { 
  Search, ShoppingCart, Heart, Star, Clock, Shield, 
  Truck, Phone, MapPin, Filter, ChevronRight, Home,
  Package, TrendingUp, Award, Users, Menu, X,
  Plus, Minus, Trash2, CreditCard, ShieldCheck,
  ArrowRight, Pill, Syringe, Thermometer, Droplet, User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

// Medicine Data
const medicines = [
  {
    "id": 1,
    "disease": "Acne Vulgaris",
    "treatment_name": "Benzoyl Peroxide 5% Gel",
    "brand": "Galderma",
    "description": "Topical antibacterial treatment that kills P. acnes bacteria and helps clear clogged pores (comedones) and inflammatory papules.",
    "price": 217,
    "originalPrice": 255,
    "discount": 15,
    "category": "Acne Treatment",
    "rating": 4.6,
    "reviews": 850,
    "inStock": true,
    "deliveryTime": "45 min",
    "image": "https://skincleanclinic.com/wp-content/uploads/2021/06/galderma-benzoyl-peroxide-scaled-1.jpg",
    "prescription": false,
    "quantity": "15g Tube"
  },
  {
    "id": 2,
    "disease": "Rosacea",
    "treatment_name": "Azelaic Acid 15% Gel",
    "brand": "Finacea",
    "description": "Reduces skin inflammation and redness (erythema). Effective for treating the papules and pustules associated with rosacea.",
    "price": 2530.59,
    "originalPrice": 2530.59,
    "discount": 0,
    "category": "Redness Relief",
    "rating": 4.4,
    "reviews": 320,
    "inStock": true,
    "deliveryTime": "1 hour",
    "image": "https://cdn.shopify.com/s/files/1/0442/4921/9239/products/Finacea-azelaic-acid-15_-acne-spot-gel-medicine-box.jpg?v=1619619336",
    "prescription": true,
    "quantity": "30g Tube"
  },
  {
    "id": 3,
    "disease": "Eczema (Atopic Dermatitis)",
    "treatment_name": "Hydrocortisone 1% Cream",
    "brand": "Cortizone-10",
    "description": "A mild corticosteroid that relieves intense itching (pruritus) and reduces inflammation in flexural creases.",
    "price": 492.82,
    "originalPrice": 500,
    "discount": 2,
    "category": "Anti-itch",
    "rating": 4.7,
    "reviews": 1200,
    "inStock": true,
    "deliveryTime": "30 min",
    "image": "https://i5.walmartimages.com/seo/Cortizone-10-Intensive-Moisture-1-Hydrocortisone-Anti-Itch-Cream-for-Eczema-and-Bug-Bite-Relief-Maximum-Strength-1-oz_5c9bceba-f37a-4c1e-a030-b2541fcbd484.47b200827037b636584564bca54fc3cc.jpeg",
    "prescription": false,
    "quantity": "28g Tube"
  },
  {
    "id": 4,
    "disease": "Psoriasis",
    "treatment_name": "Coal Tar Topical Solution",
    "brand": "MG217",
    "description": "Slows the rapid growth of skin cells to reduce silver scaling and plaque thickness on elbows and knees.",
    "price": 7701.92,
    "originalPrice": 11473.89,
    "discount": 38,
    "category": "Psoriasis Care",
    "rating": 4.3,
    "reviews": 540,
    "inStock": true,
    "deliveryTime": "2 hours",
    "image": "https://www.prestoimages.net/store30/rd14324/14324_pd3138241_8_otc739671.jpg",
    "prescription": false,
    "quantity": "113.4ml Bottle"
  },
  {
    "id": 5,
    "disease": "Fungal Infection (Tinea)",
    "treatment_name": "Clotrimazole 1% Cream",
    "brand": "Lotrimin",
    "description": "Antifungal agent that treats ringworm by targeting the active red border and clearing the infection center.",
    "price": 2961,
    "originalPrice": 3256,
    "discount": 10,
    "category": "Antifungal",
    "rating": 4.8,
    "reviews": 2100,
    "inStock": true,
    "deliveryTime": "30 min",
    "image": "https://images.heb.com/is/image/HEBGrocery/000231220-1",
    "prescription": false,
    "quantity": "12g Tube"
  },
  {
    "id": 6,
    "disease": "Contact Dermatitis",
    "treatment_name": "Calamine Anti-Itch Lotion",
    "brand": "Humco",
    "description": "Drying agent for weeping/oozing vesicles caused by poison ivy or allergic reactions to triggers.",
    "price": 685.81,
    "originalPrice": 700,
    "discount": 2,
    "category": "Skin Protectant",
    "rating": 4.5,
    "reviews": 980,
    "inStock": true,
    "deliveryTime": "30 min",
    "image": "https://images.freshop.com/00303950413969/2e9db718c2ab0a1eea1c57f1257ae319_large.png",
    "prescription": false,
    "quantity": "177ml Bottle"
  },
  {
    "id": 7,
    "disease": "Seborrheic Dermatitis",
    "treatment_name": "Ketoconazole 2% Shampoo",
    "brand": "Nizoral",
    "description": "Targets Malassezia yeast to remove greasy yellow scales from the scalp and nasolabial folds.",
    "price": 2461.38,
    "originalPrice": 2700,
    "discount": 10,
    "category": "Medicated Shampoo",
    "rating": 4.9,
    "reviews": 3400,
    "inStock": true,
    "deliveryTime": "45 min",
    "image": "https://skinsort.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOVRLQ0E9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b2e7081236da4549dd02db21e2f841016d4e8341/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0M2QU5wQXVnRE9ncHpZWFpsY25zR09neHhkV0ZzYVhSNWFVcz0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--de5ec8f4d87208741dc6d32ada91b5aaba79d3a6/NIZO001___XL-10582789.jpg",
    "prescription": false,
    "quantity": "400ml Bottle"
  },
  {
    "id": 8,
    "disease": "Urticaria (Hives)",
    "treatment_name": "Cetirizine 10mg Tablets",
    "brand": "Zyrtec",
    "description": "Second-generation antihistamine that stops the flare reaction and prevents the formation of new wheals.",
    "price": 1929.97,
    "originalPrice": 2000,
    "discount": 2,
    "category": "Allergy Relief",
    "rating": 4.7,
    "reviews": 1500,
    "inStock": true,
    "deliveryTime": "30 min",
    "image": "https://images.ctfassets.net/k3yb2k40jz5v/4Zx6A53goEdyVgYLP0ShVx/52a15536f78ff0301df6d075f8c1594e/tabletpackageshot.webp",
    "prescription": false,
    "quantity": "30 Tablets"
  },
  {
    "id": 9,
    "disease": "Vitiligo",
    "treatment_name": "Tacrolimus 0.1% Ointment",
    "brand": "Protopic",
    "description": "Non-steroidal calcineurin inhibitor used for repigmentation of chalk-white patches, especially on the face.",
    "price": 4843.14,
    "originalPrice": 5000,
    "discount": 4,
    "category": "Immunomodulator",
    "rating": 4.2,
    "reviews": 180,
    "inStock": true,
    "deliveryTime": "1 day",
    "image": "http://egyptiandrugstore.com/image/cache/data/MANAR23/PROTOPIC-500x500.png",
    "prescription": true,
    "quantity": "30g Ointment"
  },
  {
    "id": 10,
    "disease": "Impetigo",
    "treatment_name": "Mupirocin 2% Ointment",
    "brand": "Bactroban",
    "description": "Topical antibiotic specifically for S. aureus to clear honey-colored crusts and prevent bacterial spread.",
    "price": 900,
    "originalPrice": 900,
    "discount": 0,
    "category": "Antibiotic",
    "rating": 4.6,
    "reviews": 410,
    "inStock": true,
    "deliveryTime": "2 hours",
    "image": "https://st-b.medsgo.ph/images/detailed/22/mupirocin.JPG",
    "prescription": true,
    "quantity": "15g Tube"
  },
  {
    "id": 11,
    "disease": "Folliculitis",
    "treatment_name": "Chlorhexidine Gluconate 4%",
    "brand": "Hibiclens",
    "description": "Antiseptic skin cleanser that treats inflammation centered on the hair follicle and prevents bacterial growth.",
    "price": 3948.81,
    "originalPrice": 4000,
    "discount": 2,
    "category": "Antiseptic",
    "rating": 4.5,
    "reviews": 720,
    "inStock": true,
    "deliveryTime": "1 hour",
    "image": "https://pss.azurewebsites.net/images/thumbs/0003218_hibiclens-chlorhexidine-gluconate-solution-4_550.jpeg",
    "prescription": false,
    "quantity": "946ml Bottle"
  },
  {
    "id": 12,
    "disease": "Scabies",
    "treatment_name": "Permethrin 5% Cream",
    "brand": "Elimite",
    "description": "Powerful insecticide that kills Sarcoptes scabiei mites and their eggs within the burrows.",
    "price": 2800.19,
    "originalPrice": 3000,
    "discount": 13,
    "category": "Scabicide",
    "rating": 4.4,
    "reviews": 890,
    "inStock": true,
    "deliveryTime": "3 hours",
    "image": "http://www.naturespharmacy.biz/elimite1.jpg",
    "prescription": true,
    "quantity": "60g Tube"
  },
  {
    "id": 13,
    "disease": "Warts (Verruca)",
    "treatment_name": "Salicylic Acid 17% Liquid",
    "brand": "Compound W",
    "description": "Keratolytic treatment that removes the verrucous surface layer by layer until the black dots are gone.",
    "price": 896.76,
    "originalPrice": 1000,
    "discount": 12,
    "category": "Wart Remover",
    "rating": 4.2,
    "reviews": 1100,
    "inStock": true,
    "deliveryTime": "30 min",
    "image": "https://m.media-amazon.com/images/I/61XU5hnWJQL._SL1500_.jpg",
    "prescription": false,
    "quantity": "30ml Liquid"
  },
  {
    "id": 14,
    "disease": "Herpes Simplex (HSV)",
    "treatment_name": "Acyclovir 5% Cream",
    "brand": "Zovirax",
    "description": "Antiviral cream that shortens healing time for fluid-filled vesicles and reduces stinging/pain.",
    "price": 3000,
    "originalPrice": 3000,
    "discount": 0,
    "category": "Antiviral",
    "rating": 4.7,
    "reviews": 630,
    "inStock": true,
    "deliveryTime": "45 min",
    "image": "https://prescriptiongiant.com/wp-content/uploads/2021/04/zovirax_crm_5gm-1.jpg",
    "prescription": true,
    "quantity": "5g Tube"
  },
  {
    "id": 15,
    "disease": "Melasma",
    "treatment_name": "Hydroquinone 2% Cream",
    "brand": "Ambi",
    "description": "Fades symmetric, fuzzy-bordered hyperpigmentation and mask-like centrofacial patterns triggered by UV exposure or hormonal changes.",
    "price": 2692.98,
    "originalPrice": 2800,
    "discount": 4,
    "category": "Skin Lightening",
    "rating": 4.1,
    "reviews": 450,
    "inStock": true,
    "deliveryTime": "30 min",
    "image": "https://assets.wakefern.com/is/image/wakefern/85000423402-001?$Mi9Product_detail$",
    "prescription": false,
    "quantity": "56g"
  }
];

// Categories
const categories = [
  { id: 1, name: "Pain Relief", icon: <Thermometer className="w-5 h-5" />, color: "bg-red-100 text-red-600" },
  { id: 2, name: "Antibiotics", icon: <Syringe className="w-5 h-5" />, color: "bg-blue-100 text-blue-600" },
  { id: 3, name: "Supplements", icon: <Pill className="w-5 h-5" />, color: "bg-green-100 text-green-600" },
  { id: 4, name: "Allergy", icon: <Droplet className="w-5 h-5" />, color: "bg-purple-100 text-purple-600" },
  { id: 5, name: "Digestive", icon: <Package className="w-5 h-5" />, color: "bg-orange-100 text-orange-600" },
  { id: 6, name: "Cardiac", icon: <Heart className="w-5 h-5" />, color: "bg-pink-100 text-pink-600" },
  { id: 7, name: "Skin Care", icon: <Shield className="w-5 h-5" />, color: "bg-teal-100 text-teal-600" },
  { id: 8, name: "Diabetes", icon: <TrendingUp className="w-5 h-5" />, color: "bg-yellow-100 text-yellow-600" }
];

const PharmacyHome = () => {
  const { isLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Add to cart function
  const addToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
    
    // Show notification
    showNotification(`${medicine.name} added to cart!`);
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    showNotification("Item removed from cart");
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Add to wishlist
  const toggleWishlist = (medicine) => {
    if (wishlist.find(item => item.id === medicine.id)) {
      setWishlist(wishlist.filter(item => item.id !== medicine.id));
      showNotification("Removed from wishlist");
    } else {
      setWishlist([...wishlist, medicine]);
      showNotification("Added to wishlist!");
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  // Filter and sort medicines
  useEffect(() => {
    let results = medicines;
    
    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter(medicine => medicine.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      results = results.filter(medicine =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by prescription requirement
    if (showPrescription) {
      results = results.filter(medicine => medicine.prescription);
    }
    
    // Sort results
    switch(sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        results.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // Featured (default order)
        break;
    }
    
    setFilteredMedicines(results);
  }, [selectedCategory, searchQuery, sortBy, showPrescription]);

  // Notification function
  const showNotification = (message) => {
    setNotification({ show: true, message });
  };

  // Checkout function
  const handleCheckout = () => {
    if (cart.length === 0) {
      showNotification("Your cart is empty!");
      return;
    }
    
    // In a real app, you would navigate to checkout page
    showNotification(`Proceeding to checkout! Total: ₹${cartTotal.toFixed(2)}`);
    setShowCart(false);
  };

  // Go to home
  const goToHome = () => {
    navigate('/');
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("featured");
    setShowPrescription(false);
  };

  return (
    <div className="min-h-screen bg-blue-200 relative overflow-hidden">
      
      {notification.show && (
        <div className="fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50">
          {notification.message}
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-1500"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo and Home Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={goToHome}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full hover:shadow-lg transition-all group"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Home</span>
              </button>
              
              <div className="hidden md:flex items-center gap-2">
                <Pill className="w-8 h-8 text-teal-600" />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-700 bg-clip-text text-transparent">MediStore</h1>
                  <p className="text-xs text-gray-500">Your Trusted Pharmacy</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search medicines, brands, or symptoms..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-teal-600 transition-colors">
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 hover:text-teal-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {isLogin ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate('/profile-card')}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-lg font-semibold text-gray-600">
                      {isLogin && user && user.fullname ? user.fullname.charAt(0).toUpperCase() : <User className="w-6 h-6 text-gray-600" />}
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Sign In
                </button>
              )}
              
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2 text-gray-600"
              >
                {showFilters ? <X className="w-6 h-6" /> : <Filter className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Your Health, Our Priority
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Get genuine medicines delivered to your doorstep in minutes. 
                Prescription verification and doctor consultation available.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <ShieldCheck className="w-5 h-5" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Truck className="w-5 h-5" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Phone className="w-5 h-5" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">5000+</div>
            <p className="text-gray-600 text-sm">Medicines Available</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">30min</div>
            <p className="text-gray-600 text-sm">Average Delivery</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">4.8★</div>
            <p className="text-gray-600 text-sm">Customer Rating</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">24/7</div>
            <p className="text-gray-600 text-sm">Pharmacist Support</p>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <button className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                selectedCategory === "All" 
                  ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-white border-gray-200 hover:border-teal-300 hover:shadow-md'
              }`}
            >
              <Package className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">All</span>
            </button>
            
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                  selectedCategory === category.name 
                    ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg' 
                    : 'bg-white border-gray-200 hover:border-teal-300 hover:shadow-md'
                }`}
              >
                <div className={`p-2 rounded-lg mb-2 ${category.color}`}>
                  {category.icon}
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className={`mb-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select 
                    className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-teal-400"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="discount">Best Discount</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="prescription"
                    checked={showPrescription}
                    onChange={(e) => setShowPrescription(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="prescription" className="text-sm text-gray-700">
                    Prescription Required
                  </label>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Clear Filters
                </button>
                <div className="text-sm text-gray-600">
                  Showing {filteredMedicines.length} of {medicines.length} products
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedicines.map(medicine => (
              <div 
                key={medicine.id} 
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Medicine Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={medicine.image} 
                    alt={medicine.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Discount Badge */}
                  {medicine.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {medicine.discount}% OFF
                    </div>
                  )}
                  
                  {/* Prescription Badge */}
                  {medicine.prescription && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Rx
                    </div>
                  )}
                  
                  {/* Stock Status */}
                  {!medicine.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="bg-white px-4 py-2 rounded-lg font-bold text-red-600">
                        Out of Stock
                      </div>
                    </div>
                  )}
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(medicine)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${isInWishlist(medicine.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                  </button>
                </div>

                {/* Medicine Info */}
                <div className="p-6">
                  {/* Category */}
                  <div className="text-xs text-gray-500 mb-2">{medicine.category}</div>
                  
                  {/* Name and Brand */}
                  <h3 className="font-bold text-gray-900 mb-1">{medicine.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">by {medicine.brand}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(medicine.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({medicine.reviews})</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {medicine.description}
                  </p>
                </div>

                {/* Price and Actions */}
                <div className="px-6 pb-6 pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">₹{medicine.price.toFixed(2)}</span>
                        {medicine.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">₹{medicine.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {medicine.deliveryTime} delivery
                      </div>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(medicine)}
                    disabled={!medicine.inStock}
                    className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      medicine.inStock
                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:shadow-lg hover:from-teal-600 hover:to-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prescription Section */}
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Prescription Medicines?</h2>
              <p className="text-gray-600 mb-6">
                Upload your prescription and get medicines delivered. Our pharmacists verify 
                all prescriptions to ensure your safety.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all" onClick={()=>{navigate("/health-reports")}}>
                Upload Prescription
              </button>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Prescription"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>

      </main>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white h-full overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-teal-600" />
                  <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                </div>
                <button 
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{cartCount} items</span>
                <span className="font-bold text-gray-900">₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Cart Items */}
            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-sm text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Cart Summary */}
                  <div className="space-y-4 mt-8">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Discount</span>
                      <span className="text-green-600">-₹0.00</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Checkout Button */}
                    <button 
                      onClick={handleCheckout}
                      className="w-full mt-6 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Proceed to Checkout
                    </button>
                    
                    <button 
                      onClick={() => setShowCart(false)}
                      className="w-full py-3 text-gray-600 hover:text-gray-800"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

            {/* Footer */}

            <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-12">

              <div className="container mx-auto px-4 py-12">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                  <div>

                    <div className="flex items-center gap-2 mb-4">

                      <Pill className="w-8 h-8 text-teal-400" />

                      <span className="text-xl font-bold">MediStore</span>

                    </div>

                    <p className="text-gray-400 text-sm">

                      Your trusted partner for genuine medicines and healthcare products.

                    </p>

                  </div>

                  

                  <div>

                    <h3 className="font-bold mb-4">Quick Links</h3>

                    <ul className="space-y-2 text-gray-400">

                      <li><button className="hover:text-white">All Medicines</button></li>

                      <li><button className="hover:text-white">Upload Prescription</button></li>

                      <li><button className="hover:text-white">Doctor Consultation</button></li>

                      <li><button className="hover:text-white">Health Care</button></li>

                    </ul>

                  </div>

                  

                  <div>

                    <h3 className="font-bold mb-4">Support</h3>

                    <ul className="space-y-2 text-gray-400">

                      <li><button className="hover:text-white">Help Center</button></li>

                      <li><button className="hover:text-white">Contact Us</button></li>

                      <li><button className="hover:text-white">Privacy Policy</button></li>

                      <li><button className="hover:text-white">Terms of Service</button></li>

                    </ul>

                  </div>

                  

                  <div>

                    <h3 className="font-bold mb-4">Contact Us</h3>

                    <div className="space-y-3 text-gray-400">

                      <div className="flex items-center gap-2">

                        <Phone className="w-4 h-4" />

                        <span>1800-123-4567</span>

                      </div>

                      <div className="flex items-center gap-2">

                        <MapPin className="w-4 h-4" />

                        <span>24/7 Support Available</span>

                      </div>

                    </div>

                  </div>

                </div>

                

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">

                  © 2024 MediStore. All rights reserved.

                </div>

              </div>

            </footer>

          </div>

        );

      };

      

      export default PharmacyHome;