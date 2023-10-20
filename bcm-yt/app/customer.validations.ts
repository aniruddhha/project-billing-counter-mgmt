import { ICustomer } from "./domain/cutomer-domain"


export interface IpError {
    name : { msg : string, isValid: boolean },
    mobile : { msg : string, isValid: boolean },
    email : { msg : string, isValid: boolean },
    dob : { msg : string, isValid: boolean }
}

export const validateFields = ( { mobile, name, email, dob  } : ICustomer) => {

    const err: IpError = {
         name : { msg : '', isValid :false},
         mobile : { msg : '', isValid :false},
         email : { msg : '', isValid :false},
         dob : { msg : '', isValid :false}
    }

    const mobileRegex = /^[0-9]{10}$/
    if(!mobile.match(mobileRegex)) {
        err.mobile.msg = 'Invalid Mobile'
    }else {
        err.mobile.msg = 'Mobile Okay'
        err.mobile.isValid = true
    }

    if(!name.trim()) {
        err.name.msg = 'Name is required'
    }else {
        err.name.msg = 'Name Okay'
        err.name.isValid = true
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!email.match(emailRegex)) {
        err.email.msg = 'Invalid Email'
    }else {
        err.email.msg = 'Email Okay'
        err.email.isValid = true
    }

    const currentDate = new Date()
    const dobFd = new Date(dob)

    if(isNaN(dobFd.getTime())) {
        err.dob.msg = 'Invalid Date Format'
        err.dob.isValid = false
    } else {
        if(dobFd >= currentDate) {
            err.dob.msg = 'DOB should be past date'
            err.dob.isValid = false
        }
        else {
            err.dob.msg = 'DOB Okay'
            err.dob.isValid = true
        }
    }

    return err
}