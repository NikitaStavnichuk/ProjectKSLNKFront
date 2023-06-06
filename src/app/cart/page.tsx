import { PageLayout } from "@/page-layout/containter";
import dynamic from "next/dynamic";

const CartList = dynamic(() => import('../../cart-list/widget'), {
  ssr: false
})

export default async function Cart() {
  return (
    <PageLayout>
      <CartList />
    </PageLayout>
  )
}
