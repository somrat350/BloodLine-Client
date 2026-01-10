import Banner from "../../Components/Public/Home/Banner";
import QuickActions from "../../Components/Public/Home/QuickActions";
import BloodTypes from "../../Components/Public/Home/BloodTypes";
import HowItWorks from "../../Components/Public/Home/HowItWorks";
import EmergencyAlert from "../../Components/Public/Home/EmergencyAlert";
import Statistics from "../../Components/Public/Home/Statistics";
import DonationProcess from "../../Components/Public/Home/DonationProcess";
import Testimonials from "../../Components/Public/Home/Testimonials";
import FAQ from "../../Components/Public/Home/FAQ";
import NewsUpdates from "../../Components/Public/Home/NewsUpdates";
import Featured from "../../Components/Public/Home/Featured";
import Contact from "../../Components/Public/Home/Contact";
import BackToTop from "../../Components/Public/BackToTop";

const Home = () => {
  return (
    <div>
      <title>Home | BloodLine</title>
      <Banner />
      <QuickActions />
      <EmergencyAlert />
      <BloodTypes />
      <HowItWorks />
      <Statistics />
      <DonationProcess />
      <Featured />
      <Testimonials />
      <FAQ />
      <NewsUpdates />
      <Contact />
      {/* <BackToTop /> */}
    </div>
  );
};

export default Home;
