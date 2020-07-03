export const USER_FRAGMENT = `
  fragment UserData on User {
    id 
    firstname
    lastname
    avatar
    facebookID
    googleID
    permission
    groups {
      id 
      groupId
    }
  }
`;

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
        avatar
        firstname 
        lastname
      }
    }
  }
`;

export const COMMENT_FRAGMENT = `
  fragment CommentData on Comment {
    id 
    text
    createdAt
    user {
      id 
      avatar
      firstname 
      lastname
    }
    post {
      id 
      caption 
      image
      description
      category
      createdAt 
    }
  }
`;
export const COMMENTS_CONNECTION_FRAGMENT = `
  fragment CommentsConnectionData on Comment {
    edges {
      node {
        id 
        text
        createdAt
        user {
          id 
          avatar
          firstname 
          lastname
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    aggregate {
      count
    }
  }
`;

export const GROUP_FRAGMENT = `
  fragment GroupData on Group {
    id 
    name 
    title
    icon
    route
    createdAt
    messages {
      _id 
      text 
      createdAt
      user {
        id 
        avatar
        firstname 
        lastname
      }
    }
  } 
`;

export const PARTICIPANT_FRAGMENT = `
  fragment ParticipantData on Participant {
    id 
    groupId
    user {
      id 
      avatar
      firstname 
      lastname
    }
  } 
`;

export const MESSAGE_FRAGMENT = `
  fragment MessageData on Message {
    _id 
    text
    createdAt
    group{
      id
      name
    }
    user {
      id
      firstname 
      lastname
      avatar
    }
  } 
`;
