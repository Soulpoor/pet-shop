import fs from 'fs';
import path from 'path';
import { sign, verify, SignOptions } from 'jsonwebtoken';
import { isUndefined } from 'util';

export class JwtService {

    private static instance: JwtService;
    private _privateKey;
    private _signOptions: SignOptions;

    private constructor () {
        this._signOptions = {
            issuer: 'sha',
            expiresIn: '1h'
        };
    }
    
    public static getInstance(): JwtService {
        this.instance = this.instance || new JwtService();
        return this.instance;
    }

    public generateToken(name): string | null {
        
        try {
            const payload = {
                sub: name,
                iat: new Date().getTime()
            };
            return sign(payload, this._privateKey, this._signOptions);
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    public verifyToken(token: string): Boolean | Object {
        try {
            return verify(token, this._privateKey);
        } catch (err) {
            console.error('>> Invalid token!');
        }
        return false;
    }

    public async setPrivateKey (key): Promise<void> {
        try {
            this._privateKey = await fs.readFileSync(path.join(__dirname, '../../', key))
        } catch(err) {
            console.error(err);
        }
    }

    public getPrivateKey (): Buffer {
        if (isUndefined(this._privateKey)) {
            throw new Error('No private key is set.')
        } else {
            return this._privateKey;
        }
    }
}