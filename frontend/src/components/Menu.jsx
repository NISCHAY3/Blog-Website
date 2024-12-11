import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import { Link, useNavigate } from "react-router-dom"


const Menu = () => {
  const { user } = useContext(UserContext)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true })
      // console.log(res)
      setUser(null)
      navigate("/login")

    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="bg-gray-800 w-48 z-10 flex flex-col absolute top-14 right-4 md:right-6 rounded-md shadow-lg overflow-hidden">
      {!user && (
        <>
          <Link to="/login" className="text-white text-sm hover:bg-gray-700 px-4 py-2 transition duration-300">
            Login
          </Link>
          <Link to="/register" className="text-white text-sm hover:bg-gray-700 px-4 py-2 transition duration-300">
            Register
          </Link>
        </>
      )}
      {user && (
        <>
          <Link to={"/profile/" + user._id} className="text-white text-sm hover:bg-gray-700 px-4 py-2 transition duration-300">
            Profile
          </Link>
          <Link to="/write" className="text-white text-sm hover:bg-gray-700 px-4 py-2 transition duration-300">
            Write
          </Link>
          <Link to={"/myblogs/" + user._id} className="text-white text-sm hover:bg-gray-700 px-4 py-2 transition duration-300">
            My blogs
          </Link>
          <button onClick={handleLogout} className="text-white text-sm hover:bg-gray-700 px-4 py-2 text-left transition duration-300">
            Logout
          </button>
        </>
      )}
    </div>
  )
}

export default Menu