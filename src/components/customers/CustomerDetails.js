import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, setCustomer] = useState([])
    const [newLoyaltyNumber, setNewLoyaltyNumber] = useState({
        userId: 0,
        loyaltyNumber: 0
    })
    
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/customers?id=${customerId}&_expand=user`)
            .then(response => response.json())
            .then((data) => {
                const singleCustomer = data[0];
                setCustomer(singleCustomer);
                const copy = {...newLoyaltyNumber}
                copy.loyaltyNumber = singleCustomer.loyaltyNumber
                setNewLoyaltyNumber(copy)
            })
    }, [customerId])

    const handleSaveButton = (event) => {
        event.preventDefault()

        const customerToSendToAPI = {
            userId: customer.userId,
            loyaltyNumber: parseInt(newLoyaltyNumber.loyaltyNumber)
        }

        return fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(customerToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/customers")
            })
    }

    return (
        <>
            <section className="customer">
                <header>{customer?.user?.fullName}</header>
                <div>Name: {customer?.user?.name}</div>
                <div>Email: {customer?.user?.email}</div>
                <form>
                    <label htmlFor="loyaltyNumber">Loyalty Number:</label>
                    <input 
                        type="number" 
                        name="loyaltyNumber"
                        value={newLoyaltyNumber.loyaltyNumber}
                        onChange={(event) => {
                            const copy = {...newLoyaltyNumber}
                            copy.loyaltyNumber = event.target.value
                            setNewLoyaltyNumber(copy)
                        }} />
                    <button onClick={(event) => handleSaveButton(event)}>Update</button>
                </form>
            </section>
        </>
    )
}