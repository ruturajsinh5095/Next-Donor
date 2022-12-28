import { useEffect, useState } from "react";
// import clientPromise from "../lib/mongodb";
import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { BiDonateHeart } from "@react-icons/all-files/bi/BiDonateHeart";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { Form, FormLayout, DisplayIf, SubmitButton, Button} from '@saas-ui/react'
import {
  Field,
  InputField,
  TextareaField,
  NumberField,
  SelectField,
  RadioField,
  CheckboxField,
  SwitchField,
  PasswordField,
  PinField,
  NativeSelectField,
} from '@saas-ui/react'
import { AppShell } from '@saas-ui/app-shell';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { Divider } from '@saas-ui/react'
import Image from 'next/image';
import Link from 'next/link';
import { Center, Heading, Spacer, Text } from '@chakra-ui/react';
import { Menu,MenuList, MenuButton, MenuItem} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { PageSidebar, PageSidebarHeader, PageSidebarBody} from '@saas-ui/pro';
import { PropertyList, Property, Persona } from '@saas-ui/react';
import { Sidebar, SidebarSection, SidebarToggleButton, NavItem} from '@saas-ui/sidebar';
import {  Box } from '@chakra-ui/react';
import { Page, PageBody } from '@saas-ui/pro';
import { Toolbar, ToolbarButton } from "@saas-ui/pro";
import { Card, CardBody } from '@saas-ui/react';


