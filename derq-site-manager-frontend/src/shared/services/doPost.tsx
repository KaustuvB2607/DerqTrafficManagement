import doFetch from "./doFetch";

interface usePostProps {
    url: string,
    body: Object
}

export default async function doPost({url, body} : usePostProps) {

    const options = {
        method: "POST"
    }

    //const [data, setData] = useState();
    //useFetch({url, options}).then((res)=>console.log(res)).catch((err) => console.log(err));
    let data = await doFetch({url, options, body});
    // console.log(data.headers)
    return data.json();
}