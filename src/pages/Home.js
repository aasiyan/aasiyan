import About from "../components/About/About";
import ContactForm from "../components/Contact/ContactForm";
import Hero from "../components/Hero/Hero";
import News from "../components/News/News";
import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
// import Records from "../components/Records/Records";
function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      {/* <Records /> */}
      <News />
      <ContactForm />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
