"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface LoginDto {
  email: string,
  password: string
}

const postLogin = async (dto: LoginDto) => {
  const res = await axios.post('/api/login', dto)

  return res
}

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const client = useQueryClient()

  const { mutate, data, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => await postLogin({ email, password }),
    onSuccess: (data) => {
      client.invalidateQueries(['user'])
    },
  })

  return (
    <div className="flex flex-col items-center justify-center max-w-sm gap-3 text-lg bg-pink-300 p-3 rounded-md last:mt-3">
      <div>
        <p>enter e-mail:</p>
        <input className="bg-pink-200 px-3" onChange={e => setEmail(e.target.value)} value={email} type="email" name="kslnk-mail" />
      </div>
      <div>
        <p>enter password:</p>
        <input className="bg-pink-200 px-3" onChange={e => setPassword(e.target.value)} value={password} type="password" name="kslnk-password" />
      </div>
      <button className="bg-pink-500 text-center w-full py-1" onClick={() => mutate()}>sign in</button>
    </div>
  );
};
