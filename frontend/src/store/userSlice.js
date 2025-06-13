import { createSlice } from "@reduxjs/toolkit";
const intialValue = {
    _id: "",
    name: "",
    email: "",
    phone: "",
    deviceId:"",
    family_member:"",
    address:"",
    latitude:"",
    longitude:"",
    rank:"",
    badgeNumber:"",
    isActive:"",
    workAsigend:"",
    last_login_date:"",
  

}

const userSlice = createSlice({
    name: "user",
    initialState: intialValue,

    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload?._id
            state.deviceId=action.payload?.deviceId
            state.name = action.payload?.name
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.family_member = action.payload?.family_member
            state.location = action.payload?.location
           state.last_login_date=action.payload?.last_login_date

            state.rank = action.payload?.rank
            state.badgeNumber = action.payload?.badgeNumber
            state.isActive = action.payload?.isActive
            state.workAsigend = action.payload?.workAsigend
            
            
        


        },
        
        
        logout: (state, action) => {
            state._id = ""
            state.name = ""
            state.email = ""
            state.mobile = ""
            state.rank=""
            state.deviceId=""
            

        }

    }
})
export const { setUserDetails, logout, updatedAvatar} = userSlice.actions
export default userSlice.reducer