import {
    VALIDATE_FORM,
    VALIDATE_FORM_SUCCESS,
    VALIDATE_FORM_FAIL
} from '../types';


export function validateFormAction() {
    return dispatch => {
        dispatch( initValidation() );
    }
}

export const initValidation = () => {
    return {
        type: VALIDATE_FORM
    }
}

export const validationSuccess = () => {
    return {
        type: VALIDATE_FORM_SUCCESS
    }
}

export const validationError = () => {
    return {
        type: VALIDATE_FORM_FAIL
    }
}