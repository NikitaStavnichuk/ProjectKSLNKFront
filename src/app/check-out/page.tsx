import { PageLayout } from "@/page-layout/containter";
import dynamic from "next/dynamic";

const CheckOutForm = dynamic(() => import('../../check-out/widget'), {
  ssr: false
})

export default function CheckOut() {
  return (
    <PageLayout>
      <CheckOutForm />
    </PageLayout>
  )
}