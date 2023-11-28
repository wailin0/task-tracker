import PickerModal from "../../components/PickerModal";
import PickerItem from "../../components/PickerItem";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS, GET_TASKS } from "../../graphql/queries";

const TaskModal = ({ taskModal, setTaskModal, task, setTask }) => {
  const { data } = useQuery(GET_TASKS);

  if (!data) {
    return null;
  }

  return (
    <>
      {taskModal &&
        <PickerModal
          modal={taskModal}
          setModal={setTaskModal}
          data={data.task_name}
          renderItem={(item, index) =>
            <PickerItem key={index} item={item.task_name} setModal={setTaskModal} state={task} setState={setTask} />
          }
        />
      }
    </>
  );
};

export default TaskModal;
