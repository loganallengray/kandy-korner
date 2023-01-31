import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const HireEmployee = () => {
    /* 
        fields for the employee to add name (text), type (select), and price (number)
        button to submit
        takes him back to listing of all products
    */
    const navigate = useNavigate();

    const [locations, setLocations] = useState([]);
    const [userChoices, setUserChoices] = useState({
        name: '',
        email: '',
        isStaff: true
    })
    const [employeeChoices, setEmployeeChoices] = useState({
        locationId: 0,
        startDate: '',
        payRate: 0
    })

    useEffect( // locations
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        }, [] // When this array is empty, you are observing initial component state
    )

    const handleSaveEmployee = (evt) => {
        evt.preventDefault()
    
        if (
            userChoices.name &&
            userChoices.email &&
            employeeChoices.locationId &&
            employeeChoices.startDate &&
            employeeChoices.payRate
        ) {
            fetch('http://localhost:8088/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userChoices)
            })
                .then(response => response.json())
                .then((data) => {
                    employeeChoices.userId = data.id
                })
                .then(() => {
                    fetch('http://localhost:8088/employees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(employeeChoices)
                    }
                )})
            fetch(`http://localhost:8088/products`)
                .then(() => {
                    navigate('/employees')
                })
        } else {
            alert('Yo, fill out my form.')
        }
    }
    
    return (
        <>
            <form id="hireForm">
                <fieldset>
                    <label className="label" htmlFor="employeeName">Employee Name</label>
                    <input 
                        required
                        type="text" 
                        name="employeeName" 
                        className="input" 
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.name = event.target.value
                            setUserChoices(copy)
                        }}
                    />
                </fieldset>
                <fieldset>
                    <label className="label" htmlFor="employeeEmail">Employee Email</label>
                    <input 
                        required
                        type="text" 
                        name="employeeName" 
                        className="input" 
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.email = event.target.value
                            setUserChoices(copy)
                        }}
                    />
                </fieldset>
                <fieldset>
                    <label className="label" htmlFor="location">Location</label>
                    <select 
                        name="location" 
                        className="input"
                        onChange={(event) => {
                            const copy = { ...employeeChoices }
                            copy.locationId = parseInt(event.target.value)
                            setEmployeeChoices(copy)
                        }}
                    >
                        <option value="0">Choose a location...</option>
                        {locations.map(location => (
                            <option value={location.id} key={location.id}>{location.address}</option>
                        ))}
                    </select>
                </fieldset>
                <fieldset>
                    <label className="label" htmlFor="startDate">Start Date</label>
                    <input 
                        required
                        type="date"
                        name="startDate"
                        onChange={(event) => {
                            const copy = { ...employeeChoices }
                            copy.startDate = event.target.value
                            setEmployeeChoices(copy)
                        }}
                    />
                </fieldset>
                <fieldset>
                    <label className="label" htmlFor="payRate">Pay Per Hour</label>
                    <input 
                        required
                        type="number" 
                        name="payRate" 
                        className="input"
                        onChange={(event) => {
                            const copy = { ...employeeChoices }
                            copy.payRate = parseInt(event.target.value)
                            setEmployeeChoices(copy)
                        }}
                    />
                </fieldset>
                <button
                    className="btn"
                    onClick={(event) => {
                    handleSaveEmployee(event)
                    }}
                >
                    Hire
                </button>
            </form>
        </>
    )
}