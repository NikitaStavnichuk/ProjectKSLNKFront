import { PageLayout } from "@/page-layout/containter";
import { ProfileOrder } from "@/profile-order/container";
import axios from "axios";
import { cookies } from "next/dist/client/components/headers";

const getProfile = async () => {
  return (await axios.get('http://localhost:3000/api/cart', { headers: {
    'Cookie': cookies().toString()
  } })).data
}

export default async function Profile() {
  const profile = await getProfile();
  
  return (
    <PageLayout>
      { Object.keys(profile.cart).map(key => profile.cart[key]).map(el => <ProfileOrder key={el.id} {...el}/>) }
    </PageLayout>
  )
}