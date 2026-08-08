import Banner from "../Banner/Banner";
import DeptNnotice from "../DeptNnotice/DeptNnotice";
import EsteemedLeaders from "../EsteemedLeaders/EsteemedLeaders";
import FAQ from "../FAQ/FAQ";
import Gallery from "../Gallery/Gallery";
import {NewsNEvents} from "../NewsNEvents/NewsNEvents";
import AlumniStories from "../AlumniSuccess/AlumniSuccess";

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <DeptNnotice></DeptNnotice>
            <EsteemedLeaders></EsteemedLeaders>
            <Gallery></Gallery>
            <AlumniStories></AlumniStories>
            <NewsNEvents></NewsNEvents>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;