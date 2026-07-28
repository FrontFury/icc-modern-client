import AboutBanner from '../AboutBanner/AboutBanner';
import CoreValue from '../CoreValue/CoreValue';
import ExecutiveLeader from '../ExecutiveLeader/ExecutiveLeader';
import HistorySection from '../HistorySection/HistorySection';

const About = () => {
    return (
        <div>
            <AboutBanner></AboutBanner>
            <HistorySection></HistorySection>
            <CoreValue></CoreValue>
            <ExecutiveLeader></ExecutiveLeader>
        </div>
    );
};

export default About;