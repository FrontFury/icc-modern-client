import AcademicCommunityEligibility from "../AcademicCommunityEligibility/AcademicCommunityEligibility";
import CallToActionBanner from "../CallToActionBanner/CallToActionBanner";
import OnlineApplication from "../OnlineApplication/OnlineApplication";


const Admission = () => {
    return (
        <div>
            <AcademicCommunityEligibility></AcademicCommunityEligibility>
            <OnlineApplication></OnlineApplication>
            <CallToActionBanner></CallToActionBanner>
        </div>
    );
};

export default Admission;