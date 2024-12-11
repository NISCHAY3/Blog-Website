import { Link, useLocation, useNavigate } from "react-router-dom"
import { BsSearch } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"



const Navbar = () => {

  const [prompt, setPrompt] = useState("")
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const path = useLocation().pathname

  // console.log(prompt)


  const showMenu = () => {
    setMenu(!menu)
  }


  const { user } = useContext(UserContext)

  return (
    <div className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-extrabold">
          <Link to="/" className="hover:text-blue-400 transition duration-300">BlogItAll</Link>
        </h1>

        {path === "/" && (
          <div className="flex justify-center items-center">
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="outline-none px-3 py-1 text-black bg-white rounded-l-md w-40 md:w-60"
              placeholder="Search a post"
              type="text"
            />
            <button
              onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
              className="cursor-pointer p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-300"
            >
              <BsSearch />
            </button>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/write" className="hover:text-blue-400 transition duration-300">Write</Link>
              <div className="relative">
                <button onClick={showMenu} className="cursor-pointer hover:text-blue-400 transition duration-300">
                  <FaBars />
                </button>
                {menu && <Menu user={user} />}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition duration-300">Login</Link>
              <Link to="/register" className="hover:text-blue-400 transition duration-300">Register</Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={showMenu} className="text-lg cursor-pointer hover:text-blue-400 transition duration-300">
            <FaBars />
          </button>
          {menu && <Menu user={user} />}
        </div>
      </div>
    </div>
  )
}


export default Navbar