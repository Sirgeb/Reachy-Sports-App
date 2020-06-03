export default {
  User: {
    fullname: parent => `${parent.firstname} ${parent.lastname}`,
  }
};
