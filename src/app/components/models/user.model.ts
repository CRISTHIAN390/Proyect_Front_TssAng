export interface UserModel {
  id: number;
  first_name: string;
  DNI: string;
  phone: string;
  email:string;
  role_id: number;
  date_created: Date;
  status: boolean;
}
