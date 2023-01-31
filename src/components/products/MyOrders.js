import { useEffect, useState } from "react"

export const MyOrders = () => {
    const [purchases, setPurchases] = useState([])
    const [filteredPurchases, setFilteredPurchases] = useState([])
    const [customer, setCustomer] = useState()

    const localKandyUser = localStorage.getItem("kandy_user");
    const kandyUserObject = JSON.parse(localKandyUser);

    const fetchUserData = () => {
        fetch(`http://localhost:8088/customers?_expand=user&userId=${kandyUserObject.id}`)
            .then(response => {return response.json()})
            .then((data) => setCustomer(data[0]))
        fetch(`http://localhost:8088/purchases?_expand=product`)
            .then(response => {return response.json()})
            .then((data) => setPurchases(data))
    }
                
    useEffect(() => {
        fetchUserData()
    }, []);

    useEffect(() => {
        const customerPurchases = purchases.filter(purchase => purchase.customerId === customer.id)
        setFilteredPurchases(customerPurchases)
    }, [purchases])

    return (
        <>
            {filteredPurchases.map(purchase => (
                <div key={purchase.id}>
                    <div>{purchase?.product?.name}</div>
                    <div>${purchase?.product?.price}.00</div>
                </div>
            ))}
        </>
    )
}