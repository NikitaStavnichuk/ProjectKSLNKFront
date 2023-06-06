import { LoginForm } from "@/login-form.ts/widget";
import { PageLayout } from "@/page-layout/containter";
import Link from "next/link";

export default function Login() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-center text-4xl">Welcome</p>
        <p className="text-center">first time here? <Link href='/register' className="underline">sign up</Link></p>
        
        <LoginForm />
      </div>
    </PageLayout>
  )
}