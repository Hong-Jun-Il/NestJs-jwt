import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

async function verifyToken(
  refreshToken: RequestCookie,
  accessToken?: RequestCookie,
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/verify-token`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken?.value}; refresh_token=${refreshToken?.value}`,
      },
      mode: "cors",
    },
  );

  if (res.ok) {
    const access_token = res.headers.get("set-cookie");

    if (!!access_token) {
      console.log("실행됨");
      return access_token;
    }

    return true;
  }

  return false;
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token");
  const refreshToken = req.cookies.get("refresh_token");

  const pathname = req.nextUrl.pathname;

  // 홈, 로그인, 회원가입 페이지에 로그아웃을 하지 않은 채로 접근한 경우
  if (pathname === "/" || pathname === "/login" || pathname === "/signUp") {
    if (accessToken || refreshToken) {
      // NextResponse.redirect(new URL("/"))
    }

    return NextResponse.next();
  }
  // protectext route에 접근한 경우
  else {
    try {
      // 액세스랑 리프가 둘 다 있는 경우 검증
      if (accessToken && refreshToken) {
        const isLogin = await verifyToken(refreshToken, accessToken);
        console.log(isLogin, "ㄴㅁㅇㄴㅁㅇ");

        if (!isLogin) {
          throw new Error("Auth Error");
        }

        return NextResponse.next();
        // 액세스는 없는데 리프는 있는 경우
      } else if (!accessToken && refreshToken) {
        const isLogin = await verifyToken(refreshToken);
        console.log(isLogin, "ㄴㅁㅇㄴㅁㅇ");

        if (!isLogin) {
          throw new Error("Auth Error");
        }

        return NextResponse.next();
      }
      // 둘 다 없는 경우 에러
      else {
        throw new Error("Auth Error");
      }
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(
        new URL(`/login?redirectedFrom=${pathname}`, req.nextUrl.origin),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:path"],
};
