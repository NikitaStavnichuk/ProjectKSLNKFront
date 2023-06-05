import { serverUrl } from "@/shared/config"
import axios from "axios"
import { cookies } from "next/dist/client/components/headers"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const fetched = await axios.get(serverUrl + 'api/Order', {
      headers: {
        'Cookie': cookies().toString()
      }
    })
    const fetchedData = fetched.data
    const data = { 
      cart: fetchedData.reduce((map: any, cur: any) => {
        if (!map[`${cur?.order?.id}`]) {
          map[`${cur?.order?.id}`] = {
            ...cur.order,
            cart: [{clothing: cur.clothing, count: cur.count}]
          }
        }
        else {
          map[`${cur?.order?.id}`].cart.push({ clothing: cur.clothing, count: cur.count })
        }
        return map
      }, {}), 
      }
    const res = NextResponse.json(data)
    return res
  }
  catch (err: any) {
    return new NextResponse(err.response.data, {
      status: err.response.status
    })
  }
}