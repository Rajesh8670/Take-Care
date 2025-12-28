import { useState } from "react";
import { MapPin, Phone, Calendar, Stethoscope, Star, Clock, Shield, MessageCircle, Home, ChevronRight, Zap, Users, Award, Sparkles, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const doctors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Dermatologist",
    experience: "8+ Years Experience",
    location: "Kolkata, India",
    phone: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 128,
    availability: "Available Today",
    fee: "₹800",
    languages: ["English", "Hindi", "Bengali"],
    badges: ["Top Rated", "Telemedicine"],
    category: "Dermatologist"
  },
  {
    id: 2,
    name: "Dr. Rahul Verma",
    specialty: "General Physician",
    experience: "10+ Years Experience",
    location: "Delhi, India",
    phone: "+91 99887 66554",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 96,
    availability: "Available Now",
    fee: "₹600",
    languages: ["English", "Hindi"],
    badges: ["24/7 Available"],
    category: "General Physician"
  },
  {
    id: 3,
    name: "Dr. Sneha Banerjee",
    specialty: "Cardiologist",
    experience: "12+ Years Experience",
    location: "Mumbai, India",
    phone: "+91 91234 56789",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviews: 201,
    availability: "Tomorrow 10 AM",
    fee: "₹1200",
    languages: ["English", "Hindi", "Marathi"],
    badges: ["Expert", "Senior Consultant"],
    category: "Cardiologist"
  },
  {
    id: 4,
    name: "Dr. Arjun Mehta",
    specialty: "Orthopedic Surgeon",
    experience: "15+ Years Experience",
    location: "Bangalore, India",
    phone: "+91 90123 45678",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 167,
    availability: "Available Today",
    fee: "₹1500",
    languages: ["English", "Hindi", "Kannada"],
    badges: ["Surgical Specialist"],
    category: "Orthopedic"
  },
  {
    id: 5,
    name: "Dr. Priya Singh",
    specialty: "Pediatrician",
    experience: "9+ Years Experience",
    location: "Chennai, India",
    phone: "+91 88997 77665",
    image: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 142,
    availability: "Available Now",
    fee: "₹700",
    languages: ["English", "Hindi", "Tamil"],
    badges: ["Child Specialist"],
    category: "Pediatrician"
  },
  {
    id: 6,
    name: "Dr. Vikram Patel",
    specialty: "Neurologist",
    experience: "14+ Years Experience",
    location: "Ahmedabad, India",
    phone: "+91 77665 44332",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 89,
    availability: "Monday 2 PM",
    fee: "₹1800",
    languages: ["English", "Hindi", "Gujarati"],
    badges: ["Neuro Specialist"],
    category: "Neurologist"
  },
  {
    id: 7,
    name: "Dr. Nandini Reddy",
    specialty: "Gynecologist",
    experience: "11+ Years Experience",
    location: "Hyderabad, India",
    phone: "+91 88776 55443",
    image: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 156,
    availability: "Available Today",
    fee: "₹900",
    languages: ["English", "Hindi", "Telugu"],
    badges: ["Women's Health"],
    category: "Gynecologist"
  },
  {
    id: 8,
    name: "Dr. Rajesh Kumar",
    specialty: "Psychiatrist",
    experience: "13+ Years Experience",
    location: "Pune, India",
    phone: "+91 99889 77665",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 113,
    availability: "Available Now",
    fee: "₹1000",
    languages: ["English", "Hindi", "Marathi"],
    badges: ["Mental Health"],
    category: "Psychiatrist"
  }
];

