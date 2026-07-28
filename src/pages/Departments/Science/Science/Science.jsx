import LabFacilities from "../LabFacilities/LabFacilities";
import ScienceBanner from "../ScienceBanner/ScienceBanner";
import ScienceFaculty from "../ScienceFaculty/ScienceFaculty";


const Science = () => {
    return (
        <div>
            <ScienceBanner></ScienceBanner>
            <LabFacilities></LabFacilities>
            <ScienceFaculty></ScienceFaculty>
        </div>
    );
};

export default Science;