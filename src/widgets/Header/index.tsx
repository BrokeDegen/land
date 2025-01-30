import classNames from "classnames";
import MobileMenu from "./MobileMenu";

const menuItems = [
  {
    text: "About",
    url: "#about",
  },
  {
    text: "Roadmap",
    url: "#roadmap",
  },
  {
    text: "Tokenomics",
    url: "#tokenomics",
  },
  {
    text: "Join Waitlist",
    url: "#waitlist",
  },
  {
    text: "FAQs",
    url: "#waitlist",
  },
];

export const Header = () => {
  return (
    <div className="flex items-center border-b border-border gap-[120px] pl-[60px] h-[70px]">
      <div className="text-white">Flipfox logo</div>
      <ul className="flex gap-11 items-center lg:hidden">
        {menuItems.map(({ text, url }) => (
          <li key={text}>
            <a href={url} className={classNames("text-white link-hover-gradient")}>
              {text}
            </a>
          </li>
        ))}
      </ul>
      <div className="lg:hidden w-[100px]">
        {/* <Button className="p-[12px_20px]" showArrow>
          Sign In
        </Button> */}
      </div>
      <MobileMenu menuItems={menuItems} />
    </div>
  );
};
