import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { BiDonateHeart } from "@react-icons/all-files/bi/BiDonateHeart";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { Form, FormLayout, Field, DisplayIf, SubmitButton, Button} from '@saas-ui/react'
import { AppShell } from '@saas-ui/app-shell';
import * as Yup from "yup";
import clientPromise from "../lib/mongodb";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { Divider } from '@saas-ui/react'
import Image from 'next/image';
import Link from 'next/link';
import { Heading, Spacer, Text } from '@chakra-ui/react';
import { Menu,MenuList, MenuButton, MenuItem} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { Sidebar, SidebarSection, SidebarToggleButton, NavItem} from '@saas-ui/sidebar';
import {  Box } from '@chakra-ui/react';
import { Page, PageBody } from '@saas-ui/pro';
import { Toolbar, ToolbarButton } from "@saas-ui/pro";
import { Card, CardBody } from '@saas-ui/react';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react'
export default function AddDonor(users) {
    const router = useRouter();
    const schema = Yup.object({
        donor: Yup.string().required().label('Donor Name'),
        Email: Yup.string().email().required().label('Enter Valid Email'),
        Phone: Yup.string().required().label('Phone Number'),
        Address: Yup.string().required().label('Address'),
        City: Yup.string().required().label('City Name'),
        State: Yup.string().required().label('State Name'),
        Country: Yup.string().required().label('Country Name'),
        Zipcode:  Yup.string().required().label('Zipcode'),
      })
    let handleSubmit = async (params) => {
        let res = await fetch("/api/donor", {
        method: "POST",
        body: JSON.stringify({
            donor: params.donor,
            Email: params.Email,
            Phone: params.Phone,
            Address: params.Address,
            City: params.City,
            State: params.State,
            Country: params.Country,
            Zipcode: params.Zipcode,
        }),
        });
        if(res.status === 200){
          
            router.push('/donor');
          }
    }

    const donorname = [];
    let length1 = (users.users).length;
    for(let i=0; i< length1;i++){
        donorname.push(users.users[i].donor);
    }
    // console.log(donorname);

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
                    title={
                        <Breadcrumb>
                    <BreadcrumbItem>
                      <Link href='/donor'>Donor</Link>
                    </BreadcrumbItem>
                  
                    <BreadcrumbItem isCurrentPage>
                      <Link href='/adddonor'>AddDonor</Link>
                    </BreadcrumbItem>
                  </Breadcrumb>
                      }
                    width="80vw"
                    overflow="hidden"
                    toolbar={
                      <Toolbar variant="outline">
                      </Toolbar>
                    }
                  >
                    <PageBody>
                    <Box position="sticky" width="auto" mt={"5"}>
                        <Heading size={"md"}>Add Donor Details</Heading>
                        <Text mt={"3"} mb={"4"} color="Muted">Fill Up The Form Below</Text>
                        <Divider orientation="horizontal"  mb={"4"} maxW="700px" />
                        <Card isHoverable variant="outline" maxW="700px">
                            <CardBody>
                                <Form onSubmit={handleSubmit} resolver={yupResolver(schema)}>
                                    <FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="donor" label="Donor Name" type="text"  required />
                                            <Field name="Email" label="Email" type="email"  required/>
                                        </FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="Phone" label="Phone" type="number" required  />
                                            <Field name="Address" label="Address" type="text" required/>
                                        </FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="City" label="City" type="text" required/>
                                            <Field name="State" label="State" type="text" required />
                                        </FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                        <Field name="Country" label="Country" type="text" required/>
                                        <Field name="Zipcode" label="Zipcode" type="number" required/>
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
                    </PageBody>
                </Page>
           
        </AppShell>
      </HStack>
       
    )
}
export async function getServerSideProps(context) {
    const client = await clientPromise;
    const db = client.db("nextjs-mongodb-demo");
    let users = await db.collection("donors").find({}).toArray();
    users = JSON.parse(JSON.stringify(users));
    return {
      props: { users },
    };
  }