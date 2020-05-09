import { Pool, QueryResult } from 'pg';

export type QueryRequest = {
    query: string,
    values: (string | number | boolean)[],
    callback?: (res: QueryResult) => QueryRequest[]
}

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

    public async query(req: QueryRequest): Promise<QueryResult> {
        const client = await this.pool.connect();

        let res: QueryResult;
        try {
            res = await client.query(req.query, req.values);
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

    public async transaction(requests: QueryRequest[]): Promise<QueryResult[]> {
        const client = await this.pool.connect();

        let results: QueryResult[] = [];
        try {
            await client.query('BEGIN');

            for (let i = 0; i < requests.length; i++) {
                const req = requests[i];

                const res = await client.query(req.query, req.values);
                results.push(res);

                if (req.callback) {
                    const nextRequests = await req.callback(res);
                    requests.splice(i+1, 0, ...nextRequests);
                }
            }

            await client.query('COMMIT')
        } catch (err) {
            console.error(`transaction error: ${err.message}\n${JSON.stringify(err.stack)}`)
            await client.query('ROLLBACK');
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release();
        }

        return results;
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