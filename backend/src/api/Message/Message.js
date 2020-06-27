export default {
  Message: {
    senderInfo: ({ user }) => {
      const senderInfo = {
        id: user.id,
        name: user.firstname + " " + user.lastname,
        avatar: user.avatar
      }
      return JSON.stringify(senderInfo)
    },
    sent: () => true
  }
};
