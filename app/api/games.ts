async function getData() {
    const url = "https://store-content-ipv4.ak.epicgames.com/api/ru/content/products/fortnite";
    const response = await fetch(url);
    const data = await response.json()
    console.log(data);

    return data;
}

export default getData;