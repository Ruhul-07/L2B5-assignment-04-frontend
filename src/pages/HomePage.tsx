import { Outlet } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <h2>this is homepage</h2>
            <Outlet></Outlet>
        </div>
    );
};

export default HomePage;