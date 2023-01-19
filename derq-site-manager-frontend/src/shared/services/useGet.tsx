import doFetch from "./doFetch";

interface useGetProps {
    url: string
}

export default async function doGet({url} : useGetProps) {

    const options = {
        method: "GET"
    }
    let data = await doFetch({url, options});

    console.log(data);
    
    return data.json();
}