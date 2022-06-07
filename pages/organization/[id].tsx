import { ManageOrgById, ManageOrgs } from "../api/Organizations";
import { TextField } from '@mui/material';
// import { useRouter } from 'next/router';

export default function EditUser ({organization}) {

    // const { id } = useRouter().query;
 
    return (
        <div>
            <h1>Edit {organization.name}</h1>
            <br />
            <section>
                <TextField
                    required
                    autoComplete="off"
                    variant="outlined"
                    id="outlined-basic"
                    value={organization.name}
                    type="text"
                    label="Name"
                    size="small" />
            </section>
                <br/>
            <section>
                <TextField
                    required
                    autoComplete="off"
                    variant="outlined"
                    id="outlined-basic"
                    value={organization.description}
                    type="text"
                    label="Description"
                    size="small" />
            </section>
        </div>
    )
    
}

// export async function getServerSideProps(context) {
//     const { params } = context;
//     const { id } = params;
//     const organization = await ManageOrgById(Number(id));
//     return {
//       props: {
//         organization
//       }
//     }
// }
export async function getStaticProps(context) {
    const { params } = context;
    const { id } = params;
    const organization = await fetch(`http://localhost:8090/api/organizations/${id}`);
    return {
      props: {
        organization: await organization.json()
      },
      revalidate: 60000,
    }
}

export async function getStaticPaths() {
    const response = await fetch(`http://localhost:8090/api/organization-list?pageIndex=0&limit=10&search=`)
    const organizations = await response.json();
    return {
      paths: organizations.items.map(org => ({
          params: { id: org.id.toString() },
      })),
      fallback: false,
    }
 
}   