const ConsultDoctor = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [availabilityFilter, setAvailabilityFilter] = useState("Any Time");
  const [priceFilter, setPriceFilter] = useState("Any Price");
  const [languageFilter, setLanguageFilter] = useState("Any Language");
  const navigate = useNavigate();

  const specialties = ["All", "Dermatologist", "General Physician", "Cardiologist", "Orthopedic", "Pediatrician", "Neurologist", "Gynecologist", "Psychiatrist"];
  
  // Function to handle search
  const handleSearch = () => {
    let results = doctors;
    
    // Apply search query
    if (searchQuery.trim() !== "") {
      results = results.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply specialty filter
    if (selectedSpecialty !== "All") {
      results = results.filter(doctor => doctor.category === selectedSpecialty);
    }
    
    // Apply availability filter
    if (availabilityFilter !== "Any Time") {
      results = results.filter(doctor => {
        if (availabilityFilter === "Available Now") {
          return doctor.availability.includes("Available Now");
        } else if (availabilityFilter === "Today") {
          return doctor.availability.includes("Today");
        } else if (availabilityFilter === "This Week") {
          return doctor.availability.includes("Tomorrow") || doctor.availability.includes("Monday");
        }
        return true;
      });
    }
    
    // Apply price filter
    if (priceFilter !== "Any Price") {
      results = results.filter(doctor => {
        const price = parseInt(doctor.fee.replace('₹', ''));
        switch(priceFilter) {
          case "Under ₹500":
            return price < 500;
          case "₹500 - ₹1000":
            return price >= 500 && price <= 1000;
          case "₹1000 - ₹2000":
            return price >= 1000 && price <= 2000;
          case "Above ₹2000":
            return price > 2000;
          default:
            return true;
        }
      });
    }
    
    // Apply language filter
    if (languageFilter !== "Any Language") {
      results = results.filter(doctor => 
        doctor.languages.some(lang => 
          lang.toLowerCase().includes(languageFilter.toLowerCase())
        )
      );
    }
    
    setFilteredDoctors(results);
  };

  // Function to handle specialty filter change
  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty);
    let results = doctors;
    
    if (specialty !== "All") {
      results = results.filter(doctor => doctor.category === specialty);
    }
    
    // Apply other existing filters
    if (searchQuery.trim() !== "") {
      results = results.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredDoctors(results);
  };

  // Function to handle booking appointment
  const handleBookAppointment = (doctor) => {
    alert(`Booking appointment with ${doctor.name}\n\nSpecialty: ${doctor.specialty}\nFee: ${doctor.fee}\nPhone: ${doctor.phone}\n\nPlease select your preferred date and time.`);
    // In a real app, you would navigate to a booking page or open a modal
  };

  // Function to handle chat with assistant
  const handleChatWithAssistant = (doctor) => {
    alert(`Connecting you to chat assistant for ${doctor.name}\n\nYou will be redirected to our secure chat platform to discuss your health concerns with ${doctor.name}'s assistant.`);
  };

  // Function to handle search on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Function to apply advanced filters
  const applyAdvancedFilters = () => {
    handleSearch();
    setShowFilters(false); // Close filters after applying
  };

  const goToHome = () => {
    navigate('/');
  };

  // Initialize filtered doctors on component mount
  useState(() => {
    setFilteredDoctors(doctors);
  }, []);

  return (
    <div className="min-h-screen bg-blue-200 px-4 py-8 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-1500"></div>
      </div>

      {/* Home Navigation Button */}
      <button
        onClick={goToHome}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group border border-gray-200"
      >
        <Home className="w-4 h-4 text-teal-600 group-hover:text-teal-700 transition-colors" />
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Home</span>
      </button>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto">
        
        {/* Hero Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-2.5 bg-gradient-to-r from-teal-500/10 to-blue-500/10 backdrop-blur-sm rounded-full border border-teal-200/50">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">100+ Certified Doctors</span>
            <Shield className="w-4 h-4 text-blue-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Consult a Doctor
            <span className="block text-2xl md:text-3xl font-normal mt-3 text-gray-600">
              Connect with India's Top Medical Experts
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Book instant appointments, video consultations, or chat with experienced medical professionals. 
            Your health is our priority.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">{doctors.length}</div>
              <p className="text-gray-600 text-sm">Doctors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">98%</div>
              <p className="text-gray-600 text-sm">Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">15min</div>
              <p className="text-gray-600 text-sm">Avg. Response</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">500+</div>
              <p className="text-gray-600 text-sm">Consultations</p>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search doctors by name, specialty, or symptoms..."
                    className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    onClick={handleSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Search
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="px-5 py-3 border-2 border-teal-200 text-teal-600 font-medium rounded-xl hover:bg-teal-50 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filters {showFilters ? "(Hide)" : "(Show)"}
              </button>
            </div>

            {/* Specialty Filters */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-3">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => handleSpecialtyChange(specialty)}
                    className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                      selectedSpecialty === specialty
                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Filters (Collapsible) */}
            {showFilters && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-400"
                      value={availabilityFilter}
                      onChange={(e) => setAvailabilityFilter(e.target.value)}
                    >
                      <option>Any Time</option>
                      <option>Available Now</option>
                      <option>Today</option>
                      <option>This Week</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee</label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-400"
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                    >
                      <option>Any Price</option>
                      <option>Under ₹500</option>
                      <option>₹500 - ₹1000</option>
                      <option>₹1000 - ₹2000</option>
                      <option>Above ₹2000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-400"
                      value={languageFilter}
                      onChange={(e) => setLanguageFilter(e.target.value)}
                    >
                      <option>Any Language</option>
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Regional</option>
                    </select>
                  </div>
                </div>
                
                {/* Apply Filters Button */}
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={applyAdvancedFilters}
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} of {doctors.length} doctors
            {selectedSpecialty !== "All" && ` in ${selectedSpecialty}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
              <p className="text-gray-600 text-lg mb-4">No doctors found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("All");
                  setAvailabilityFilter("Any Time");
                  setPriceFilter("Any Price");
                  setLanguageFilter("Any Language");
                  setFilteredDoctors(doctors);
                }}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="group bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Doctor Image & Badges */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                    {doctor.badges.map((badge, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-bold rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                  
                  {/* Speciality Badge */}
                  <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-teal-600" />
                      <span className="font-bold text-gray-800">{doctor.specialty}</span>
                    </div>
                  </div>
                </div>

                {/* Consultation Fee Display Below Image */}
                <div className="px-6 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900">
                      Consultation Fee
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-lg shadow-lg">
                      {doctor.fee}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Per visit • Includes initial assessment
                  </p>
                </div>

                {/* Doctor Info */}
                <div className="p-6 pt-4">
                  {/* Name & Rating */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-gray-800">{doctor.rating}</span>
                        <span className="text-gray-500 text-sm">({doctor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                        <Clock className="w-4 h-4" />
                        {doctor.availability}
                      </div>
                    </div>
                  </div>

                  {/* Experience & Location */}
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-500" />
                      {doctor.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span>Speaks: {doctor.languages.join(", ")}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => handleBookAppointment(doctor)}
                      className="w-full flex items-center justify-center gap-3 py-3.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-teal-600 hover:to-blue-700 transition-all group/btn"
                    >
                      <Calendar className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      Book Appointment
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={`tel:${doctor.phone}`}
                        className="flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        Call Now
                      </a>
                      <button 
                        onClick={() => handleChatWithAssistant(doctor)}
                        className="flex items-center justify-center gap-2 py-3 bg-teal-50 text-teal-700 font-medium rounded-xl hover:bg-teal-100 transition-all border border-teal-200"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Consultation Options */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 border border-teal-100 shadow-lg">
            <div className="inline-flex p-4 bg-teal-100 rounded-xl mb-6">
              <MessageCircle className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Chat Consultation</h3>
            <p className="text-gray-600 mb-6">Quick answers to your health questions via secure messaging.</p>
            <button className="text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-2">
              Start Chat <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 shadow-lg">
            <div className="inline-flex p-4 bg-blue-100 rounded-xl mb-6">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Clinic Visit</h3>
            <p className="text-gray-600 mb-6">Book in-person appointments with top specialists near you.</p>
            <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
              Find Clinics <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100 shadow-lg">
            <div className="inline-flex p-4 bg-purple-100 rounded-xl mb-6">
              <MessageCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Online Follow-up</h3>
            <p className="text-gray-600 mb-6">Schedule follow-up consultations with your regular doctors.</p>
            <button className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-2">
              Schedule <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Emergency CTA */}
        <div className="mt-20 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-2xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="inline-flex p-3 bg-white/20 rounded-full mb-6">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Emergency Medical Assistance</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Need immediate help? Our emergency response team is available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = 'tel:108'}
                className="px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
              >
                Call Emergency: 108
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                Connect Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultDoctor;