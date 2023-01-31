import { useEffect, useState } from "react"

export const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
    }, [])

    return (
        <>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        <div>{employee?.user?.name}</div>
                        <div>{employee?.location?.address}</div>
                    </li>
                ))}
            </ul>
        </>
    )
}