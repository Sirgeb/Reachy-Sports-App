export default {
  Message: {
    isMine: ({ user }, __, { request }) => request.user.id === user.id
  }
}
