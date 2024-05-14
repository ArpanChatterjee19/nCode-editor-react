import React, { useState } from "react";
import { SandboxEditorsWindow, SandboxOutputWindow, Sidebar } from "../components";

import "split-pane-react/esm/themes/default.css";

function Sandbox() {

  return (
    <div className='h-[calc(100vh-70px)] flex'>
      <aside className="ml-2">
        <Sidebar/>
      </aside>
      <div>
      <SandboxEditorsWindow/>
      <SandboxOutputWindow/>
      </div>
    </div>
  );
}

export default Sandbox;
