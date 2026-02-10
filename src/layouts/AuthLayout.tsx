import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
    return (
        <>
            <div className='min-h-screen bg-gray-800'>
                <div className='mx-auto w-[450px] py-10 lg:py-20'>
                    <Link to={`/`}>
                        <Logo />
                    </Link>
                    <div className='mt-10'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
        </>
    );
}
