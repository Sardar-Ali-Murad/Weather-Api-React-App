
import {
   HANDLE_CHANGE,
   HANDLE_CHECK
} from './actions'

const reducer = (state, action) => {
  if(action.type===HANDLE_CHANGE){
    return {
      ...state,
      [action.payload.name]:action.payload.value
    }
   }

   if(action.type===HANDLE_CHECK){
    return {
      ...state,
      [action.payload.name]:action.payload.checked
    }
   }


  throw new Error(`no such action : ${action.type}`)
}

export default reducer
