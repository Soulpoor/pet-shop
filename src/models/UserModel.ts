import { User } from './User';

export class UserModel {
    
    private level = require('level');
    private db: any;

    constructor() {
        this.db = this.level('db-user');
    }

    public async put(username: string, password: string, email: string) : Promise<void> {
        await this.db.put(username, JSON.stringify({
            username,
            password,
            email
        }));
    }

    public async get(username: string) : Promise<User> {
        return <User> JSON.parse(await this.db.get(username));
    }

    public async del(username: string) : Promise<void> {
        await this.db.del(username);
    }

    public async isFound(username: string) : Promise<boolean> {
        try {
            return await this.db.get(username);
        } catch (err) {
            return false;
        }
    }
}