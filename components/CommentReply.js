import { useContext, useState } from 'react'
import { nanoid } from 'nanoid'
import { CommentContext, COMMENTS_ROOT_KEY } from '../context/CommentContext'
import { classNames } from '../lib/utils'

const CommentReply = ({ parentId = COMMENTS_ROOT_KEY, onCancel, onSubmit }) => {
  const [body, setBody] = useState('')
  const { addComment } = useContext(CommentContext)

  // Simulate a user
  const user = `Random User ${nanoid(5)}`

  return (
    <form
      className="flex flex-col sm:flex-row gap-4 mt-2"
      onSubmit={(e) => {
        e.preventDefault()
        addComment({ body, parentId, user })
        setBody('')

        if (onSubmit) {
          onSubmit() // Call callback
        }
      }}
    >
      <textarea
        className={classNames(
          'border border-gray-300 rounded-md p-4 bg-gray-200 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-indigo-500 focus:bg-white transition duration-300 ease-in-out resize-y',
          parentId === COMMENTS_ROOT_KEY ? 'flex-grow' : ''
        )}
        required
        value={body}
        autoFocus
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="flex flex-col gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={() => {
              setBody('')
              onCancel() // Call callback
            }}
            className="py-2 px-4 border hover:bg-gray-200 hover:border-gray-300 active:text-red-500 transition duration-300 ease-in-out rounded-md shadow"
          >
            Cancel
          </button>
        )}
        <button className="flex-grow py-2 px-4 bg-black rounded-md shadow-lg text-white border hover:bg-indigo-600 active:bg-indigo-900 active:shadow active:scale-95 hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
          Reply
        </button>
      </div>
    </form>
  )
}

export default CommentReply
