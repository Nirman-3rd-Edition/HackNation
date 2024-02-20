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


export default {getSlider,
  getCategories,
  BusinessName,
  getBusinessListByCategory,
  createBooking,
  getUserBooking,
  CheckEmail,
  SellerDetails,
  SearchQuery,
  createBusines
}
