/**
 * Users data
 */
const users = [
  {
    id: 1,
    name: "John",
    username: "johndoe",
    email: "john@doe.com",
  },
  {
    id: 2,
    name: "David",
    username: "daviddobrik",
    email: "david@dobrik.com",
  },
];

const getAllUsers = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      data: users,
      totalCount: users.length,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export default { getAllUsers };
