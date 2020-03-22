const { Client } = require('pg')
let client;

export async function connect() {
    return new Promise(() => {
        client = new Client()
        client.connect();
    });
}

export async function query() {
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
}

export async function disconnect() {
    await client.end()
}