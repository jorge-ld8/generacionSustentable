import React, { ReactNode } from "react";

export type DropDownListProps<ArbType extends Object> = {
    content: ArbType[]
    objType: string
    name: string
    onChange: any
    value: any
    multiple?: boolean
    message?: string  //en DropDownList no se usa pero en  DataList si :)
    disabled?: boolean
}

const DropDownList: React.FC<DropDownListProps<any>> = (props)=>
{
    return(
        <select name={props.name} onChange={props.onChange} value={props.value} id={props.name} multiple={props.multiple} disabled={props.disabled}>
            <option value="">N/A</option>
            {props.content.map((option)=>{               
                return (<option value={option}>{option}</option>);
            })}
            <style jsx>{`
                input,
                textarea,
                select
                {
                    /* To make sure that all text fields have the same font settings
                    By default, textareas have a monospace font */
                    font: 1em sans-serif;
        
                    /* Uniform text field size */
                    width: 100%;
                    box-sizing: border-box;
                    
                    border-radius: .5em;
    
                    /* Match form field borders */
                    border: 1px solid #999;
                    padding: 0.5em;
                }
            `}
            </style>
        </select>
    );
};

export default DropDownList