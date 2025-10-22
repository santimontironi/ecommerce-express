// import getProductsService from "../services/productServices";
// import { createContext, useState, useEffect } from "react"

// export const AllProductsContext = createContext();

// export const AllProductsProvider = ({ children }) => {

//     const[AllProducts, setAllProducts] = useState([]);
//     const[loading, setLoading] = useState(true);

//     const allProductsList = getProductsService();

//     useEffect(() => {
//         setTimeout(() => {
//             setAllProducts(allProductsList);
//             setLoading(false);
//         },1500)
//     },[])

//     return <AllProductsContext.Provider value={{AllProducts,loading}}>
//         {children}
//     </AllProductsContext.Provider>;
// }