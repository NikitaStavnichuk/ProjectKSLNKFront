import { PageLayout } from "@/page-layout/containter"
import { serverUrl } from "@/shared/config"
import { CategoryItems } from "@/shared/domain"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"

const getItems = async (categoryId: string) => {
  try {
    return (await axios.get<CategoryItems>(`${serverUrl}api/Category/${categoryId}`)).data
  } catch {
    return null
  }
}

export default async function CategoryList({ params }: { params: Record<string, string> }) {
  const items = await getItems(params.categoryId)

  return (
    <PageLayout>
      { items 
        ? 
        <div className='flex flex-row flex-wrap justify-center items-center gap-3'>
          { items.clothings.map(el => (
            <>
              <Item img={el.productPicture} price={el.price} id={el.clothingId} key={el.clothingId} />
            </>
          )) }
        </div> 
        : <p>Server is not avaible</p> }
      
    </PageLayout>
  )
}

const Item = ({ img = "/", price = 0, id }: {price?: number, img?: string, id: number}) => {
  return (
    <Link href={`/clothings/${id}`}>
      <div className="p-1 relative bg-pink-400">
        <div className="bg-pink-400 block absolute px-3">
          { price }₽
        </div>
        <img alt="Clothing" src={serverUrl + 'static/' + img} width={300} height={300} />
      </div>
    </Link>
  )
}
