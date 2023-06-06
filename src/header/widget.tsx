'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { getProfile } from "./api"

const logout = async () => {
  return await axios.post('/api/logout')
}

type HeaderProps = {
  userFromServer?: any
}

export const Header = ({ userFromServer }: HeaderProps) => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getProfile,
    initialData: userFromServer
  })

  return (
    <header className="flex flex-row justify-end gap-3 px-2 py-1"> 
      { data
      ? <UserNav />
      : <GuestNav />
      }
    </header>
  )
}

const UserNav = () => {
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: logout,
    mutationKey: ['user'],
    onSettled: () => {
      client.invalidateQueries(['user'])
    }
  })

  return (
    <>
      <Link href='/cart'>cart</Link>
      <Link href='/profile'>profile</Link>
      <button onClick={() => mutate()}>log out</button>
    </>
  )
}

const GuestNav = () => {
  return <Link href='/login'>log in</Link>
}
