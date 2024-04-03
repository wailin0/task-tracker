import {gql} from "@apollo/client";

export const USER_BASE_FIELDS = gql`
    fragment userBaseFields on passenger {
    passenger_id
    first_name
    last_name
    email_address
    date_of_birth
    phone
    loyalty_points
    passenger_wallet{
        wallet_value
    }
  }
`;
