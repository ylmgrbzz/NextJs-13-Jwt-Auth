import { jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secretKey = "ADHASDSAKFDSF";
  console.log("secretKey", secretKey);
  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }
  return new TextEncoder().encode(secretKey);
};

export async function verifyJwtToken(token) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}
