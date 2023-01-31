import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./productFormStyles.css"

export const ProductForm = () => {
    /* 
        fields for the employee to add name (text), type (select), and price (number)
        button to submit
        takes him back to listing of all products
    */
    const navigate = useNavigate();

    const [types, setTypes] = useState([]);
    const [userChoices, setUserChoices] = useState({
        name: '',
        typeId: 0,
        price: 0
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/types`)
                .then(response => response.json())
                .then((typesArray) => {
                    setTypes(typesArray)
                })
        }, [] // When this array is empty, you are observing initial component state
    )

    const handleSaveCandy = (evt) => {
        evt.preventDefault()
    
        if (
            userChoices.name &&
            userChoices.typeId &&
            userChoices.price
        ) {
            fetch('http://localhost:8088/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userChoices),
            })
            .then(() => {
                fetch(`http://localhost:8088/products`)
                .then(() => {
                    navigate('/products')
                })
        })} else {
            alert('Yo, fill out my form.')
        }
    }
    
    return (
        <>
            <form id="candyForm">
                <fieldset>
                    <label className="label" htmlFor="candyName">Candy Name</label>
                    <input 
                        required
                        type="text" 
                        name="candyName" 
                        className="input" 
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.name = event.target.value
                            setUserChoices(copy)
                        }}
                    />
                </fieldset>
                <fieldset>
                    <label className="label" htmlFor="typeName">Candy Type</label>
                    <select 
                        name="typeName" 
                        className="input"
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.typeId = parseInt(event.target.value)
                            setUserChoices(copy)
                        }}
                    >
                        <option value="0">Choose a type...</option>
                        {types.map(type => (
                            <option value={type.id} key={type.id}>{type.name}</option>
                        ))}
                    </select>
                </fieldset>
                <fieldset>
                    <label className="label" htmlFor="candyPrice">Candy Price</label>
                    <input 
                        required
                        type="number" 
                        name="candyPrice" 
                        className="input"
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.price = parseInt(event.target.value)
                            setUserChoices(copy)
                        }}
                    />
                </fieldset>
                <button
                    className="btn"
                    onClick={(event) => {
                    handleSaveCandy(event)
                    }}
                >
                    Submit Candy
                </button>
            </form>
        </>
    )
}