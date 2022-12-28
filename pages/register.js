import styles from '../styles/Home.module.css';
import * as Yup from "yup";
import { useRouter } from 'next/router';
import { React, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Card,
  CardBody,
  PasswordForm,
  AuthForm,
  Field,
  FormLayout,
  Form,
  SubmitButton,
} from '@saas-ui/react';
export default function Register() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");
    const schema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required()
      .label('Email'),
    password: Yup.string().min(4).required().label('Password'),
    Name: Yup.string().required().label('Name'),
    OrganizationName: Yup.string().required().label('Organization Name'),
    PhoneNumber: Yup.string().min(10).required().label('Phone Number'),
  })
  let handleSubmit = async (params) => {
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
        setErrorMsg("User Already Exists!!");
    }
  }

  return (
    <>
      <main className={styles.main}>
      <Card title="Register">
            <div className="mb-3 text-center">
                        {errorMsg ? <p style={{ color: "red", fontSize: "13px" }}>{errorMsg}</p> : null}
            </div>
      <CardBody>

      <Form resolver={yupResolver(schema)}  onSubmit={handleSubmit}>
        <Field name="email" label="Email" type='email' />
        <Field name="password" label="Password" type='password' />
          <FormLayout columns={2}>
            <Field name="Name" label="Name" />
            <Field name="OrganizationName" label="Organization Name" />
          </FormLayout>
          <Field name="PhoneNumber" label="Phone Number" type='number' />
          <SubmitButton size={'lg'} mt="3">SignUp</SubmitButton>
        </Form>

      </CardBody>
      </Card>
      
      </main>
    </>
  )
}
