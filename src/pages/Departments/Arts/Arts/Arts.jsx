import ArtsBanner from "../ArtsBanner/ArtsBanner";
import ArtsCoreDisciplines from "../ArtsCoreDisciplines/ArtsCoreDisciplines";
import ArtsDepartmentOverview from "../ArtsDepartmentOverview/ArtsDepartmentOverview";


const Arts = () => {
    return (
        <div>
            <ArtsBanner></ArtsBanner>
            <ArtsDepartmentOverview></ArtsDepartmentOverview>
            <ArtsCoreDisciplines></ArtsCoreDisciplines>
        </div>
    );
};

export default Arts;