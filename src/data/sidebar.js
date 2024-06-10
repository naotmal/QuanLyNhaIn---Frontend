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
    title: "Material",
    icon: <RiAccountCircleFill />,
    childrens: [
      {
        title: "Add material",
        path: "/add-material",
      },
      
      {
        title: "Material list",
        path: "/show-material",
      },
    ],
  },
  {
    title: "Client",
    icon: <RiAccountCircleFill />,
    childrens: [
      {
        title: "Add client",
        path: "/add-client",
      },
      
      
    ],
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