export interface User {
    _id?: string,
    firstname: string,
    lastname: string,
    phoneNumber: string,
    address: string,
    email: string,
    isDisabled?: boolean,
    idEditable?: boolean,
    isRemovable?: boolean
  }