export default {
  Query: {
    me: async (_, args) => {
      return {
        id: '1',
        username: true,
        email: 'chybesta@gmail.com'
      }
    }
  }
}