import AcademicCommunityEligibility from "../AcademicCommunityEligibility/AcademicCommunityEligibility";
import CallToActionBanner from "../CallToActionBanner/CallToActionBanner";
import Fee from "../FeesPage/FeesPage";
import OnlineApplication from "../OnlineApplication/OnlineApplication";


const Admission = () => {
    return (
        <div>
            <AcademicCommunityEligibility></AcademicCommunityEligibility>
            <Fee></Fee>
            <OnlineApplication></OnlineApplication>
            <CallToActionBanner></CallToActionBanner>
        </div>
    );
};

export default Admission;