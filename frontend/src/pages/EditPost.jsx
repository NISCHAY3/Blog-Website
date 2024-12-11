import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { ImCross } from 'react-icons/im'
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


const EditPost = () => {

  const postId = useParams().id
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState("")
  const [cats, setCats] = useState([])

  const fetchPost = async () => {
    try {
      const res = await axios.get("/api/posts/" + postId)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFile(res.data.photo)
      setCats(res.data.categories)

    }
    catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats
    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("img", filename)
      data.append("file", file)
      post.photo = filename
      // console.log(data)
      //img upload
      try {
        const imgUpload = await axios.post("/api/upload", data)
        // console.log(imgUpload.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    //post upload

    try {
      const res = await axios.put("/api/posts/" + postId, post, { withCredentials: true })
      navigate("/posts/post/" + res.data._id)
      // console.log(res.data)

    }
    catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    fetchPost()
  }, [postId])

  const deleteCategory = (i) => {
    let updatedCats = [...cats]
    updatedCats.splice(i)
    setCats(updatedCats)
  }

  const addCategory = () => {
    let updatedCats = [...cats]
    updatedCats.push(cat)
    setCat("")
    setCats(updatedCats)
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-grow flex justify-center items-start py-8">
        <div className="w-full max-w-4xl px-6 bg-white rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-6">Update a post</h1>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Enter post title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="file"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <input
                  type="text"
                  placeholder="Enter post category"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {cats?.map((c, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full">
                    <span>{c}</span>
                    <button
                      type="button"
                      onClick={() => deleteCategory(i)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ImCross size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <textarea
              rows={9}
              placeholder="Enter post description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EditPost