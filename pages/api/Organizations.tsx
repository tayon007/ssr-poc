import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json())

async function ManageOrgs(params: string) {
    const response = await fetch(`http://localhost:8090/api/organization-list${params}`);
    const data = await response.json();
    return data;
}

async function ManageOrgById(id) {
    const response = await fetch(`http://localhost:8090/api/organizations/${id}`);
    const data = await response.json();
    return data;
}



export { ManageOrgs, ManageOrgById };