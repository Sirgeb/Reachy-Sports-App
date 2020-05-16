export default {
  Mutation: {
    createAccount: async (_, args) => {
      return {
        id: '1',
        username: true,
        email: 'chybesta@gmail.com'
      }
    }
  }
}