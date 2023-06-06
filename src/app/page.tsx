import { PageLayout } from '@/page-layout/containter'
import { serverUrl } from '@/shared/config'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

const getTags = async () => {
  return (await axios.get(serverUrl + 'api/Category')).data as any[]
}

export default async function Home() {
  const tags = await getTags()

  return (
    <PageLayout>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Image alt='' src={''} />
        <div className='flex flex-row items-center justify-between gap-1'>
          { tags.map(el => (
            <Link href={`/catalog/${el.id}`} key={el.id}>
              {el.name}
            </Link>
          )) }
        </div>
      </div>
    </PageLayout>
  )
}
