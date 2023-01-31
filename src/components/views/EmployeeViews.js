import { Route, Routes } from "react-router-dom"
import { Products } from "../products/Products"
import { ProductForm } from "../products/ProductForm"
import { HireEmployee } from "../employeeHire/HireEmployee"
import { Employees } from "../employeeHire/Employees"
import { Customers } from "../customers/Customers"
import { CustomerDetails } from "../customers/CustomerDetails"


export const EmployeeViews = () => {
	return <Routes>
                <Route path="products" element={<Products />} />
                <Route path="productForm" element={<ProductForm />} />
                <Route path="hireEmployee" element={<HireEmployee />} />
                <Route path="employees" element={<Employees />} />
                <Route path="customers" element={<Customers />} />
                <Route path="customers/:customerId" element={ <CustomerDetails /> } />
	</Routes>
}