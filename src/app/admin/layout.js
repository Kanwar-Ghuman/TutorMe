import { PlainNavbar } from '@/components/tutorme/home/nav/plainNavbar';


const Layout = ({ children }) => {
    return (
        <div>
            {/* Admin Navbar - Mr. Decker (logged in through auth) */}
            <PlainNavbar />
            {children}
        </div>
    );
};

export default Layout;