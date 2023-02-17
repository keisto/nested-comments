import { useContext, useState } from 'react'
import { CommentContext } from '../context/CommentContext'

const CommentEdit = ({ comment, onSubmit = () => {}, onCancel = () => {} }) => {
  const [body, setBody] = useState(comment.body)
  const { editComment } = useContext(CommentContext)

  return (
    <form
      className="flex flex-col sm:flex-row gap-4 mt-2"
      onSubmit={(e) => {
        e.preventDefault()
        editComment({ ...comment, body })
        onSubmit()
      }}
    >
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border rounded-md p-4 bg-gray-100 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-indigo-500 focus:bg-white transition duration-300 ease-in-out resize-y"
      />
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 border hover:bg-gray-200 hover:border-gray-300 active:text-red-500 transition duration-300 ease-in-out rounded-md shadow"
        >
          Cancel
        </button>
        <button className="flex-grow py-2 px-4 bg-black rounded-md shadow-lg text-white border hover:bg-indigo-600 active:bg-indigo-900 active:shadow active:scale-95 hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
          Update
        </button>
      </div>
    </form>
  )
}

export default CommentEdit
