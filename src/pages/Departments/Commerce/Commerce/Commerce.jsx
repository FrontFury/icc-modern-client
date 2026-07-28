import CommerceAcademicDisciplines from "../CommerceAcademicDisciplines/CommerceAcademicDisciplines";
import CommerceBanner from "../CommerceBanner/CommerceBanner";
import Facilities from "../Facilities/Facilities";


const Commerce = () => {
    return (
        <div>
            <CommerceBanner></CommerceBanner>
            <Facilities></Facilities>
            <CommerceAcademicDisciplines></CommerceAcademicDisciplines>
        </div>
    );
};

export default Commerce;