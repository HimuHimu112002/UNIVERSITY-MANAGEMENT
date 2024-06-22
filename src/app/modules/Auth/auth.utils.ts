import jwt from "jsonwebtoken";

export const EncodeUserToken = (userId: string, role: string) => {
  let KEY = "123-ABC-XY";
  let EXPIRE = { expiresIn: "24h" };
  let PAYLOAD = { id: userId, role: role };
  return jwt.sign(PAYLOAD, KEY, EXPIRE);
};

export const DecodeUserToken = (token: string) => {
  try {
    let KEY = "123-ABC-XY";
    return jwt.verify(token, KEY);
  } catch (e) {
    return null;
  }
};
// const jwtPayload = {
//   userId: user.id,
//   role: user.role,
// };
// const accessToken =  jwt.sign(
//   jwtPayload,
//   process.env.JWT_ACCESSS_SECRET as string,
//   { expiresIn: '10d' }
// );





    // jwt.verify(token, process.env.KEY as string, function (err, decoded) {
    // //   if (err) {
    // //     throw new AppError(httpStatus.UNAUTHORIZED, "un-valid token");
    // //   }
    //   //console.log(decoded);
    // }
    // );
    //const decoded = jwt.verify(token, KEY) as JwtPayload;
