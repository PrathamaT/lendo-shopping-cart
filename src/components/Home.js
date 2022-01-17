import {React} from "react";
import "./Home.css";
import Product from "./Product";
import {useStateValue} from "./StateProvider";


function Home() {
    let [{products,isSearchActive,foundProducts}]=useStateValue();
    
    const currentProducts = isSearchActive?foundProducts:products;

    return (
        <div className="home">
            <img src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt="banner" className="home__image" />
            <div className="home__products">{currentProducts.items.map((item) => (
                <Product key={item.id} product={item} />
            ))}</div>    
        </div>
    )
}

export default Home
