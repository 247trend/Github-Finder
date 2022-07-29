import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="hero">
      <div className="text-center hero-content">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold mb-8">
            Oops, something not right!
          </h1>
          <p className="text-2xl mb-8">404 - Page not Found!</p>
          <Link className="btn btn-primary btn-lg" to="/">
            <FaHome className="mr-4"/>
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound