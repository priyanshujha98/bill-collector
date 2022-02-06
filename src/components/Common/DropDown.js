import React from 'react';
import Select from 'react-select';

export const DropDown = (props)=>{
    const dropDownChange =( changedValue ) =>{
        props.setFieldValue(props.name, changedValue?.value)
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
            <Select
                name={props.name}
               
                options={options}
                onChange={dropDownChange}
                placeholder={props.placeholder || ""}
                isClearable={true}
                value={options.filter(option => option.value === props.selected[props.name])}
            ></Select>
        </div>
    )
}