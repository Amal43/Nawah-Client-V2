import Product from '../Components/Product/Product';
import Nav from '../../src/Components/Nav/Navbar';
import Footer from '../Components/Footer/Footer';


function Products() {
  return (
    <div style={{ overflowY: "auto", height: "100vh" }}>
      <Nav/>
      <Product/>
      <Footer/>
    </div>
  )
}

export default Products;