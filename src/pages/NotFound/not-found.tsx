import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <>
            <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
                Page Not Found || 404 ||
                <Link to='/' style={{ color: 'red', textDecoration: "none", marginLeft: "4px" }} >
                    Go Home
                </Link>
            </div>
        </>
    )
}

export default NotFound
