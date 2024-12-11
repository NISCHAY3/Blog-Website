import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      // const res=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
      const res = await fetch("/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password })
      })
      // console.log(res.data)
      if (res.ok) {
        const data = await res.json(); // Extract JSON data
        const cookies = res.headers.get('Set-Cookie');
        console.warn('Data:', data);
        console.warn('Cookies:', cookies);

        setUser(data)
      } else {
        console.error('Request failed with status:', res.status);
      }

      navigate("/")

    }
    catch (err) {
      setError(true)
      console.log(err)

    }

  }
  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-6 bg-gray-100">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          <Link to="/" className="hover:text-gray-600 transition duration-300">BlogItAll</Link>
        </h1>
        <h3 className="text-lg font-semibold text-gray-700">
          <Link to="/register" className="hover:text-gray-500 transition duration-300">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] bg-gray-50">
        <div className="flex flex-col justify-center items-center space-y-6 w-[90%] md:w-[400px] bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">Log in to your account</h1>
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
            onClick={handleLogin}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Log in
          </button>
          {error && <h3 className="text-red-500 text-sm">Something went wrong</h3>}
          <div className="flex justify-center items-center space-x-3 text-gray-600">
            <p>New here?</p>
            <p className="text-blue-600 hover:text-blue-800 transition duration-300">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login