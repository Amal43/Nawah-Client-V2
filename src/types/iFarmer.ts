export default interface IFarmer {
    _id:string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    farmaddress?: string;
    farmarea?: number;
    cropamount?: number;
    croptype?: string;
    farmingExperience?: number;
    img?: string;
    notes?: Array<object>;
    role?: string;
    order?: Array<object>;
}