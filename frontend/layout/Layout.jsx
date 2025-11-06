import Home from "../src/pages/Home";
import AboutUs from "../src/pages/AboutUs";
import Contact from "../src/pages/Contact";
import Nav from "../src/components/Nav";
import Footer from "../src/components/Footer";
import { AdminProvider } from "../context/adminContext";

const Layout = () => {
  return (
    <div>
      <Nav />
      <section id="home">
        <Home />
      </section>
      <section id="aboutus">
        <AboutUs />
      </section>
      <AdminProvider>
        <section id="contact">
          <Contact />
        </section>

      </AdminProvider>
      <Footer />
    </div>
  );
};

export default Layout;