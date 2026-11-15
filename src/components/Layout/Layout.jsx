import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import FactsButton from './FactsButton'

export default function Layout() {
    return (
        <>
            <Header />
            <FactsButton />
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
