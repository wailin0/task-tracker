import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
query getLocations {
  location{
    id
    location_name
  }
}
`;

export const GET_TASKS = gql`
query getTasks{
  task_name{
    id
    task_name
  }
}
`;

export const GET_REPORT_HISTORIES = gql`
query getReportHistories($startDate: timestamptz, $endDate: timestamptz) {
  tracking(
  where: {created_at: { _gte: $startDate, _lt: $endDate }}
  order_by: {created_at: desc} 
  ){
    dispatch
    id
    quantity
    fk_location_name
    fk_task_name
    fk_user_name
    hardware
    note
    end_date_time
    start_date_time
    created_at
    updated_at
  }
}
`;


export const GET_REPORT_HISTORY = gql`
query getReportHistory($reportId: Int!) {
  tracking_by_pk(id: $reportId){
    dispatch
    id
    quantity
    fk_location_name
    fk_task_name
    fk_user_name
    hardware
    note
    end_date_time
    start_date_time
    created_at
    updated_at
  }
}
`;
