"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface RegisterDto {
  email: string,
  password: string,
  confirmedPassword: string
}

const postRegister = async (dto: RegisterDto) => {
  const res = await axios.post('/api/register', dto)

  return res
}

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmed] = useState('')

  const isValid = password.length >= 6 && password == confirmedPassword && email.length > 0

  const client = useQueryClient()

  const { mutate, } = useMutation({
    mutationKey: ['register'],
    mutationFn: async () => await postRegister({ email, password, confirmedPassword }),
    onSuccess: () => {
      client.invalidateQueries(['user'])
    },
  })

  return (
    <div className="flex flex-col items-center justify-center max-w-sm gap-3 text-lg bg-pink-200 p-3 rounded-md shadow-lg">
      <div className="relative">
        <p>enter e-mail:</p>
        <input 
          className="bg-pink-300 px-3 shadow-sm" 
          onChange={e => setEmail(e.target.value)} 
          value={email} 
          type="email" 
          name="kslnk-mail" 
        />
      </div>
      <div className="relative">
        <p>enter password:</p>
        <input 
          className="bg-pink-300 px-3 shadow-sm" 
          onChange={e => setPassword(e.target.value)} 
          value={password} 
          type="password" 
          name="kslnk-password" 
        />
      </div>
      <div className="relative">
        <p>confirm password:</p>
        <input 
          className="bg-pink-300 px-3 shadow-sm" 
          onChange={e => setConfirmed(e.target.value)} 
          value={confirmedPassword} 
          type="password" 
          name="kslnk-confirmed" 
        />
      </div>
      <button 
        disabled={!isValid} 
        className="bg-pink-500 text-center w-full py-1 disabled:bg-neutral-300 transition-all duration-500" 
        onClick={() => mutate()}
      >
        sign up
      </button>
    </div>
  );
};
