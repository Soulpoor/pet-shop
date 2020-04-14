import http from 'http';
import url from 'url';
import { AuthService } from './services/AuthService';
import { AnimalService } from './services/AnimalService';
import { JwtService } from './services/JwtService';

export class Server {

    private server;
    // private routeMapping: Map<String, Function>;

    private headerText = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    };

    constructor() {
        // Init the http server.
        this.server = http.createServer();
        this.server.on('request', this.handler.bind(this));
    }

    /*
    A function to route the various urls to their respective functions
    ie. /read should call readCounter()
    */
    public async handler(request, response) {
        
        response.writeHead(200, this.headerText);

        const options  = url.parse(request.url, true).query;

        // Login
        if (request.url.startsWith('/login')) {
            AuthService.getInstance().loginHandler(options, response);
            return;
        }
        else if (request.url.startsWith('/reg')) {
            AuthService.getInstance().regHandler(options, response);
            return;
        }



        // auth
        const reqMethod = request.method;
        if (reqMethod!=='OPTIONS') {
            const token = request.headers.authorization;
            if (token) {
                const isAllow = JwtService.getInstance().verifyToken(token);
                if (!isAllow) {
                    await this.redirectUnAuth(response);
                    return;
                }
            } else {
                await this.redirectUnAuth(response);
                return;
            }
        }

        // CRUD
        if (request.url.startsWith('/createAnimal')) {
            AnimalService.getInstance().createAnmalHandler(options, response);
            return;
        }
        else if (request.url.startsWith('/fetchAnimals')) {
            AnimalService.getInstance().fetchAnimalHandler(options, response);
            return;
        }
        else if (request.url.startsWith('/updateAnimal')) {
            AnimalService.getInstance().updateAnimalHandler(options, response);
            return;
        }
        else if (request.url.startsWith('/deleteAnimal')) {
            AnimalService.getInstance().deleteAnimalHandler(options, response);
            return;
        }
    }

    public listen(port) : void {
        this.server.listen(port);
    }

    public async redirectNotFound(response: any): Promise<void> {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('404 Not Found!');
    }

    public async redirectUnAuth(response: any): Promise<void> {
        response.writeHead(401, {'Content-Type': 'text/plain'});
        response.end('Unauthorized requests!');
    }
}

