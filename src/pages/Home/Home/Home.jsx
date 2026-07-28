import Banner from "../Banner/Banner";
import DeptNnotice from "../DeptNnotice/DeptNnotice";
import EsteemedLeaders from "../EsteemedLeaders/EsteemedLeaders";
import Gallery from "../Gallery/Gallery";
import JoinCommunity from "../JoinCommunity/JoinCommunity";

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <DeptNnotice></DeptNnotice>
            <EsteemedLeaders></EsteemedLeaders>
            <Gallery></Gallery>
            <JoinCommunity></JoinCommunity>
        </div>
    );
};

export default Home;