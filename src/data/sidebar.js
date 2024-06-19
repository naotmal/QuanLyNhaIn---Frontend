import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdInventory } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";

const Adminmenu = [
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
        role: "Sale",
        title: "Add task",
        path: "/add-task",
      },
      {
        role: "Product",
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
        role: "Admin",
        title: "Add material",
        path: "/add-material",
      },
      
      {
        role: "Product",
        title: "Material list",
        path: "/show-material",
      },
      {
        role: "Admin",
        title: "Receipt list",
        path: "/show-receipt",
      },
      {
        role: "Product",
        title: "Delivery list",
        path: "/show-delivery",
      },
   
    ],
  },
  {
    title: "Client",
    icon: <FaUserTie />,
    childrens: [
      {
        role: "Sale",
        title: "Add client",
        path: "/add-client",
      },
      {
        role: "Sale",
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
        role: "Product",
        title: "Profile",
        path: "/profile",
      },
      {
        role: "Product",
        title: "Edit Profile",
        path: "/edit-profile",
      },
      {
        role: "Admin",
        title: "User list",
        path: "/show-account",
      },
    ],
  },
  
];
const Salemenu = [
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
        role: "Sale",
        title: "Add task",
        path: "/add-task",
      },
      {
        role: "Product",
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
        role: "Product",
        title: "Material list",
        path: "/show-material",
      },
      
      {
        role: "Product",
        title: "Delivery list",
        path: "/show-delivery",
      },
   
    ],
  },
  {
    title: "Client",
    icon: <FaUserTie />,
    childrens: [
      {
        role: "Sale",
        title: "Add client",
        path: "/add-client",
      },
      {
        role: "Sale",
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
        role: "Product",
        title: "Profile",
        path: "/profile",
      },
      {
        role: "Product",
        title: "Edit Profile",
        path: "/edit-profile",
      },
      
    ],
  },
  
];
const Productmenu = [
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
        role: "Product",
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
        role: "Product",
        title: "Material list",
        path: "/show-material",
      },
      
      {
        role: "Product",
        title: "Delivery list",
        path: "/show-delivery",
      },
   
    ],
  },
  
  {
    title: "Account",
    icon: <RiAccountCircleFill />,
    childrens: [
      {
        role: "Product",
        title: "Profile",
        path: "/profile",
      },
      {
        role: "Product",
        title: "Edit Profile",
        path: "/edit-profile",
      },
      
    ],
  },
  
];

const menu={
  Adminmenu,
  Salemenu,
  Productmenu,
}

export default menu;