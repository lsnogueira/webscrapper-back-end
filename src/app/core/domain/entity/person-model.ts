import { DomainModel } from './base/domain-model';

export class PersonModel extends DomainModel {
    name: string | null = null;
    age: number | null = null;
}