import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import logoImage from "../assets/LOGO.png";
import miniLogoImage from "../assets/LOGO_MINI.png";
import { NavLink } from "react-router-dom";
import {
  generatePlaceholderName,
  generateRandomColorNumber,
} from "../lib/utils";
import { LogoutBtn } from "./index";
import authService from "../appwrite/auth";
import { setSidebarOpen } from "../store/styleSlice";

function Sidebar() {
  const sidebarOpen = useSelector((state) => state.style.sidebarOpen);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [avatarColor, setAvatarColor] = useState("hsl(207,40%,64%)");

  const sidebarToggle = () => dispatch(setSidebarOpen(!sidebarOpen));

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        setUserName(userData.name);
        const icon = generatePlaceholderName(userData.name);
        setUserIcon(icon);
        const randomColor = generateRandomColorNumber(userData.name);
        setAvatarColor(randomColor);
      }
    });
  }, []);

  return (
    <div>
      <aside
        className={`flex h-[calc(100vh-73px)] mt-3 flex-col items-center overflow-hidden border-r rounded-md bg-zinc-600 py-8 ${
          sidebarOpen ? "w-44" : "w-16"
        }`}
      >
        <nav className="flex flex-1 flex-col items-center space-y-4">

          {/* Logo */}
          {/* <NavLink to="/">
            {sidebarOpen ? (
              <img src={logoImage} alt="ByteScribe" className="h-12" />
            ) : (
              <img src={miniLogoImage} alt="ByteScribe" className="h-12" />
            )}
          </NavLink> */}

          {/* Toggler  */}
          <div className={`tooltip tooltip-primary ${sidebarOpen ? "flex justify-end pr-2 w-40 " : "tooltip-top"}`} data-tip={`${sidebarOpen? "Collapse" : "Expand"}`}>
            {sidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="rgba(255,254,254,1)"
                onClick={sidebarToggle}
              >
                <path d="M17 4H3V6H17V4ZM13 11H3V13H13V11ZM17 18H3V20H17V18ZM22.0104 8.81412L20.5962 7.3999L16 11.9961L20.5962 16.5923L22.0104 15.1781L18.8284 11.9961L22.0104 8.81412Z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="rgba(255,255,255,1)"
                onClick={sidebarToggle}
              >
                <path d="M17 4H3V6H17V4ZM13 11H3V13H13V11ZM17 18H3V20H17V18ZM15.9896 8.81412L17.4038 7.3999L22 11.9961L17.4038 16.5923L15.9896 15.1781L19.1716 11.9961L15.9896 8.81412Z"></path>
              </svg>
            )}
          </div>

          {/* Editor Option */}
          <NavLink
            to="/editor"
            className={({ isActive }) =>
              `rounded-lg p-1.5 text-gray-50 transition-colors duration-200 hover:bg-gray-800 focus:outline-none flex gap-2 justify-start items-center ${
                sidebarOpen ? "w-40" : "tooltip tooltip-top tooltip-primary"
              } ${isActive ? "bg-gray-900" : ""}`
            }
            data-tip={`${sidebarOpen? "" : "Editor"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="rgba(255,248,248,1)"
            >
              <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM16.4645 15.5355L20 12L16.4645 8.46447L15.0503 9.87868L17.1716 12L15.0503 14.1213L16.4645 15.5355ZM6.82843 12L8.94975 9.87868L7.53553 8.46447L4 12L7.53553 15.5355L8.94975 14.1213L6.82843 12ZM11.2443 17L14.884 7H12.7557L9.11597 17H11.2443Z"></path>
            </svg>
            {sidebarOpen && <span className="text-xl">Editor</span>}
          </NavLink>

          {/* Playground Option */}
          <NavLink
            to="/sandbox"
            className={({ isActive }) =>
              `rounded-lg p-1.5 text-gray-50 transition-colors duration-200 hover:bg-gray-800 focus:outline-none flex gap-2 justify-start items-center ${
                sidebarOpen ? "w-40" : "tooltip tooltip-top tooltip-primary"
              } ${isActive ? "bg-gray-900" : ""}`
            }
            data-tip={`${sidebarOpen? "" : "Playground"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="rgba(255,255,255,1)"
            >
              <path d="M16.5 13.2018L13 15.5352V19.1315L19.1972 15L16.5 13.2018ZM14.6972 12L12 10.2018L9.30278 12L12 13.7982L14.6972 12ZM20 10.8685L18.3028 12L20 13.1315V10.8685ZM19.1972 9L13 4.86852V8.46482L16.5 10.7982L19.1972 9ZM7.5 10.7982L11 8.46482V4.86852L4.80278 9L7.5 10.7982ZM4.80278 15L11 19.1315V15.5352L7.5 13.2018L4.80278 15ZM4 13.1315L5.69722 12L4 10.8685V13.1315ZM2 9C2 8.66565 2.1671 8.35342 2.4453 8.16795L11.4453 2.16795C11.7812 1.94402 12.2188 1.94402 12.5547 2.16795L21.5547 8.16795C21.8329 8.35342 22 8.66565 22 9V15C22 15.3344 21.8329 15.6466 21.5547 15.8321L12.5547 21.8321C12.2188 22.056 11.7812 22.056 11.4453 21.8321L2.4453 15.8321C2.1671 15.6466 2 15.3344 2 15V9Z"></path>
            </svg>
            {sidebarOpen && <span className="text-xl">Playground</span>}
          </NavLink>
        </nav>
        <div className="flex flex-col items-center space-y-6">

          {/* Avatar & Username */}
          <div
            className={`rounded-lg p-1.5 text-gray-50 transition-colors duration-200 hover:bg-gray-800 focus:outline-none flex justify-start items-center gap-3 ${
              sidebarOpen ? "w-40" : ""
            }`}
          >
            <p
              className="rounded-full p-1 object-contain h-9 w-9 self-center justify-self-center text-xl font-medium"
              style={{
                backgroundColor: avatarColor,
              }}
            >
              {userIcon}
            </p>
            {sidebarOpen && <span className="">{userName}</span>}
          </div>

          {/* Logout Button */}
          <div className="rounded-lg p-1.5 text-gray-50 transition-colors duration-200 hover:bg-gray-800 focus:outline-none flex gap-2 justify-start items-center tooltip tooltip-top tooltip-primary" data-tip="Logout">
            <LogoutBtn />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
