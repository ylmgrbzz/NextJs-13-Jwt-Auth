export async function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };
  const hasVerifiedToken = token && verifyJwtToken(token);

  console.log(hasVerifiedToken);
}

export const config = {
  matcher: ["/login", "/panel"],
};
