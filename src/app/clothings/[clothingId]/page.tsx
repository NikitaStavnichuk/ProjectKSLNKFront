import { PageLayout } from "@/page-layout/containter"
import { serverUrl } from "@/shared/config"
import { Clothing } from "@/shared/domain"
import axios from "axios"
import dynamic from "next/dynamic"
import Image from "next/image"

const getItem = async (itemId: string) => {
  try {
    return (await axios.get<Clothing>(serverUrl + 'Clothing/' + itemId)).data
  }
  catch {
    return null
  }
}

const ItemCounter = dynamic(
  () => import('../../../item-counter/widget'), { 
      ssr: false, 
      loading: () => <p>please w8...</p> 
    }
)

export default async function ClothingPage({params}: {params: Record<string, string>}) {
  const item = await getItem(params.clothingId)

  return (
    <PageLayout>
      {
        item
        ? 
        <div className="flex gap-2 flex-col md:flex-row ">
          <div className="p-2 bg-pink-400">
            <img src={serverUrl + 'static/' + item.productPicture} alt="clothingPic" className="h-[300px] w-[300px]" />
          </div>
          <div className="flex flex-col justify-between gap-3 text-xl">
            <div className="bg-pink-400 p-3">
              <span>{item.price}₽</span>
            </div>
            <div className="flex flex-col gap-1 justify-between basis-full py-4 bg-pink-400 px-2">
              <p>{item.name}</p>
              <p>{item.description}</p>
              <ItemCounter item={item} />
            </div>
          </div>
        </div>
        : <p>Not Found</p>
      }
    </PageLayout>
  )
}