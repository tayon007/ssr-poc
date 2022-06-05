import React, { useContext, useEffect, useState } from 'react';
import { ManageOrgs } from "../api/Organizations";
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import Button from '@mui/material/Button';
import { manageOrgTableColumns } from "../../utils/constants";

export default function Home({ organizations }) {
  
  const [organizationData, setOrganizationData] = useState(organizations);
  const [organizationQueryParams, setOrganizationQueryParams] = useState('?pageIndex=0&limit=10&search=');
  
  const handlePage = (value) => {
    setOrganizationQueryParams(`?pageIndex=${value}&limit=10&search=`);
  }

 useEffect(() => {
  async function fetchData(){
    const response = await ManageOrgs(organizationQueryParams);
    setOrganizationData(response);
  }
  fetchData()
 }, [organizationQueryParams])


  const displayCellData = (colID, rowData) => {
    switch(colID) {
      case 'name': return <b>{rowData.name}</b>;
      case 'description': return rowData.description;
      case 'subOrganizations': if(rowData.subOrganizations.length > 1){
        return (<span>{rowData.subOrganizations.join(', ')}</span>)
      } else {
        return rowData.subOrganizations;
      }
      case 'users': return rowData.userCount;
    }
  }

    return (
      <>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                {manageOrgTableColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    data-align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <b>{column.label}</b>
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {organizationData.items.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  {
                    manageOrgTableColumns.map((column) => {
                      return (
                        <TableCell
                          key={`${column.id}_${row.id}`}
                          data-align={column.align}
                          size="small"
                        >
                          {displayCellData(column.id, row)}
                        </TableCell>
                      )
                    })
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <br />
        <div data-align="center">
          {organizationQueryParams.includes('=0') ? (
            <Button variant="contained" onClick={() => handlePage('1')}>Next Page</Button>
          ): (
            <Button variant="contained" onClick={() => handlePage('0')}>Previous Page</Button>
          )}
        </div>
      </>
    )
  }
  
  // export async function getServerSideProps() {
  //   const organizations = await ManageOrgs('?pageIndex=0&limit=10&search=');
  //   return {
  //     props: {
  //       organizations
  //     }
  //   }
  // }
  export async function getStaticProps() {
    const organizations = await ManageOrgs('?pageIndex=0&limit=10&search=');
    return {
      props: {
        organizations
      }
    }
  }

