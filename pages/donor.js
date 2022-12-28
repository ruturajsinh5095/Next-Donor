import clientPromise from "../lib/mongodb";
import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { BiDonateHeart } from "@react-icons/all-files/bi/BiDonateHeart";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { RiRefund2Fill } from "@react-icons/all-files/ri/RiRefund2Fill";
import { AppShell } from '@saas-ui/app-shell';
import Image from 'next/image';
import Link from 'next/link';
import React from "react";
import { useRef } from "react";
import { useRouter } from 'next/router';
import { SearchInput } from '@saas-ui/react'
import { Button, Spacer } from '@chakra-ui/react';
import { Beacon } from '@saas-ui/pro';
import { Menu,MenuList, MenuButton, MenuItem, Container} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, HStack } from '@chakra-ui/react';
  import {
    Sidebar,
    SidebarSection,
    SidebarToggleButton,
    SidebarOverlay,
    NavGroup,
    NavItem,
  } from '@saas-ui/sidebar';
import { Text, Box } from '@chakra-ui/react';
import { useDataGridFilter } from "@saas-ui/pro";
import { Page, PageBody } from '@saas-ui/pro';
import { FiltersProvider, FiltersAddButton, ActiveFiltersList } from '@saas-ui/pro'
import { Toolbar, ToolbarButton } from "@saas-ui/pro";
import { DataGrid,DataGridPagination } from "@saas-ui/pro";

export default function Donor(users) {
  const router = useRouter();
  const gridRef = useRef();
  const [Searchvalue, setSearchvalue] = React.useState('');
  const filters = [
    {
      id: 'Country',
      label: 'Country',
      type: 'enum',
      icon: <RiRefund2Fill />,
      items: [
        {
          id: 'Tuvalu',
          label: 'Tuvalu',
          value: 'Tuvalu',
          icon: <Beacon  />,
        },
        {
          id: 'Switzerland',
          label: 'Switzerland',
          value: 'Switzerland',
          icon: <Beacon colorScheme="primary"/>,
        },
        {
          id: 'United States',
          label: 'United States',
          value: 'United States',
          icon: <Beacon colorScheme="cyan"/>,
        },
      ],
    },
  ];
  const columns  = [
    {
      id: 'donor',
      accessor: 'donor',
      Header: 'Donor',
      filterFn: useDataGridFilter('string'),
      size: 70,
      meta: {
        href: ({ _id }) => `#donor/${_id}`,
      },
    },
    {
      id: 'Email',
      accessor: 'Email',
      Header: 'Email',
      filterFn: useDataGridFilter('string'),
      size: 70,
      meta: {
        href: ({ _id }) => `#donor/${_id}`,
      },
    },
    {
      id: 'Phone',
      accessor: 'Phone',
      Header: 'Phone',
      filterFn: useDataGridFilter('string'),
      size: 70,
      meta: {
        href: ({ _id }) => `#donor/${_id}`,
      },
    },
    {
      id: 'Address',
      accessor: 'Address',
      Header: 'Address',
      filterFn: useDataGridFilter('string'),
      size: 70,
      meta: {
        href: ({ _id }) => `#donor/${_id}`,
      },
    },
    {
      id: 'Country',
      accessor: 'Country',
      Header: 'Country',
      filterFn: useDataGridFilter('string'),
      meta: {
        href: ({ _id }) => `#donor/${_id}`,
      },
    },
    
  ];

  const onFilter = React.useCallback((filters) => {
    gridRef.current.setColumnFilters(
      filters.map((filter) => {
        return {
          id: filter.id,
          value: {
            value: filter.value,
            operator: filter.operator || 'is',
          },
        }
      }) 
    )
  }, []);

  let onNextpage = () => {
    router.push({
      pathname: '/updatedonor',
     })
};


  const data1 = [];
  let length1 = (users.users).length;
  for(let i=0; i< length1;i++){
      data1.push(users.users[i]);
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
                  <MenuButton as={IconButton} icon={ <FaUserCircle size={'2em'}/>} variant="ghost"/>
                  <MenuList>
                    <MenuItem>Home</MenuItem>
                  <Link href="/"> <MenuItem>Sign out</MenuItem></Link>
                  </MenuList>
                </Menu>
              </SidebarSection>
              <SidebarSection aria-label="Main">
                  <Link href='/dashboard'><NavItem icon={<FiHome />} >Dashboard</NavItem></Link>
                  <Link href='/donation'><NavItem icon={<FiUser />} >Donation</NavItem></Link>
                  <NavItem icon={<BiDonateHeart />} isActive>Donor</NavItem>
              </SidebarSection>
            </Sidebar>
          }
        >
          <FiltersProvider filters={filters} onChange={onFilter} >
    
              <Page height="400px" contentWidth="full" position="sticky"
                  title="Donors"
                  width="80vw"
                  overflow="hidden"
                  toolbar={
                    <Toolbar variant="outline">
                      <SearchInput placeholder="Search" value={Searchvalue}
                          
                          size="sm" 
                          width={"sm"}
                           />
                      <FiltersAddButton  />
                      <Link href="/adddonor"><Button
                             backgroundColor={"#2563eb"} color={"white"} pointerEvents={"none"}
                          >Add Donor</Button></Link>
                    </Toolbar>
                  }
                >
                  <PageBody>
                  {/* <Box borderBottomWidth="1px" position="sticky" width="100vw">
                      <ButtonGroup isAttached mb="5" mt="5" mr="5">
                        <Button isActive>
                          All
                        </Button>
                        <Button>
                          Active
                        </Button>
                        <Button>
                          Deleted
                        </Button>
                      </ButtonGroup>
                    </Box> */}
                    <ActiveFiltersList/>
                  <Box position="sticky">
                  
                  <DataGrid
                    instanceRef={gridRef}
                    columns={columns}
                    data={data1}
                    isSortable
                    isSelectable
                    isHoverable
                    onRowClick={(row) => {onNextpage(row.id)}}
                >
                  <DataGridPagination style={{ marginTop: "80px"}}  />
                </DataGrid>
                  </Box>
                 
                  </PageBody>
              </Page>
          </FiltersProvider>
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