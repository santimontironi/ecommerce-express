import Home from "../src/pages/Home"
import Nav from "../src/components/Nav"
import AboutUs from "../src/pages/AboutUs"
import Contact from "../src/pages/Contact"

const Layout = () => {
  return (
    <div>
      <Nav />
      <Home />
      <AboutUs />
      <Contact />
    </div>
  )
}

export default Layout