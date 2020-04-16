import { animalDB, Animal } from '../models';
export class AnimalService {

    private static instance: AnimalService;
    private db;

    private constructor (animalDB) {
        this.db = animalDB;
    }
    
    public static getInstance(): AnimalService {
        this.instance = this.instance || new AnimalService(animalDB);
        return this.instance;
    }

    public async createAnmalHandler(options, response): Promise<void> {
        const isFound = await this.db.isFound(options.animalname);
        if (isFound) {
            response.write(JSON.stringify({
                'success': false,
                'result' : 'This animal has been created!',
                'name' : options.name,
            }));
            response.end();
        } else {
            await this.db.put(options.animalname, Number(options.age), options.species);
            response.write(JSON.stringify({
                'success': true,
                'result' : `Create animal successful`,
                'name' : options.animalname,
            }));
            response.end();
        }
    }

    public async fetchAnimalHandler(options, response): Promise<void> {
        const animals: Array<Animal> = [];
        const animalsStream = await this.db.fetchAll();
        animalsStream.on('data', (data) => {
            animals.push(JSON.parse(data));
        })
        .on('end', () => {
            response.write(JSON.stringify(animals));
            response.end();
        });
    }

    public async updateAnimalHandler(options, response): Promise<void> {
        const isFound = await this.db.isFound(options.animalname);
        if (isFound) {
            const updateAnimal: Animal = new Animal(options.animalname, options.age as number, options.species);

            updateAnimal.animalname = isFound.animalname;
            updateAnimal.age = options?.age || isFound.age;
            updateAnimal.species = options?.species || isFound.species;

            await this.db.put(updateAnimal.animalname, updateAnimal.age, updateAnimal.species);

            response.write(JSON.stringify({
                'success': true,
                'result' : 'This animal has been updated!',
                'name' : options.animalname,
            }));
            response.end();
        } else {
            response.write(JSON.stringify({
                'success': false,
                'result' : `The ${options.animalname} not found!`,
                'name' : options.animalname,
            }));
            response.end();
        }
    }

    public async deleteAnimalHandler(options, response): Promise<void> {
        const isFound = await this.db.isFound(options.animalname);
        if (isFound) {
            await this.db.del(options.animalname);
            response.write(JSON.stringify({
                'result' : `The ${options.animalname} deleted.`,
                'name'  : options.animalname
            }));
            response.end();
        } 
    }
}