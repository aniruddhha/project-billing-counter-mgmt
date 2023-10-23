
export const validateFields = ( email: string, password: string  ) => {

    const err =  { 
        email : { msg : '', isValid : false } ,
        password: { msg: '', isValid: false }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!email.match(emailRegex)) {
        err.email.msg = 'Invalid Email'
    }else {
        err.email.msg = 'Email Okay'
        err.email.isValid = true
    }

    if(!password.trim()) {
        err.password.msg = 'Password is required'
    }else {
        err.password.msg = 'Password Okay'
        err.password.isValid = true
    }

    return err
}