export default function UpdateDonation() {
  const router = useRouter();

  const [data1, setData] = useState("")
  const [data2, setData2] = useState("")
  const [newid, setData1] = useState(null)



  useEffect(() => {
      var currentLocation = window.location.hash;
      let idData = currentLocation.replace("#donation/", "");
      setData1(idData);

      fetch('/api/donationid',{
        method: "POST",
        body: JSON.stringify({
          id1: idData,
        }),
      })
      .then((res) => res.json())
      .then((res) => setData(res[0]));

      

  }, []);
  const donationAmount = data1.amount;
  const donorname = data1.donor;
  
  let donordetails = async () => {
    fetch('/api/donorname',{
      method: "POST",
      body: JSON.stringify({
        donor1: donorname,
      }),
    })
    .then((res) => res.json())
    .then((res) => setData2(res[0]));
  }

  const content = (
    <PropertyList>
      <Property label="Name" value={data2.donor} />
      <Property label="Email" value={data2.Email} />
      <Property label="Phone" value={data2.Phone} />
      <Property label="Address" value={data2.Address} />
      <Property label="City" value={data2.City} />
      <Property label="State" value={data2.State} />
      <Property label="Country" value={data2.Country} />
      <Property label="Zipcode" value={data2.Zipcode} />
    </PropertyList>
  )


    const schema = Yup.object({
        donor: Yup.string().required().label('Donor Name'),
        amount: Yup.string().required().label('Amount'),
        date: Yup.string().required().label("Date"),
      })
    let handleSubmit = async (params) => {
        let res = await fetch("/api/donation", {
        method: "PUT",
        body: JSON.stringify({
            id: newid,
            donor: params.donor,
            amount: params.amount,
            type: params.type,
            fund: params.fund,
            status1: params.status1,
            date: params.date,
        }),
        });
        if(res.status === 200){
          
            router.push('/donation');
          }
    }
    return(
      
        <HStack height="100vh" width="100vw" justifyItems="stretch" alignItems="stretch">
        <AppShell
            variant="static"
            minH="100%"
            sidebar={
              <Sidebar>
                <SidebarToggleButton />
                <SidebarSection direction="row">
                <Image src="/images/favicon-96x96.png" height={30} width={30} alt=""/>
                  <Spacer />
                  <Menu>
                    <MenuButton as={IconButton} icon={ <FaUserCircle size={'2em'}/> } variant="ghost"/>
                    <MenuList>
                      <MenuItem>Home</MenuItem>
                    <Link href="/"> <MenuItem>Sign out</MenuItem></Link>
                    </MenuList>
                  </Menu>
                </SidebarSection>
                <SidebarSection aria-label="Main">
                    <Link href='/dashboard'><NavItem icon={<FiHome />} >Dashboard</NavItem></Link>
                    <Link href='/donation'><NavItem icon={<FiUser />}>Donation</NavItem></Link>
                    <Link href='/donor'><NavItem icon={<BiDonateHeart />}>Donor</NavItem></Link>
                </SidebarSection>
              </Sidebar>
            }
          >
      
                <Page height="400px" contentWidth="full" position="sticky"
                    title="Edit Donation "
                    width="80vw"
                    overflow="hidden"
                    toolbar={
                      <Toolbar variant="outline">
                      </Toolbar>
                    }
                  >
                    <PageBody>
                    <HStack alignItems="stretch" height="100%" overflowX="hidden" spacing="56">
                    <Box position="sticky" width="auto" mt={"5"} >
                        <Heading size={"md"}>Edit Donation Details</Heading>
                        <Text mt={"3"} mb={"4"} color="Muted">Fill Up The Form Below</Text>
                        <Divider orientation="horizontal"  mb={"4"} maxW="600px" />
                        <Card isHoverable variant="outline" maxW="600px">
                            <CardBody>
                                <Form onSubmit={handleSubmit} resolver={yupResolver(schema)}>
                                    <FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="donor" label="Donor Name" type="text" defaultValue={data1.donor} required />
                                            <Field name="amount" label="Amount" type="number" defaultValue={donationAmount} min="0" required/>
                                        </FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="date" label="Date" type="date" defaultValue={data1.date}  />
                                            <Field name="type" label="Type" type="select" defaultValue={data1.type} required
                                            options={[
                                                { value: 'Cash' },
                                                { value: 'CreditCard' },
                                                { value: 'Payoneer' },
                                                ]}/>
                                        </FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="fund" label="Fund" type="select" defaultValue={data1.fund} required
                                            options={[
                                                { value: 'General Fund' },
                                                { value: 'Covid Relif Fund' },
                                                ]}/>
                                            <Field name="status1" label="Status" type="select" defaultValue={data1.status1} required
                                            options={[
                                                { value: 'Paid' },
                                                { value: 'Unsettled' },
                                                ]} />
                                        </FormLayout>
                                        <FormLayout columns={[1]}>
                                        <Field name="remark" label="Remark" type="text" />
                                        </FormLayout>
                                        <FormLayout columns={[1,2]}>
                                        <SubmitButton disableIfUntouched>Save</SubmitButton>
                                        {/* <Link href='/donation'><Button colorScheme={"primary"}>Cancel</Button></Link> */}
                                        </FormLayout>
                                    </FormLayout>
                                </Form>
                            </CardBody>
                        </Card>
                        
                    </Box>
                    <Box>
                    <PageSidebar
                        defaultWidth={400}
                        minWidth="200px"
                        maxWidth="500px"
                        minHeight={'100%'}
                        borderLeftWidth="1px"
                        isResizable
                        isOpen
                      >
                        <PageSidebarHeader>
                        <Persona name={"Donor Details"} size="xs" onClick={donordetails} />
                        </PageSidebarHeader>
                        <PageSidebarBody>{content}</PageSidebarBody>
                      </PageSidebar>
                      </Box>
                    </HStack>
                    </PageBody>
                    
                </Page>
           
        </AppShell>
      </HStack>
       
    )
}
// export async function getServerSideProps(context) {
//   const client = await clientPromise;
//   const db = client.db("nextjs-mongodb-demo");

//   var currentLocation = window.location.hash;
//   let idData = currentLocation.replace("#donation/", "");

//   let users = await db.collection("donations").find({idData}).toArray();
//   users = JSON.parse(JSON.stringify(users));

 


//   return {
//     props: { users },
//   };
// }