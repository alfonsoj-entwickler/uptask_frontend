import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { Link } from "react-router-dom";
export default function AppLayout() {
    return (
        <>
            <header className='bg-gray-800 py-5'>
                <div className='mx-auto flex max-w-7xl flex-col items-center justify-between lg:flex-row'>
                    <div className='w-64'>
                        <Link to={`/`}>
                            <Logo />
                        </Link>
                    </div>
                    <NavMenu />
                </div>
            </header>
            <section className='mx-auto mt-10 max-w-7xl p-5'>
                <Outlet />
            </section>
            <footer className='py-5'>
                <p className='text-center'>
                    &#169; All right are reserved {new Date().getFullYear()}
                </p>
            </footer>
            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
        </>
    );
}
