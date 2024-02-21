import { request, gql } from 'graphql-request';

const MASTER_URL = "https://api-ap-south-1.hygraph.com/v2/cls6yxo480sam01w3yltezmxf/master";

const CheckEmail = async (userEmail) => {
  const query = gql`
   query checkemail {
  businessLists(where: {email: "`+userEmail+`"}) {
    email
    verification
  }
}
  `;
  
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    throw error; // Rethrow the error or handle it as needed
  }
};
const getSlider = async () => {
  const query = gql`
    query MyQuery {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    throw error; // Rethrow the error or handle it as needed
  }
};

const getCategories=async()=>{
    const query = gql`
    query GetCategory {
  categories {
    id
    name
    icon {
      url
    }
  }
}
`
try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    throw error; // Rethrow the error or handle it as needed
  }
}

const BusinessName=async()=>{
  const query = gql`
 query GetBusinessList {
  businessLists {
    bannerUrl
    id
    about
    address
    category {
      ... on Category {
        name
      }
    }
    name
    email
    banner {
      url
    }
    images {
      url
    }
    contact
    owner
    mapLocation {
      latitude
      longitude
    }
  }
}

`
try {
  const result = await request(MASTER_URL, query);
  return result;
} catch (error) {
  console.error("Error fetching sliders:", error);
  throw error; // Rethrow the error or handle it as needed
}
}


const getBusinessListByCategory=async(category)=>{
  const query = gql`
query GetBusinessList {
  
  businessLists(where: {category_some: {Category: {name: "`+category+`"}}})
  {
    bannerUrl
    id
    about
    address
    name
    images {
      url
    }
    banner {
      url
    }
    contact
    email
    category {
      ... on Category {
        id
        name
      }
    }
   
    owner
    mapLocation {
      latitude
      longitude
    }
  }
}
`
try {
  const result = await request(MASTER_URL, query);
  return result;
} catch (error) {
  console.error("Error fetching sliders:", error);
  throw error; // Rethrow the error or handle it as needed
}
}

const  createBooking=async(data)=>{
  const mutationQuery=gql`
  mutation createbooking {
  createBooking(
    data: {
       date: "`+data.date+`",
       time: "`+data.time+`", 
       note: "`+data.note+`",
       userName: "`+data.userName+`", 
       userEmail: "`+data.userEmail+`",
     bookingStatus: "InProgress",
     userAddress: "`+data.userAddress+`",
     userImage: "`+data.userImage+`",
     phNumber: "`+data.phNumber+`"
     businessList: {connect: {id: "`+data.businessId+`"}}}
  ) {
    id
  }
  publishManyBookings(to: PUBLISHED) {
    count
  }
  publishManyBusinessLists {
    count
  }
}

  `
  try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    throw error; // Rethrow the error or handle it as needed
  }
}


const getUserBooking=async(usermail)=>{
  const mutationQuery=gql`
  query GetUserBooking {
  bookings(orderBy: updatedAt_DESC, where: {userEmail: "`+usermail+`"}) {
    bookingStatus
    date
    time
    businessList {
      bannerUrl
      id
      banner {
        url
      }
      address
      contact
      name
      owner
      email
      about
      mapLocation {
      latitude
      longitude
    }
    }
    id
    userName
    userEmail
   
  }
}

  `
  try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    throw error; // Rethrow the error or handle it as needed
  }
}


const SellerDetails=async(usermail)=>{
  const mutationQuery=gql`
  query checkemail {
  businessLists(where: {email: "`+usermail+`"}) {
    userPhotoUrl
    bannerUrl
    id
    email
    about
    address
    verification
    mapLocation {
      latitude
      longitude
    }
    banner{
      url
    }
    category {
      ... on Category {
        name
        icon {
      url
    }
      }
    }
    bookings  (orderBy: publishedAt_DESC){
      id
      date
      note
      time
      userName
      userEmail
      bookingStatus
      userAddress
      userImage
      phNumber
    }
    contact
    images {
      url
    }
    name
    owner
  }
}


  `
  try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    throw error; // Rethrow the error or handle it as needed
  }
}

const SearchQuery=async(keyword)=>{
  const mutationQuery=gql`
  query SearchQuery {
    businessLists(
    where: { keywords_contains_some: "${keyword}"}
  ) {
    bannerUrl
    id
    about
    address
    contact
    category {
      ... on Category {
        id
        name
      }
    }
    images {
      url
    }
    mapLocation {
      latitude
      longitude
    }
    name
    owner
    email
    banner {
      url
    }
  }
}
  `
  try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    throw error; // Rethrow the error or handle it as needed
  }
}

const  createBusines=async(data)=>{
  
  const mutationQuery=gql`
mutation MyMutation {
  createBusinessList(
    data: {
      category: {connect: {Category: {id: "`+data.catId+`"}}}
      aadharNumber: "`+data.aadharNumber+`",
      address: "`+data.serviceLocation+`", 
      email: "`+data.userEmail+`",
      name: "`+data.companyName+`",
      owner: "`+data.ownerName+`",
      panNumber: "`+data.gstNumber+`",
      gstImageUrl : "`+data.gstDownloadURL+`",
      aadharImageUrl : "`+data.aadharDownloadURL+`",
      userPhotoUrl : "`+data.photoDownloadURL+`",
      mapLocation: {latitude: `+data.locationLatitude+`, longitude: `+data.locationLongitude+`},
      contact: "`+data.phoneNumber+`",
      verification: "NotVerified"}
  ) {
    id
  }
  publishManyBusinessLists(to: PUBLISHED) {
    count
  }
}
`
try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    throw error; // Rethrow the error or handle it as needed
  }
}
const  updateBooking=async(data)=>{
  const mutationQuery=gql`
mutation MyMutation {
  updateBooking(data: {bookingStatus: "`+data.status+`"}, where: {id: "`+data.id+`"})
  {
    id
  }
  publishManyBookings(to: PUBLISHED) {
    count
  }
}
`
try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    throw error; // Rethrow the error or handle it as needed
  }
}
export default {getSlider,
  getCategories,
  BusinessName,
  getBusinessListByCategory,
  createBooking,
  getUserBooking,
  CheckEmail,
  SellerDetails,
  SearchQuery,
  createBusines,
  updateBooking
}
