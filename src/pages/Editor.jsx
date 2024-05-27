import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CodeEditorWindow,
  Sidebar,
  ThemeDropdown,
  LanguageDropdown,
  OutputWindow,
  CustomInput,
  OutputDetails,
} from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux"
import useKeyPress from "../hooks/useKeyPress";
import config from "../config/config";
import { defineTheme } from "../lib/defineTheme";
import { languageOptions } from "../constants/languageOptions";
import { Suspense } from "react";



function Editor() {
  const userData = useSelector((state) => state.auth.userData);
  

  const [code, setCode] = useState();
  const [savedCode, setSavedCode] = useState("");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [theme, setTheme] = useState("cobalt");
  const [outputDetails, setOutputDetails] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [processing, setProcessing] = useState(null);
  const [save, setSave] = useState(true);
  const [loading, setLoading] = useState(true);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  useEffect(() => {
    if (userData) {
        appwriteService.getCode(userData.$id).then((data) => {
            if (data){
              setSavedCode(JSON.parse(data.code))
              setLanguage(JSON.parse(data.language))
              setSave(true)
              setLoading(false)
            }
            else {
              setLoading(false)
            }
        })
        
    }
    setTimeout(()=>{
      setLoading(false)
    },1000)
  }, []);
  
  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);


  const onChange = (data) => {
        setCode(data); 
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: config.judgeZeroUrl,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": config.judgeZeroHost,
        "X-RapidAPI-Key": config.judgeZeroApiKey,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Sorry! Quota of 50 requests exceeded for the day`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const handleSave = () => {
      if(save){
        appwriteService.updateCode( userData.$id, {
          code: JSON.stringify(code),
          language: JSON.stringify(language),
        })
        showSuccessToast(`Saved!`)
      }
      else {
        appwriteService.saveCode({
          code: JSON.stringify(code),
          language: JSON.stringify(language),
          userId: userData.$id,
        })
        setSave(true)
        showSuccessToast(`Saved!`)
      }
  }

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: config.judgeZeroUrl + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": config.judgeZeroHost,
        "X-RapidAPI-Key": config.judgeZeroApiKey,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  const showSuccessToast = (msg) => {
    toast.success(msg || `Done!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSelectChange = (languageOption) => {
    setLanguage(languageOption);
  };

  function handleThemeChange(themeOption) {
    const theme = themeOption;
    // console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then(() => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then(() =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);
  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-row space-x-2 items-start px-4 pt-4 h-[calc(100vh-45px)]">
        <Sidebar />
        <div className="flex flex-col w-full h-full justify-start items-end">
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-2 px-4 py-2">
              <Suspense>
              {!loading && <LanguageDropdown 
                onSelectChange={onSelectChange} 
                defaultLanguage={language}
              />}
              </Suspense>
              <ThemeDropdown
                handleThemeChange={handleThemeChange}
                theme={theme}
              />
            </div>
            <div className="flex flex-row gap-2 px-4 py-2">
              <button
                onClick={handleSave}
                disabled={!code}
                className={`border-2 border-black z-10 rounded-xl shadow-[2px_2px_0px_0px_rgb(212,212,216)] px-4 py-2 hover:shadow transition duration-200 bg-zinc-500 flex-shrink-0 text-gray-200
                  ${!code ? "opacity-50" : "tooltip tooltip-left tooltip-accent"}`}
                  data-tip={`${code? "Save" : ""}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,248,248,1)"><path d="M4 3H17L20.7071 6.70711C20.8946 6.89464 21 7.149 21 7.41421V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM12 18C13.6569 18 15 16.6569 15 15C15 13.3431 13.6569 12 12 12C10.3431 12 9 13.3431 9 15C9 16.6569 10.3431 18 12 18ZM5 5V9H15V5H5Z"></path></svg>
              </button>
            <button
              onClick={handleCompile}
              disabled={!code}
              className={`border-2 border-black z-10 rounded-xl shadow-[2px_2px_0px_0px_rgb(212,212,216)] px-4 py-2 hover:shadow transition duration-200 bg-zinc-500 flex-shrink-0 text-gray-200
                ${!code ? "opacity-50" : ""}`}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
            </div>
          </div>
          <Suspense>
          {!loading && (savedCode? (<CodeEditorWindow
            code={code}
            defaultValue={savedCode}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />) : <CodeEditorWindow
            code={code}
            defaultValue= "//type your code here"
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />)}
          </Suspense>
        </div>
        <div className="text-start right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </>
  );
}

export default Editor;
