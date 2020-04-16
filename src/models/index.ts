import { UserModel } from './UserModel';
import { User } from './User';
import { AnimalModel } from './AnimalModel';
import { Animal } from './Animal';

const userDB   = new UserModel();
const animalDB = new AnimalModel();

export {
    User,
    userDB,
    Animal,
    animalDB,
}