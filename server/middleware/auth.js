import jwt, { decode } from "jsonwebtoken";

const secret = "test";
// suppose a user wants to like a post 
//! he clicks the like button => auth (if approved...next()) then like controller

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    // if token lenght is greated than 500 the token is off google login

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      if (decodedData) {
        req.userId = decodedData.id;
      } else {
        req.userId = null;
      }
    } else {
      decodedData = jwt.decode(token);

      
      if (decodedData) {
        req.userId = decodedData.sub;
        // .sub is a google unique id 
      } else {
        req.userId = null;
      }
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
