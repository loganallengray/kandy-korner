import { useEffect, useState } from "react"
import { ProductForm } from "./ProductForm";

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFiltered] = useState([]);
    const [filterProducts, updateFilterProducts] = useState(false);
    const [customerId, setCustomerId] = useState(0)

    const localKandyUser = localStorage.getItem("kandy_user");
    const kandyUserObject = JSON.parse(localKandyUser);

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_order=asc&_expand=type`)
                .then(response => response.json())
                .then((productArray) => {
                    setProducts(productArray)
                    setFiltered(productArray)
                })
            fetch(`http://localhost:8088/customers?_expand=user&userId=${kandyUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    setCustomerId(data[0].id)
                })
        }, [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (filterProducts) {
                const expensiveProducts = products.filter(product => product.price >= 2);
                setFiltered(expensiveProducts);
            } else {
                setFiltered(products);
            }
        }, [filterProducts]
    )

    useEffect(
        () => {
            setFiltered(products);
        }, [products]
    )

    const handlePurchase = (event) => {
        event.preventDefault()

        const [, productId] = event.target.id.split("--")

        const productToPurchase = {
            customerId: customerId,
            productId: parseInt(productId),
            amount: 1
        }
    
        fetch('http://localhost:8088/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productToPurchase),
        })
    }

    return (
        <>
            <h1>Products</h1>
            <button onClick={() => 
                filterProducts ? updateFilterProducts(false) : updateFilterProducts(true) }
            >{ filterProducts ? "Show All Products" : "Show Expensive Products" }</button>
            <ul>
                {filteredProducts
                    // .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                    .map(product => (
                        <li key={product.id}>
                            <div>{product.name}</div>
                            <div>{product.type.name}</div>
                            <div>${product.price}.00 per unit</div>
                            {!kandyUserObject.staff
                                ? <button id={`purchase--${product.id}`} onClick={(event) => handlePurchase(event)}>Purchase</button>
                                : "" }
                        </li>
                    )
                )}
            </ul>
        </>
    )
}