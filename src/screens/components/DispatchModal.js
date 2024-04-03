import PickerModal from "../../components/PickerModal";
import PickerItem from "../../components/PickerItem";

const DispatchModal = ({modal, setModal, newDispatch, setNewDispatch}) => {
    return (
        <>
            {modal &&
                <PickerModal
                    modal={modal}
                    setModal={setModal}
                    data={["True", "False"]}
                    renderItem={(item, index) =>
                        <PickerItem key={index} item={item} setModal={setModal} state={newDispatch}
                                    setState={setNewDispatch}/>
                    }
                />
            }
        </>
    );
};

export default DispatchModal;
