import React from 'react';
import CreateableSelect from 'react-select/creatable';

export const CreateableDropdown = (props)=>{
    const dropDownChange =( changedValue ) =>{
       
        if(changedValue?.__isNew__){
            const generatedValue = {id:Math.ceil(Math.random()*10000000), [props.fieldName]: changedValue?.value}
            props.setFieldValue(props.name, generatedValue?.id)
            props.newRole([generatedValue])
        }else{
            props.newRole(null)
            props.setFieldValue(props.name, changedValue?.value)
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
                value={options.filter(option => option.value === props.selected[props.name])}
            ></CreateableSelect>
        </div>
    )
}