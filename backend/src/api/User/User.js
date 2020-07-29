export default {
  User: {
    _id: ({ id }, __, { request }) => {
      if (request.user.id !== id) {
        return 2;
      } else { 
        return 1;
      }
    },
    name: parent => `${parent.firstname} ${parent.lastname}`
  }
};
