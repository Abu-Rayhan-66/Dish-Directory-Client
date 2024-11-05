
import Footer from "../components/Footer/Footer";
import MeetTeam from "../components/MeetTeam/MeetTeam";
import PurposeAndValue from "../components/PurposeAndValue/PurposeAndValue";


const About = () => {
  return (
    <div className="mt-32">
      <div>
        <MeetTeam></MeetTeam>
        <PurposeAndValue></PurposeAndValue>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default About;