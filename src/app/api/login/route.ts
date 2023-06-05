import { serverUrl } from "@/shared/config"
import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const fetched = await axios.post(serverUrl + 'Auth/login', body)
    if (!fetched.headers || !fetched.headers.get || typeof fetched.headers.get !== 'function') {
      console.log('ewqeq')
      return
    }
    
    const sessid = fetched.headers.get('Set-Cookie')! as string[]
    const res = new NextResponse(fetched.data, {
      headers: {
        'Set-Cookie': sessid[0] as string
      }
    })
    return res
  }
  catch (err: any) {
    console.log(err.response.data)
    return new NextResponse(err.response.data, {
      status: err.response.status
    })
  }
}