import { useContext } from 'react'
import CommentReply from './CommentReply'
import CommentListItem from './CommentListItem'
import { CommentContext, COMMENTS_ROOT_KEY } from '../context/CommentContext'

const INDENT_SIZE = 32

const CommentList = ({
  parentIdOrKey = COMMENTS_ROOT_KEY,
  indentation = 0,
}) => {
  const { comments: allComments } = useContext(CommentContext)
  const comments = allComments[parentIdOrKey] ?? []

  return (
    <ul style={{ marginLeft: indentation + 'px' }}>
      {/* Warning more than 5 levels deep */}
      {indentation > 4 * INDENT_SIZE && comments.length > 0 && (
        <li className="py-2 bg-indigo-600 text-sm font-bold text-white text-center rounded shadow-md">
          ⚠️Warning nesting more than 5 levels deep
        </li>
      )}

      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentListItem comment={comment} />
          {/* Comment has replies */}
          {allComments[comment.id] && (
            <CommentList
              parentIdOrKey={comment.id}
              indentation={indentation + INDENT_SIZE}
            />
          )}
        </li>
      ))}

      {/* Only show for root level and/or empty state to create more root level comments */}
      {parentIdOrKey === COMMENTS_ROOT_KEY && (
        <>
          {/* No comments at ALL */}
          {comments.length === 0 && (
            <li className="py-12 text-gray-700 text-center">
              🤷 No Comments...
            </li>
          )}

          <li className="border-t pt-4 mt-6">
            <CommentReply parentId={parentIdOrKey} />
          </li>
        </>
      )}
    </ul>
  )
}

export default CommentList
