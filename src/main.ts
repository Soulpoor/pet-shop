'use strict';

import './models';
import { JwtService } from './services/JwtService';
import { Server } from './Server';
import { readFileSync } from 'fs';
import { join } from 'path';

// Loading secret
JwtService.getInstance().setPrivateKey('secret/secret.key');

// console.log(JwtService.getInstance().getPrivateKey());

// 
const httpServ = new Server();
httpServ.listen(8080);