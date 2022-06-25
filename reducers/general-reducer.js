
export function reducer(state= {
    isMobileView:false,
  }, action) {
      switch(action.type){
        

        case "SETISMOBILEVIEW":{
          console.log(action.data)
          return{
            ...state,
            isMobileView:action.data
          }
        }
      
        default:
          return state
      }
    
}