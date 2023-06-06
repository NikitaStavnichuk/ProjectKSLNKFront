import { cookies } from "next/dist/client/components/headers"
import { Header } from "./widget"
import { getProfileServer } from "./api"

export const HeaderWrapper = async () => {
  const user = await getProfileServer(cookies().toString());
  return <Header userFromServer={user}/>
}
