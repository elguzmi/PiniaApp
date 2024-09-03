export interface Client {
    first: number;
    prev:  null;
    next:  number;
    last:  number;
    pages: number;
    items: number;
    data:  Datum[];
}

export interface Datum {
    id:       string;
    isActive: boolean;
    picture:  string;
    age:      number;
    eyeColor: string;
    name:     string;
    gender:   Gender;
    company:  string;
    email:    string;
    phone:    string;
    address:  string;
}

export enum Gender {
    Female = "female",
    Male = "male",
}
