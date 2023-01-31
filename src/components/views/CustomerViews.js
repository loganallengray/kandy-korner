import { Route, Routes } from "react-router-dom"
import { FindCandy } from "../candySearch/FindCandy"
import { MyOrders } from "../products/MyOrders"
import { Products } from "../products/Products"

export const CustomerViews = () => {
	return <Routes>
        <Route path="products" element={<Products />} />
		<Route path="findCandy" element={<FindCandy />} />
		<Route path="myOrders" element={<MyOrders />} />
	</Routes>
}