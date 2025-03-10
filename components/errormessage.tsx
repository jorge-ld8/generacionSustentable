import React from 'react';

type ErrorProps = {
    touched: boolean,
    errors: string,
}

const ErrorMessage: React.FC<ErrorProps> = (props)=>
{
    const mainBool = props.touched && props.errors;
    return(mainBool ? (
        <div style={{color: 'red', fontSize: '1.05em'}}>{props.errors}</div>
      ) : null);
};

export default ErrorMessage;