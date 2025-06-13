import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi"

const fetchUserDetails = async () => {
    try {
        const userType = localStorage.getItem("userType");
        const apiToCall =
      userType === "officer"
        ? SummaryApi.officerDatils
        : SummaryApi.deviceDatils;
        const response = await Axios(apiToCall)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUserDetails

// import Axios from "./Axios"
// import SummaryApi from "../common/SummaryApi"

// const fetchUserDetails = async () => {
//     try {
//         const response = await Axios({
//             ...SummaryApi.deviceDatils
//         })
//         return response.data
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default fetchUserDetails