import { useContext, useState } from 'react'
import CommentEdit from './CommentEdit'
import CommentReply from './CommentReply'
import { CommentContext } from '../context/CommentContext'

const CommentListItem = ({ comment }) => {
  const [showReply, setShowReply] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { deleteComment } = useContext(CommentContext)

  const actions = [
    {
      label: 'Reply',
      onClick: () => setShowReply(!showReply),
    },
    {
      label: 'Edit',
      onClick: () => setIsEditing(!isEditing),
    },
    {
      label: 'Delete',
      onClick: () => deleteComment(comment),
    },
  ]

  return (
    <div className="p-4 my-2 rounded-md shadow bg-white">
      <h2 className="font-bold">{comment.user}</h2>
      {isEditing ? (
        <CommentEdit
          comment={comment}
          onSubmit={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <p className="text-gray-700">{comment.body}</p>
      )}

      {/* Only show actions if we are not trying to do something else */}
      {!isEditing && !showReply && (
        <div className="flex items-center space-x-2 mt-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="py-1 px-2 border hover:bg-gray-200 hover:border-gray-300 transition duration-300 ease-in-out rounded-md shadow"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Reply to this comment */}
      {showReply && (
        <CommentReply
          parentId={comment.id}
          onCancel={() => {
            setShowReply(false)
          }}
          onSubmit={() => {
            setShowReply(false)
          }}
        />
      )}
    </div>
  )
}

export default CommentListItem
