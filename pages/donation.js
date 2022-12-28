import clientPromise from "../lib/mongodb";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { SearchInput } from '@saas-ui/react'
import { RiRefund2Fill } from "@react-icons/all-files/ri/RiRefund2Fill";
import { FiCircle } from "@react-icons/all-files/fi/FiCircle"
import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { BiDonateHeart } from "@react-icons/all-files/bi/BiDonateHeart";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { AppShell } from '@saas-ui/app-shell';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Beacon } from '@saas-ui/pro'
import { Spacer, Container, Center } from '@chakra-ui/react';
import { Menu,MenuList, MenuButton, MenuItem} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, HStack } from '@chakra-ui/react';
import { Sidebar, SidebarSection, SidebarToggleButton, NavItem} from '@saas-ui/sidebar';
import { DataTable, DataTableProps, TableInstance, Column } from "@saas-ui/react";
import { Text, Box } from '@chakra-ui/react';
import { ButtonGroup, Button } from "@chakra-ui/react";
import { useDataGridFilter } from "@saas-ui/pro";
import { Page, PageBody } from '@saas-ui/pro';
import { FiltersProvider, FiltersAddButton, ActiveFiltersList } from '@saas-ui/pro'
import { Toolbar, ToolbarButton } from "@saas-ui/pro";
import { DataGrid,DataGridPagination } from "@saas-ui/pro";

export default function Donation(users) {
  const router = useRouter();
  const gridRef = useRef();
  const [Searchvalue, setSearchvalue] = React.useState('');
  const [SearchResultShow, setSearchResultShow] = React.useState(false);
  let setSearchvalue1 = async () => {
    let res = await fetch("http://localhost:3000/api/search", {
      method: "POST",
      body: JSON.stringify({
        Searchvalue: Searchvalue,
      }),
    });
    
    const SearchResult = res.data;
    return SearchResult
    
  };

  // setSearchvalue1().then((r)=> console.log(r));
  const filters = [
      {
        id: 'type',
        label: 'Type',
        type: 'enum',
        icon: <FiCircle />,
        items: [
          {
            id: 'Cash',
            label: 'Cash',
            value: 'Cash',
            icon: <Beacon  />,
          },
          {
            id: 'CreditCard',
            label: 'CreditCard',
            value: 'CreditCard',
            icon: <Beacon colorScheme="primary"/>,
          },
        ],
      },
      {
        id: 'fund',
        label: 'Fund',
        type: 'enum',
        icon: <RiRefund2Fill />,
        items: [
          {
            id: 'General Fund',
            label: 'General Fund',
            value: 'General Fund',
            icon: <Beacon colorScheme="blue" />,
          },
          {
            id: 'Covid Relif Fund',
            label: 'Covid Relif Fund',
            value: 'Covid Relif Fund',
            icon: <Beacon colorScheme="cyan"/>,
          },
        ],
      },
    ];
    const data1 = [];
    let length1 = (users.users).length;
    for(let i=0; i< length1;i++){
        data1.push(users.users[i]);
        
    }
    

    const defaultFilters = [{ id: 'type', operator: 'is', value: 'All' }]
    const columns  = [
          {
            id: 'donor',
            accessor: 'donor',
            Header: 'Donor',
            filterFn: useDataGridFilter('string'),
            size: 70,
            meta: {
              href: ({ _id }) => `#donation/${_id}`,
            },
           
          },
          {
            id: 'amount',
            accessor: 'amount',
            Header: 'Amount',
            filterFn: useDataGridFilter('string'),
            size: 70,
            meta: {
              href: ({ _id }) => `#donation/${_id}`,
            },
          },
          {
            id: 'type',
            accessor: 'type',
            Header: 'Type',
            filterFn: useDataGridFilter('string'),
            size: 70,
            meta: {
              href: ({ _id }) => `#donation/${_id}`,
            },
          },
          {
            id: 'fund',
            accessor: 'fund',
            Header: 'Fund',
            filterFn: useDataGridFilter('string'),
            size: 70,
            meta: {
              href: ({ _id }) => `#donation/${_id}`,
            },
          },
          {
            id: 'date',
            accessor: 'date',
            Header: 'Date',
            filterFn: useDataGridFilter('date'),
            meta: {
              href: ({ _id }) => `#donation/${_id}`,
            },
            
          },
    ];
    // const fetch = (users.map((user,index) => {

    // }))

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

  //  let onNextpage(() => {
  //     router.push({
  //       pathname: '/updatedonation',
//           query: user,
  //      })
  //  })
   let onNextpage = () => {
        router.push({
          pathname: '/updatedonation',
         })
  };
  


    const [type, setType] = React.useState('new');

      const filteredData = React.useMemo(() => {
        return data1.filter((row) => {
          return row.type === type
        })
      }, [type])  

      

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
                      <NavItem icon={<FiUser />} isActive>Donation</NavItem>
                      <Link href='/donor'><NavItem icon={<BiDonateHeart />}>Donor</NavItem></Link>
                  </SidebarSection>
                </Sidebar>
              }
            >
              <FiltersProvider filters={filters} onChange={onFilter} >
        
                  <Page height="400px" contentWidth="full" position="sticky"
                      title="Donation"
                      width="80vw"
                      overflow="hidden"
                      sx={{
                        '& tbody tr:hover': {
                          cursor: 'pointer',
                        },
                      }}
                      toolbar={
                        <Toolbar variant="outline">
                          <SearchInput placeholder="Search" value={Searchvalue}
                              onInput={(e) => setSearchvalue(e.target.value)}
                              onChange={setSearchvalue1}
                              onReset={() => setSearchvalue('')}
                              size="sm" 
                              width={"sm"}
                               />
                          <FiltersAddButton  />
                          <Link href="/adddonation"><Button
                            label="Add Donations"
                             backgroundColor={"#2563eb"} color={"white"} pointerEvents={"none"}
                          >Add Donations</Button></Link>
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
                        <ActiveFiltersList />
                      <Box position="sticky">
                      
                      <DataGrid
                        instanceRef={gridRef}
                        columns={columns}
                        data={data1}
                        isSortable
                        isSelectable
                        isHoverable
                        // getRowId={(rows) => {console.log(rows._id);}}
                        onRowClick={(row) => {onNextpage(row.id)}}
                    >
                      <DataGridPagination style={{ marginTop: "80px"}} />
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
    let users = await db.collection("donations").find({}).toArray();
    users = JSON.parse(JSON.stringify(users));

  

    return {
      props: { users },
    };
  }