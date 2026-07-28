import AboutBanner from '../AboutBanner/AboutBanner';
import CoreValue from '../CoreValue/CoreValue';
import ExecutiveLeader from '../ExecutiveLeader/ExecutiveLeader';
import GrowingCommuning from '../GrowingCommuning/GrowingCommuning';
import HistorySection from '../HistorySection/HistorySection';

const About = () => {
    return (
        <div>
            <AboutBanner></AboutBanner>
            <HistorySection></HistorySection>
            <CoreValue></CoreValue>
            <ExecutiveLeader></ExecutiveLeader>
            <GrowingCommuning></GrowingCommuning>
        </div>
    );
};

export default About;