import React from 'react';
import CreateableSelect from 'react-select/creatable';

export const FunctionUpdateDropDown = (props)=>{
    const dropDownChange =( changedValue ) =>{
        if(changedValue?.__isNew__){
            props.setFieldValue({...changedValue, value: Math.ceil(Math.random()*1000000000000000)})  
        }else{

            props.setFieldValue(changedValue)
        }
    }
    const options = props.dropdownValue.map((value)=>{
        return {value: value.id, label: value.value}
    })

    const invalidStyle = {
        border: '1px solid red',
        borderRadius: '5px'
    }

    return(
        <div style={props?.isInvalid ? invalidStyle:{}}>
            <CreateableSelect
                name={props.name}
               
                options={options}
                onChange={dropDownChange}
                placeholder={props.placeholder || ""}
                isClearable={true}
                value={options.filter(option => option.value === props.selected)}
            ></CreateableSelect>
        </div>
    )
}