export interface IAnimal {
    animalname: string;
    age: number;
    species: string;
}

export class Animal implements IAnimal {

    private _animalname: string;
    private _age: number;
    private _species: string;

    constructor (animalname: string, age: number, species: string) {
        this._animalname = animalname;
        this._age = age;
        this._species = species;
    }

    public set animalname(val: string) {
        this._animalname = val;
    }

    public get animalname(): string {
        return this._animalname;
    }

    public set age(val: number) {
        this._age = val;
    }

    public get age(): number {
        return this._age;
    }

    public set species(val: string) {
        this._species = val;
    }

    public get species(): string {
        return this._species;
    }
}

