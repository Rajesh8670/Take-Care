import Navbar from "../Components/LayoutComponents/Navbar";
import Hero from "../Components/LayoutComponents/Hero";
import Footer from "../Components/LayoutComponents/Footer";
import '../index.css'
import Features from "../Components/LayoutComponents/Features";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-teal-50 relative subtle-pattern">

      {/* Background Blurred Shapes */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-sky-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-300 rounded-full blur-3xl opacity-30"></div>
      <Navbar />
      <Hero />
      <Features/>
      <Footer />
    </div>
  );
};

export default Home;
