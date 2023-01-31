import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()
    const [locations,setLocations] = useState([]);
    const [showLocation, updateShowLocation] = useState(false);

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        }, [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (showLocation) {
                document.getElementById("location__list").style.display = "block";
            } else {
                document.getElementById("location__list").style.display = "none";
            }
        }, [showLocation]
    )

    return (
        <>
            <ul className="navbar">
                <li className="navbar__item navbar__locations">
                    <button onClick={() => 
                        showLocation ? updateShowLocation(false) : updateShowLocation(true) }
                    >Locations</button>
                    <ul id="location__list">
                        {locations.map(location => (
                            <li className="location__item" key={location.id}>
                                <div>{location.address}</div> 
                                <div>{location.squareFootage}ft²</div>
                            </li>)
                        )
                        }
                    </ul>
                </li>
                <li className="navbar__item navbar__products">
                    <Link className="navbar__link" to="/products">Products</Link>
                </li>
                <li className="navbar__item navbar__products">
                    <Link className="navbar__link" to="/productForm">Add Product</Link>
                </li>
                <li className="navbar__item navbar__products">
                    <Link className="navbar__link" to="/hireEmployee">Hire Employee</Link>
                </li>
                <li className="navbar__item navbar__products">
                    <Link className="navbar__link" to="/employees">View Employees</Link>
                </li>
                <li className="navbar__item navbar__products">
                    <Link className="navbar__link" to="/customers">View Customers</Link>
                </li>
                <li className="navbar__item navbar__logout">
                    <Link className="navbar__link" to="" onClick={() => {
                        localStorage.removeItem("kandy_user")
                        navigate("/", {replace: true})
                    }}>Logout</Link>
                </li>
            </ul>
        </>
    )
}

