import { PageLayout } from "@/page-layout/containter";
import { RegisterForm } from "@/register-form/widget";

export default function Register() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-center text-4xl">sign up</p>
      <RegisterForm />
      </div>
    </PageLayout>
  )
}