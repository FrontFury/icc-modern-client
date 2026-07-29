import ArtsBanner from "../ArtsBanner/ArtsBanner";
import ArtsCoreDisciplines from "../ArtsCoreDisciplines/ArtsCoreDisciplines";
import ArtsDepartmentOverview from "../ArtsDepartmentOverview/ArtsDepartmentOverview";
import ArtsDistinguishedFaculty from "../ArtsDistinguishedFaculty/ArtsDistinguishedFaculty";
import ArtsFacilitiesAndCTA from "../ArtsFacilitiesAndCTA/ArtsFacilitiesAndCTA";


const Arts = () => {
    return (
        <div>
            <ArtsBanner></ArtsBanner>
            <ArtsDepartmentOverview></ArtsDepartmentOverview>
            <ArtsCoreDisciplines></ArtsCoreDisciplines>
            <ArtsDistinguishedFaculty></ArtsDistinguishedFaculty>
            <ArtsFacilitiesAndCTA></ArtsFacilitiesAndCTA>
        </div>
    );
};

export default Arts;