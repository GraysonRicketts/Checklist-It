import { Pool } from 'pg';

export default class DB {
    private pool: Pool;

    constructor(
        host: string,
        port: number,
        name: string,
        user: string,
        password: string,
        maxConnection: number,
        idleTimeoutMillis: number,
        connectionTimeoutMillis: number
    ) {
        this.pool = this.setupDb(host, port, name, user, password, maxConnection, idleTimeoutMillis, connectionTimeoutMillis);
    }

    public async query(query: string): Promise<any> {
        const client = await this.pool.connect();
        return await client.query(query);
    }

    private setupDb(host: string, port: number, name: string, user: string, password: string, maxConnection: number, idleTimeoutMillis: number,
        connectionTimeoutMillis: number): Pool {
        const pool = new Pool({
            host,
            port,
            database: name,
            user,
            password,
            max: maxConnection,
            idleTimeoutMillis,
            connectionTimeoutMillis
        });
    
        pool.on('error', (err: Error) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })
    
        return pool;
    }
}