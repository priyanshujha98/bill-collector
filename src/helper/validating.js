export const formValidate = (payload) =>{
    if(!(payload.group || (typeof(payload.group)==='object'))){
        return { success: false, msg: "Function group should not blank, Please select a group or create new one by typing" }
    }

    if(payload?.function?.arguments!==null){
        let valid = true
        payload?.function?.arguments?.forEach((arg) => {
            if(!(arg?.argumentName?.trim().length && arg?.argumentDescription?.trim().length)){
                valid = false
            }

            if(arg?.argumentCodes !== null){
                arg?.argumentCodes.forEach((argCode)=>{
                    if(!(argCode?.argumentCode?.trim().length && argCode?.argumentCodeDescription?.trim().length)){
                        valid = false
                    }
                })
            }
        })

        if(!valid){
            return { success: false, msg: "Input name cannot be blank, Please enter something" }
        }
    }

    if(payload?.function?.examples?.example !==null){
        let valid = true
        payload?.function?.examples?.example?.forEach((ex)=>{
            if(!(ex?.exampleReturn?.trim().length && ex?.exampleFormula?.trim().length)){
                valid = false
            }
        })

        if(!valid){
            return { success: false, msg: "Example Input name cannot be blank, Please enter something" }
        }
    }

    return { success: true}
}