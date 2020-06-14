export default {
  Comment: {
    isAdmin: async (_, __, { request }) => {
      return request.user.permission === "ADMIN";
    }
  }
}
 