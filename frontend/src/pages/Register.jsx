import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import axios from 'axios'
import { URL } from '../url'


const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async () => {

    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password })
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false)
      navigate("/login")

    }
    catch (err) {
      setError(true)
      console.log(err)
    }

  }



  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-6 bg-gray-100">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          <Link to="/" className="hover:text-gray-600 transition duration-300">BlogItAll</Link>
        </h1>
        <h3 className="text-lg font-semibold text-gray-700">
          <Link to="/login" className="hover:text-gray-500 transition duration-300">Login</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] bg-gray-50">
        <div className="flex flex-col justify-center items-center space-y-6 w-[90%] md:w-[400px] bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">Create an account</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            type="text"
            placeholder="Enter your username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
          {error && <h3 className="text-red-500 text-sm">Something went wrong</h3>}
          <div className="flex justify-center items-center space-x-3 text-gray-600">
            <p>Already have an account?</p>
            <p className="text-blue-600 hover:text-blue-800 transition duration-300">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Register