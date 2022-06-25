
export function reducer(state= {
    alertSeverity:'',
    alertMessage:'',
    errorMessage:"",
    warningMessage:'',
    successMessage:"",
    loading:false,
  }, action) {
      switch(action.type){
        case "OPENFEEDBACKMODAL":{
            console.log(action.variable)
            return{
                ...state,
                [action.variable]:action.data
            }
  
        }
        case "CLOSEFEEDBACKMODAL":{
            return {
                ...state,
                errorMessage:"",
                warningMessage:'',
                successMessage:"",
                loading:false
            }
        }
        case "SETALERTMESSAGE":
          return{
            ...state,
            alertSeverity:action.severity,
            alertMessage:action.data
          }
        case "RESETFEEDBACK":
          return{
            ...state,
            alertSeverity:'',
            alertMessage:'',
            errorMessage:"",
            warningMessage:'',
            successMessage:"",
            loading:false,
        }
        default:
          return state
      }
    
    }