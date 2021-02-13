import { MapCenterPoint } from "../../types";
import { toggleFullScreen } from "../../helpers";
import { POSTER_LINK } from "../../constants";

type Props = {
  changeMapCenter: (center: MapCenterPoint) => void;
  openModal: (key: string) => void;
};

export default function TopBar(props: Props) {
  const { changeMapCenter, openModal } = props;

  const openUrl = (url: string) => {
    window.open(url);
  };

  const menuItems = [
    {
      title: "legend",
      onClick: () => changeMapCenter(["right", "top"]),
    },
    {
      title: "share/follow",
      onClick: () => openModal("Share"),
    },
    {
      title: "fullscreen",
      onClick: toggleFullScreen,
    },
    {
      title: "settings",
      onClick: () => openModal("Settings"),
    },
    {
      title: "buy poster",
      onClick: () => openUrl(POSTER_LINK),
    },
    {
      title: "about",
      onClick: () => openModal("About"),
    },
  ];

  return (
    <ul className="TopBar">
      {menuItems.map((item, idx) => (
        <li key={idx} className="TopBar-item">
          <button onClick={item.onClick}>{item.title}</button>
        </li>
      ))}
    </ul>
  );
}
