export default interface IEngineer {
    _id:string
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone?: number;
    address?: string;
    img?: string;
    role?: string;
    farmers?: Array<object>;
    license?:Array<string>;
};