export const baseURL ="http://localhost:8080"
const SummaryApi={
    register :{
        url:'/api/user/register',
        method:'POST',
    },
    login:{
        url:'/api/user/login',
        method:'POST',
    },
    forgot_password:{
        url:'/api/user/forgot-password',
        method:'POST',

    },
    forgot_password_otp_verification:{
        url:'/api/user/verify-forgot-password-otp',
        method:'PUT',

    },
    resetPassword:{
        url:'/api/user/reset-password',
        method:'PUT',
    },
    refreshToken:{
        url:'/api/user/refresh-token',
        method:'POST',
    },
    deviceDatils:{
        url:'/api/devices/current-user',
        method:'GET',
       
    },
    changePassword:{
        url:'/api/devices/changePassword',
        method:'POST',
       
    },
    updateUser:{
        url:'/api/devices/updateDetails',
        method:'POST',
       
    },
    officerDatils:{
        url:'/api/fireofficer/current-officer',
        method:'GET',
        
    },
    unassignedOfficer:{
        url:'/api/fireofficer/officers/unassigned',
        method:'GET',
        
    },
    notifi:{
        url:'/api/record/active-devices',
        method:'GET',
        
    },
    workAssignedToOfficer:{
        url:'/api/fireofficer/officers/assign-work',
        method:'POST',
        
    },
    sendNotification:{
        url:'/api/record/create',
        method:'POST',
        
    },
    updatePassword:{
        url:'/api/fireofficer/update-password',
        method:'POST',
        
    },
    
    

}
export default SummaryApi