import axios from "axios"
import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Comment = ({ c, post }) => {

  const { user } = useContext(UserContext)
  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, { withCredentials: true })
      window.location.reload(true)

    }
    catch (err) {
      console.log(err)
    }
  }
  // console.log(post.userId)
  // console.log(user._id)
  // console.log(post)
  // console.log(user)
  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">@{c.author}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <p>{new Date(c.updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</p>
          {user?._id === c?.userId && (
            <button
              onClick={() => deleteComment(c._id)}
              className="text-red-500 hover:text-red-700 transition duration-300"
              aria-label="Delete comment"
            >
              <MdDelete size={18} />
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 text-gray-600">{c.comment}</p>
    </div>
  )
}

export default Comment