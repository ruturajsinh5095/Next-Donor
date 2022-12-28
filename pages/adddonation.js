import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { BiDonateHeart } from "@react-icons/all-files/bi/BiDonateHeart";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { Form, FormLayout, Field, SubmitButton} from '@saas-ui/react'
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
export default function AddDonation(users) {
    const router = useRouter();
    const schema = Yup.object({
        donor: Yup.string().required().label('Donor Name'),
        amount: Yup.string().required().label('Amount'),
        date: Yup.string().required().label("Date"),
      })
    let handleSubmit = async (params) => {
        let res = await fetch("/api/donation", {
        method: "POST",
        body: JSON.stringify({
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
                    <Link href='/donation'>Donation</Link>
                  </BreadcrumbItem>
                
                  <BreadcrumbItem isCurrentPage>
                    <Link href='/adddonation'>AddDonation</Link>
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
                        <Heading size={"md"}>Add Donation Details</Heading>
                        <Text mt={"3"} mb={"4"} color="Muted">Fill Up The Form Below</Text>
                        <Divider orientation="horizontal"  mb={"4"} maxW="700px" />
                        <Card isHoverable variant="outline" maxW="700px">
                            <CardBody>
                                <Form onSubmit={handleSubmit} resolver={yupResolver(schema)}>
                                    <FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="donor" label="Donor Name" type="text"  required />
                                            <Field name="amount" label="Amount" type="number" min="0"  required/>
                                        </FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="date" label="Date" type="date"  />
                                            <Field name="type" label="Type" type="select" value="Cash"  required
                                            options={[
                                                { value: 'Cash' },
                                                { value: 'CreditCard' },
                                                { value: 'Payoneer' },
                                                ]}/>
                                        </FormLayout>
                                        <FormLayout columns={[1, null, 2]}>
                                            <Field name="fund" label="Fund" type="select" value="General Fund" required
                                            options={[
                                                { value: 'General Fund' },
                                                { value: 'Covid Relif Fund' },
                                                ]}/>
                                            <Field name="status1" label="Status" type="select" value="Paid" required
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
                    </PageBody>
                </Page>
           
        </AppShell>
      </HStack>
       
    )
}
export async function getServerSideProps(context) {
    const client = await clientPromise;
    const db = client.db("nextjs-mongodb-demo");
    let users = await db.collection("donations").find({}).toArray();
    users = JSON.parse(JSON.stringify(users));
    return {
      props: { users },
    };
  }