export interface IUser {
    username: string;
    password: string;
    email: string;
}

export class User implements IUser {

    private _username: string;
    private _password: string;
    private _email: string;

    constructor (username: string, password: string, email: string) {
        this._username = username;
        this._password = password;
        this._email = email;
    }

    public set username(val: string) {
        this._username = val;
    }

    public get username(): string {
        return this._username;
    }

    public set password(val: string) {
        this._password = val;
    }

    public get password(): string {
        return this._password;
    }

    public set email(val: string) {
        this._email = val;
    }

    public get email(): string {
        return this._email;
    }
}

