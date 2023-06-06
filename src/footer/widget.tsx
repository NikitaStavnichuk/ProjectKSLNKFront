import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-pink-300 pt-12 pb-6 px-5 flex flex-col gap-4 text-black font-bold">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-between">
          <Navigation />
          <Copyright />
        </div>
        <Contacts />
      </div>
    </footer>
  )
}

const Copyright = () => {
  return (
    <div className="flex flex-col gap-2">
      <p>public offer</p>
      <p>@ 2023, kslnk.com</p>
    </div>
  )
}

const Navigation = () => {
  return (
    <div className="flex flex-col gap-3">
      <p><Link href='/'>russian streetwear store</Link></p>
      <p><Link href='/about'>about us</Link></p>
    </div>
  )
}

const Contacts = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p>e-mail:</p>
        <p>support@kslnk.com</p>
      </div>
      <div>
        <p>support service hours:</p>
        <p>mn-fr: 9:00 - 21:00</p>
      </div>
      <div>
        <p>delivery in Russia: Pochta Rossyi</p>
        <p>other countries: FedEx</p>
      </div>
    </div>
  )
}
