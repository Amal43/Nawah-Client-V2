export interface IUser {
    _id:string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    img?: string;
    role?: string;
    order?: Array<object>;
}