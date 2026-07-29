import Banner from "../Banner/Banner";
import DeptNnotice from "../DeptNnotice/DeptNnotice";
import EsteemedLeaders from "../EsteemedLeaders/EsteemedLeaders";
import FAQ from "../FAQ/FAQ";
import Gallery from "../Gallery/Gallery";
import JoinCommunity from "../JoinCommunity/JoinCommunity";
import NewsNEvents from "../NewsNEvents/NewsNEvents";

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <DeptNnotice></DeptNnotice>
            <EsteemedLeaders></EsteemedLeaders>
            <Gallery></Gallery>
            <JoinCommunity></JoinCommunity>
            <NewsNEvents></NewsNEvents>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;