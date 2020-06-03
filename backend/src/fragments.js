export const POST_FRAGMENT = `
  fragment PostData on Post {
    id 
    caption 
    image
    description
    category
    createdAt 
    comments(orderBy: createdAt_DESC) {
      id 
      text
      createdAt
      user {
        id 
        picture
        firstname 
        lastname
      }
    }
  }
`