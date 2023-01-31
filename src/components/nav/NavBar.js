import { CustomerNav } from "./CustomerNav";
import { EmployeeNav } from "./EmployeeNav";

export const NavBar = () => {
    const localKandyUser = localStorage.getItem("kandy_user");
    const kandyUserObject = JSON.parse(localKandyUser);

    if (kandyUserObject.staff) {
        return <EmployeeNav />
    } else {
        return <CustomerNav />
    }
}

