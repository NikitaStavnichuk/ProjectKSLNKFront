import { serverUrl } from "@/shared/config";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookie = req.headers.get('Cookie')
  
  try {
    const fetched = await axios.get(serverUrl + 'Profile', {
      headers: {
        'Cookie': cookie
      }
    })
    return NextResponse.json(fetched.data)
  }
  catch (err: any) {
    return new NextResponse(err.response.data, {
      status: err.response.status
    })
  }
}