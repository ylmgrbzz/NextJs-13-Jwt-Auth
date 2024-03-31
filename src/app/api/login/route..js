import { SignJWT } from "jose";
import { getJwtSecretKey } from "../../../libs/auth/index.js";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  console.log(body);

  if (body.username === "admin" && body.password === "admin") {
    const jwt = await new SignJWT({
      usernamew: body.username,
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(getJwtSecretKey());

    console.log(jwt);

    const response = NextResponse.json({
      succcess: true,
    });

    return response;
  }
}
