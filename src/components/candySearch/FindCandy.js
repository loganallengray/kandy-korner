import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./FindCandy.css"

export const FindCandy = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [search, setSearch] = useState();

    useEffect(() => {
        fetch("http://localhost:8088/products")
            .then(response => response.json())
            .then((candyArray) => {
                setProducts(candyArray)
            })
    }, [])

    useEffect(() => {
        const searchedProducts = products.filter(product => product.name.startsWith(search.charAt(0).toUpperCase() + search.slice(1)))
        setFilteredProducts(searchedProducts)
        if (search === "") {
            setFilteredProducts([])
        }
    }, [search])

    return (
        <>
            <fieldset>
                <label>What candy are you looking for?</label>
                <input 
                    onChange={
                        (changeEvent) => {
                            setSearch(changeEvent.target.value)
                        }
                    }
                    type="text" 
                    placeholder="Enter candy here..." />
            </fieldset>
            <ul>
                {filteredProducts.map(product => (
                    <li key={product.id}>
                        <div>{product.name}</div>
                        <div>${product.price}.00</div>
                    </li>
                ))}
            </ul>
        </>
    )
}