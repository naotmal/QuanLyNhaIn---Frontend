import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";

const menu = [
  {
    title: "Dashboard",
    icon: <MdSpaceDashboard />,
    path: "/dashboard",
  },
  {
    title: "Add material",
    icon: <IoAddCircle />,
    path: "/add-material",
  },
  {
    title: "Account",
    icon: <RiAccountCircleFill />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  
];

export default menu;