import Footer from "./Footer"
import Header from "./Header"

export default function Layout({ children }: any) {
    return (
        <div className="min-h-screen grid grid-rows-layout">
            <Header></Header>
            <div className="small-container mt-10 px-4">
                <main>{children}</main>
            </div>
            <Footer></Footer>
        </div>
    )
}
