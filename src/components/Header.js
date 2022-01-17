import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";

const Header = () => {
    const [{basket},dispatch] = useStateValue();

    const searchProductByName = (e) => {
       dispatch({
           type:"FILTER_PRODUCT_BY_NAME",
           value:e.target.value.toLowerCase()
       })
    }

    return (
        <nav className="header">
            <Link to="/">
                <img className="header__logo"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYKE20oSOdRcCSXLySJMB0zv6DSpE5H1_MhQ&usqp=CAU"
                    alt=""></img>
                    {/* <p className="header__title">Shopping Cart</p> */}
            </Link>

            <input className="header__searchInput" 
                   placeholder="Search..." 
                   type="text" 
                   onChange={searchProductByName}/>

            <SearchIcon className="header__searchIcon"></SearchIcon>

            <div className="header__nav">
                    <div className="header__option">
                        <span className="header__optionLineOne">Hello Prathama</span>
                        <span className="header__optionLineTwo">Sign Out</span>
                    </div>

                <Link to="/checkout" className="header__link">
                    <div className="header__optionBasket">
                        {/* Shopping basket icon */}
                        <ShoppingBasketIcon/>
                        {/* Number of items in the basket */}
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>

                </Link>
            </div>


        </nav>

    )
}

export default Header
