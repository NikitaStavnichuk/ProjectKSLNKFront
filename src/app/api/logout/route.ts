import { NextResponse } from "next/server";

export async function POST() {
  const res = new NextResponse()
  res.cookies.delete('sessid')
  return res
}