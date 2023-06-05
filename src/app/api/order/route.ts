import { serverUrl } from "@/shared/config"
import axios from "axios"
import { cookies } from "next/dist/client/components/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body: { cart: { clothingId: number, count: number }[], vk: string } = await req.json()

  try {
    if (!body.cart.length) {
      return new NextResponse('so small cart', {
        status: 400
      })
    }
    const fetched = await axios.post(serverUrl + 'api/Order', body, {
      headers: {
        'Cookie': cookies().toString()
      }
    })

    const res = NextResponse.json(fetched.data)
    return res
  }
  catch (err: any) {
    console.log(err.response.data)
    return new NextResponse(err.response.data, {
      status: err.response.status
    })
  }
}