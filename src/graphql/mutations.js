import { gql } from "@apollo/client";


export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  UserLogIn(username: $username, password: $password){
    accessToken
    error
    message
  }
}
`;


export const CREATE_REPORT = gql`
mutation createReport($username: String!, $location: String!, $task: String!, $note: String!, $dispatch: Boolean!, $quantity: Int!, $hardware: String!, $startTime: timestamptz!, $endTime: timestamptz !) {
  insert_tracking_one(object: {
    start_date_time: $startTime,
    end_date_time: $endTime,
    hardware: $hardware,
    quantity: $quantity,
    dispatch: $dispatch,
    note: $note,
    fk_task_name: $task,
    fk_location_name: $location,
    fk_user_name: $username
  }) {
      id
  }
}
`
