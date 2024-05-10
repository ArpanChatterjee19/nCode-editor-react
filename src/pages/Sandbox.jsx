import React, { useState } from "react";
import { SandboxEditorsWindow, SandboxOutputWindow, Sidebar } from "../components";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

function Sandbox() {

  const [sizes, setSizes] = useState(['45%', '45%']);

  return (
    // <SplitPane split="horizontal" sizes={sizes} onChange={setSizes} className="h-[calc(100vh-50px)] flex flex-col gap-2 justify-end" style={{}}>
    //   <Pane>
    //     <SandboxEditorsWindow minSize={100} maxSize='85%'/>
    //   </Pane>
    //   <Pane className="border-t-gray-400" minSize={100} maxSize='85%'>
    //     <SandboxOutputWindow/>
    //   </Pane>
    // </SplitPane>
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
