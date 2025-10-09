import { BaseModel } from './baseModel.js';

export const DrugType = new BaseModel('drug_types', ['nombre','descripcion','estado']);
export const Brand = new BaseModel('brands', ['nombre','estado']);
export const Location = new BaseModel('locations', ['nombre','descripcion','estante','estado']);
export const Medicine = new BaseModel('medicines', ['nombre','drug_type_id','brand_id','location_id','estado']);
export const Doctor = new BaseModel('doctors', ['nombre','identificador','cedula','tanda_laboral','especialidad','estado']);
export const Patient = new BaseModel('patients', ['nombre','cedula','identificador','tipo','estado','doctor_id']);
export const Visit = new BaseModel('visits', ['visitante','doctor_id','patient_id','medicine_id','fecha','hora','sintomas','estado']);
