import styles from '../styles/Home.module.css';
import { React, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Stack } from '@chakra-ui/react'
import { Link } from 'next/link';
import Image from 'next/image'
import { Auth, AuthProvider} from '@saas-ui/react'
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

export default function Home() {
  const router = useRouter();
  const schema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required()
      .label('Email'),
    password: Yup.string().min(4).required().label('Password'),
  });

  const authProvider = {
    
    onLogin: async (params) => {
      let res = await fetch("/api/users1", {
        method: "POST",
        body: JSON.stringify({
          email: params.email,
          password: params.password
        }),
      });
      if (res.status === 200) {
        res = await res.json();
        router.push({
         pathname: '/dashboard',
        })
     } 
     else {
       console.log("Erorr");
     }
    },
    onSignup: async (params) => {
      let res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          Name: params.Name,
          email: params.email,
          OrganizationName: params.OrganizationName,
          PhoneNumber: params.PhoneNumber,
          password: params.password
        }),
      });
      if(res.status === 200){
          
        router.push('/');
      }
      else{
          console.log("UserExists");
      }
    },
  }
  return (
    <>
        {/* <AuthProvider {...authProvider}>
          <Container mt="100px" width="md">
            <Stack  maxWidth="md" >
              <Auth type="password" resolver={yupResolver(schema)}/>
            </Stack>
          </Container>
      </AuthProvider> */}
      <Stack flex="1" direction="row">
        
      <Stack
        flex="1"
        alignItems="center"
        justify="center"
        direction="column"
        spacing="8"
      >
        
        <AuthProvider {...authProvider}>
        <Container mt="100px" >
          <div style={{ display: "flex", justifyContent: "center"}}>
          <Image src="/images/logo.png" height={52} width={200} alt="" />
          </div>
          <Auth type="password" resolver={yupResolver(schema)}/>
        </Container>
        </AuthProvider>
      </Stack>
    </Stack>
    </>
  )
}
