import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decode } from "./helpers/jwtHelper";

const authRoutes = [
    "/login",
    "/register"
]

export async function middleware(  request:NextRequest){
    console.log(request)
    const {pathname} = request.nextUrl
    const accessToken = cookies().get("access_token")?.value
    

    if(!accessToken){
        if(authRoutes.includes(pathname)){
            return NextResponse.next()
        } else{
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    let decodedToken = null

    decodedToken = decode(accessToken) 
    const role = decodedToken?.role

    if(role === "user" && pathname === "/dashboard"){
        return NextResponse.next()
    }

    if(role === "user" && pathname === "/dashboard/create-recipe"){
        return NextResponse.next()
    }
    if(role === "user" && pathname === "/dashboard/my-recipe"){
        return NextResponse.next()
    }
    if (role === "user" && pathname.startsWith("/dashboard/my-recipe/")) { 
        return NextResponse.next();
    }
    if(role === "user" && pathname === "/dashboard/change-password"){
        return NextResponse.next()
    }
    if(role === "user" && pathname === "/dashboard/get-premium"){
        return NextResponse.next()
    }


    if(role === "admin" && pathname ===  "/dashboard"){
        return NextResponse.next()
    }
    if(role === "admin" && pathname ===  "/dashboard/all-recipe"){
        return NextResponse.next()
    }
    if(role === "admin" && pathname ===  "/dashboard/all-user"){
        return NextResponse.next()
    }
    if(role === "admin" && pathname ===  "/dashboard/create-admin"){
        return NextResponse.next()
    }
    if(role === "admin" && pathname ===  "/dashboard/get-all-admin"){
        return NextResponse.next()
    }
    if (role === "admin" && pathname.startsWith("/dashboard/get-all-admin/")) { 
        return NextResponse.next();
    }
    if(role === "admin" && pathname ===  "/dashboard/change-password"){
        return NextResponse.next()
    }



   return NextResponse.redirect(new URL("/", request.url));

}


export const config = {
    matcher:[
        "/login",
        "/register",
        "/dashboard/:page*",
        "/dashboard/my-recipe/:recipeId*",

    ]
}