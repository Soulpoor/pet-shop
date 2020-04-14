import { Animal } from './Animal';

export class AnimalModel {
    
    private level = require('level');
    private db: any;

    constructor() {
        this.db = this.level('db-animal');
    }

    public async put(animalname: string, age: number, species: string) : Promise<void> {
        await this.db.put(animalname, JSON.stringify({
            animalname: animalname,
            age: age,
            species: species
        }));
    }

    /**
     * eg:
     *     const animals: Array<Animal> = [];
     *     const animalsStream = await put.fetchAll();
     *     animalsStream.on('data', (data) => {
     *         animals.push(JSON.parse(data));
     *     })
     *     .on('end', () => {
     *         return animals;
     *     });
     */
    public async fetchAll() : Promise<any> {
        return await this.db.createValueStream({ keys: true, values: true })
    }

    public async get(animalname: string) : Promise<Animal> {
        return <Animal> JSON.parse(await this.db.get(animalname));
    }

    public async del(animalname: string) : Promise<void> {
        await this.db.del(animalname);
    }

    public async isFound(animalname: string) : Promise<boolean> {
        try {
            return JSON.parse(await this.db.get(animalname));
        } catch (err) {
            return false;
        }
    }
}