import { Footer as ArwesFooter, Paragraph } from "arwes";
import Centered from "./Centered";

const Footer = () => {
  return (
    <ArwesFooter animate>
      <Centered>
        <Paragraph style={{ fontSize: 14, margin: "10px 0" }}>
          This is a personal project and is not affiliated with NASA or SpaceX
          in any way. It was created independently and is not an official site.
        </Paragraph>
      </Centered>
    </ArwesFooter>
  );
};

export default Footer;
