import { createContext, useCallback, useState } from 'react'
import { nanoid } from 'nanoid'

/*
  🚧Comments Data Structure:
  {
    root: [{
      id: 1,
      body: 'Comment 1',
      parent_id: null,
      user: 'Demo',
      created_at: '2023-01-01',
      updated_at: null
    }],
    "1": [{
      id: 2,
      body: 'Comment 2',
      parent_id: 1,
      user: 'Demo 2',
      created_at: '2023-01-02',
      updated_at: null
    }]
  },

  💭Explanation: This comment structure would be the result of a database call
  using `GROUP BY` and `ORDER BY` to group comments by their parent_id and sort
  them by the date. The root key is used to store comments that have no
  parent_id (null). This allows us to easily access comments by their parent_id
  and to be gathered with 1 database call.

  🤔Considerations: Another option to consider is to gather just the root
  comments and then make a separate database call for each comment to get
  its children.
*/

export const COMMENTS_ROOT_KEY = 'root'

export const CommentContext = createContext({})

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([])

  // Normally would be a database call using useEffect to fetch comments
  // useEffect(() => { // Fetch Comments }, [])

  // Add Comment
  const addComment = useCallback(({ body, parentId, user }) => {
    const newComment = {
      id: nanoid(),
      body,
      parent_id: parentId,
      user,
      created_at: new Date().toISOString(),
      updated_at: null,
    }

    setComments((prevComments) => {
      if (prevComments[parentId]) {
        prevComments[parentId].push(newComment)
      } else {
        prevComments[parentId] = [newComment]
      }

      return { ...prevComments }
    })
  }, [])

  // Edit Comment
  const editComment = useCallback(({ id, parent_id, body }) => {
    setComments((prevComments) => {
      const comment = prevComments[parent_id].find(
        (comment) => comment.id === id
      )
      comment.body = body
      comment.updated_at = new Date().toISOString()

      return { ...prevComments }
    })
  }, [])

  // Delete Comment
  const deleteComment = useCallback(({ id, parent_id }) => {
    setComments((prevComments) => {
      // Remove comment from parent
      prevComments[parent_id] = prevComments[parent_id].filter(
        (comment) => comment.id !== id
      )

      // Remove comment's children
      if (prevComments[id]) {
        delete prevComments[id]
      }

      return { ...prevComments }
    })
  }, [])

  // Console log comments to see the data structure
  console.log(comments)

  return (
    <CommentContext.Provider
      value={{
        comments,
        addComment,
        editComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}
