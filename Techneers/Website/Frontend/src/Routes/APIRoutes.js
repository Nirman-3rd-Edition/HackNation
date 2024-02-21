export const host = "http://localhost:5000";

//login
export const loginRoute = `${host}/auth/login`;
export const lsploginRoute = `${host}/auth/lsplogin`;
export const usercheck = `${host}/auth/getuser`;
export const lspcheck = `${host}/auth/getlsp`;
export const getuserdetails = `${host}/auth/getuserdetails`;
export const getlspdetails = `${host}/auth/lspdetails`;

//register

export const registerRoute = `${host}/auth/register`;
export const lspregisterRoute = `${host}/auth/lspregister`;
export const upload = `${host}/upload`;

//otp

export const otpRoute = `${host}/generateotp`;
export const verifyotpRoute = `${host}/verifyotp`;

//search
export const lsplist = `${host}/auth/lspsearchdetails`;

//notification
export const sendnotification = `${host}/noti/sendnotification`;
export const getnotification = `${host}/noti/getnotifications`;

export const acceptconnect = `${host}/acceptconnect`;

//casedetails
export const allcasedetails = `${host}/cased`;
export const getcasedetails = `${host}/getcasedetails`;
export const getcasedetailss = `${host}/getcasedetailss`;
export const caseupdate = `${host}/caseupdate`;
export const caseupdatee = `${host}/caseupdatee`;

export const paymentupdate = `${host}/paymentupdate`;

export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/auth/allusers`;
export const sendMessageRoute = `${host}/messages/addmsg`;
export const recieveMessageRoute = `${host}/messages/getmsg`;
export const setAvatarRoute = `${host}/auth/setavatar`;

//Booking
export const booking = `${host}/book/appointment`;
export const bookdetails = `${host}/book/details`;
export const allbookingdetails = `${host}/book/alldetails`;
