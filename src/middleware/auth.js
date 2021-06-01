import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization?.split(" ")[1];
    const decodeData = jwt.verify(token, "test");

    req.userId = decodeData?.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "not authorized" });
  }
};

export default auth;
