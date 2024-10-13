export default async function addLog(endpoint: string, query_params: string, response_code: number, response_time_ms: number, client_ip: string, api_token: string ): Promise<String> {
    const queryString = `INSERT INTO ${process.env.DATABASE_DATABASE}.${process.env.DATABASE_TABLE} (api_endpoint, query_params, response_code, response_time_ms, client_ip, api_token) VALUES ('${endpoint}', '${query_params}', ${response_code}, ${response_time_ms}, '${client_ip}', '${api_token}')`;

    const response = await fetch(`${process.env.DATABASE_URL}/?query=${encodeURIComponent(queryString)}`, {
        method: "POST",
        //@ts-ignore
        headers: {
            "CF-Access-Client-Id": process.env.CLOUDFLARE_ID,
            "CF-Access-Client-Secret": process.env.CLOUDFLARE_SECRET,
            "X-ClickHouse-User": process.env.DATABASE_USER,
            "X-ClickHouse-Key": process.env.DATABASE_PASSWORD
        }
    })

    console.log(queryString)

    let responseText = await response.text()
    console.log(responseText)
    return responseText;
    
}