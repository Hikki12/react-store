import React from "react";
import { Link } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaReact } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { ApplicationAction } from "../../store/actions";
import { AppContext as Ctx } from "../../context";
import { Product } from "../../store/types/product";


interface HeaderProps {
    dispatch: React.Dispatch<ApplicationAction>
}


const Header = ({ dispatch }: HeaderProps) => {
    const state = React.useContext(Ctx);
    const { showHeaderCollapse, showShoppingCollapse } = state;

    const toggleHeaderCollapse = () => {
        // console.log("dispatch: ", dispatch);
        dispatch({type: "TOGGLE_HEADER_COLLAPSE", payload:!state.showHeaderCollapse})
    }
    const toggleShoppingCollapse = () => {
        dispatch({type: "TOGGLE_SHOPPING_COLLAPSE", payload: !state.showShoppingCollapse})
    }

    const deleteCartElement = (product: Product) => {
        dispatch({type: "REMOVE_PRODUCT_FROM_CART", payload: product})
    }

    const { shoppingProducts } = state;

    return(
        <header className="bg-white sticky top-0 w-full h-16 z-30 overscroll-y-none overflow-y-none">
            <nav className="relative w-full h-full flex justify-between items-center px-5">
                <div className="nav-brand">
                    <Link to="/" className="flex items-center text-2xl">
                        <FaReact /><p className="ml-2">RStore</p>
                    </Link>
                </div>
                <div className={`${showHeaderCollapse ? 'visible' : 'invisible'} fixed top-0 left-0 flex flex-col items-center bg-white h-screen w-full z-30 overflow-y-none overscroll-y-none transition ease-in-out duration-100 text-xl`}>
                    <div className="font-bold text-3xl h-16 w-full px-5 flex items-center justify-end gap-2 text-black" onClick={toggleHeaderCollapse}>
                        <IoMdClose/>
                    </div>
                    <p className="text-center text-2xl uppercase">React Store</p>
                    <Link to="/" className="mt-4 font-semibold">Home</Link>
                    <p className="text-center">About</p>
                </div>
                <div className={`${showShoppingCollapse ? 'visible' : 'invisible'} fixed top-12 right-1 lg:right-5 flex flex-col justify-between gap-5 rounded-lg border-2 py-3 px-5 w-5/6 lg:w-96 h-96 bg-white `}>
                    <div className="pl-3">Total items: {shoppingProducts.length}</div>
                    <div className="h-[80%] flex flex-col gap-3  overflow-y-auto overscroll-y-auto py-2 px-2">
                    {shoppingProducts.map((product, index) =>(
                        <div className="flex items-center gap-2"  key={`shoppingKey-${index}`}>
                            <img
                                src={product.image}
                                className="w-16 h-16"
                            />
                            <p className="w-[60%]">{product.title}</p>
                            <p onClick={() => {deleteCartElement(product)}}><AiFillCloseCircle/></p>
                        </div>
                    ))}
                    </div>
                    <button className="w-full h-10 max-w-[300px] flex items-center justify-center bg-green-500 text-white">Proceed to pay</button>
                </div>

                <div className={`text-2xl flex gap-5`}>
                    <BiSearchAlt2 /> 
                    <div className="relative"  onClick={toggleShoppingCollapse}>
                        {shoppingProducts.length > 0 &&
                            <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex justify-center items-center">{shoppingProducts.length}</div>
                        }
                        <BsFillCartFill/>
                    </div>
                    <GiHamburgerMenu onClick={toggleHeaderCollapse}/>
                </div>
            </nav>
        </header>
    );
};

export { Header };
