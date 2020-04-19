import { Pool, QueryResult } from 'pg';

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

    public async query(query: string, values: any[]): Promise<QueryResult> {
        const client = await this.pool.connect();

        let res: QueryResult;
        try {
            res = await client.query(query, values);
        } catch (err) {
            console.error(`query error: ${err.message}`);
            throw err;
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
        }

        return res;
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

        console.log(`DB: Connected to ${name} at ${host}:${port}`);
    
        pool.on('error', (err: Error) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })
    
        return pool;
    }
}