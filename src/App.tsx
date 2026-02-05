import Footer from "./components/Footer";
import Header from "./components/Header";
// import About from "./sections/About";
import Contact from "./sections/Contact";
import Features from "./sections/Features";
import Hero from "./sections/Hero";
import Testimonials from "./sections/Testimonials";

export default function App() {
  return (
    <main className="my-8">
      <Header />
      <div className="mx-6 flex flex-col items-center gap-15 md:gap-25">
        <div className="mx-6 *:flex *:items-center">
          <Hero />
          <Features />
        </div>
        
        {/* <About /> */}
        <div className="mx-6 *:flex *:flex-col *:items-center">
          <Testimonials />
          <Contact />
        </div>
      </div>
      <Footer />
    </main>
  )
}
