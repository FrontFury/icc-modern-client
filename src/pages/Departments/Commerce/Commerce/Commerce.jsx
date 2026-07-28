import CommerceAcademicDisciplines from "../CommerceAcademicDisciplines/CommerceAcademicDisciplines";
import CommerceBanner from "../CommerceBanner/CommerceBanner";
import CommerceFaculty from "../CommerceFaculty/CommerceFaculty";
import Facilities from "../Facilities/Facilities";
import InfrastructureAndCTA from "../InfrastructureAndCTA/InfrastructureAndCTA";


const Commerce = () => {
    return (
        <div>
            <CommerceBanner></CommerceBanner>
            <Facilities></Facilities>
            <CommerceAcademicDisciplines></CommerceAcademicDisciplines>
            <CommerceFaculty></CommerceFaculty>
            <InfrastructureAndCTA></InfrastructureAndCTA>
        </div>
    );
};

export default Commerce;