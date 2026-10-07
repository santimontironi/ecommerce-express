import { MessageCircle } from "lucide-react";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { AdminProvider } from "../context/adminContext";

const Layout = () => {
  return (
    <>
      <Nav />
      <main>
        <section id="inicio">
          <Home />
        </section>
        <section id="nosotros">
          <AboutUs />
        </section>
        <AdminProvider>
          <section id="contacto">
            <Contact />
          </section>
        </AdminProvider>
      </main>
      <Footer />

      <a
        href="https://wa.me/543415427021"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="fixed right-5 bottom-5 z-30 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:-translate-y-1 md:right-8 md:bottom-8"
      >
        <MessageCircle size={26} />
      </a>
    </>
  );
};

export default Layout;
