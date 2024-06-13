import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdInventory } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";

const menu = [
  {
    title: "Dashboard",
    icon: <MdSpaceDashboard />,
    path: "/dashboard",
  },
  {
    title: "Task",
    icon: <FaTasks />,
    childrens: [
      {
        title: "Add task",
        path: "/add-task",
      },
      {
        title: "Task list",
        path: "/show-task",
      },
      
      
      
    ],
  },
  {
    title: "Material",
    icon: <MdInventory />,
    childrens: [
      {
        title: "Add material",
        path: "/add-material",
      },
      
      {
        title: "Material list",
        path: "/show-material",
      },
      {
        title: "Receipt list",
        path: "/show-receipt",
      },
    ],
  },
  {
    title: "Client",
    icon: <FaUserTie />,
    childrens: [
      {
        title: "Add client",
        path: "/add-client",
      },
      {
        title: "Client list",
        path: "/show-client",
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