import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8088/customers?_expand=user')
            .then(response => response.json())
            .then((customerArray) => {
                setCustomers(customerArray)
            })
    }, [])

    return (
        <>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        <Link to={`${customer.id}`}>{customer?.user?.name}</Link>
                        <div>{customer?.user?.email}</div>
                    </li>
                ))}
            </ul>
        </>
    )
}