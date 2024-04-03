import PickerModal from "../../components/PickerModal";
import PickerItem from "../../components/PickerItem";
import {useQuery} from "@apollo/client";
import {GET_LOCATIONS} from "../../graphql/queries";

const LocationModal = ({locationModal, setLocationModal, location, setLocation}) => {
    const {data} = useQuery(GET_LOCATIONS);

    if (!data) {
        return null;
    }

    return (
        <>
            {locationModal &&
                <PickerModal
                    modal={locationModal}
                    setModal={setLocationModal}
                    data={data.location}
                    renderItem={(item, index) =>
                        <PickerItem key={index} item={item.location_name} setModal={setLocationModal} state={location}
                                    setState={setLocation}/>
                    }
                />
            }
        </>
    );
};

export default LocationModal;
