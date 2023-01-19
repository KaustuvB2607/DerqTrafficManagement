interface useFetchProps {
  url: string;
  options: Object;
  body?: Object;
}

export default async function doFetch({ url, options, body }: useFetchProps) {
  const taregtURL = process.env.REACT_APP_BASE_URL + url;
  console.log(taregtURL);

  let groupedOptions = body
    ? { ...options, body: JSON.stringify(body) }
    : {
        ...options,
      };

  // console.log(JSON.stringify(body));
  let response = await fetch(taregtURL, {
    ...groupedOptions,
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    //credentials: "same-origin", // include, *same-origin, omit
    //mode: "no-cors", // no-cors, *cors, same-origin
    //mode: "no-cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  // .then((res) => res.json())
  // .then((res) => console.log(JSON.stringify(res)))
  // .catch((err) => console.log(err));

  // console.log(response)
  return response;
}
