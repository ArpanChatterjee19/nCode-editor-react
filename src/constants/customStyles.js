export const customStyles = {
    control: (styles) => ({
      ...styles,
      width: "100%",
      maxWidth: "14rem",
      minWidth: "12rem",
      borderRadius: "5px",
      color: "#fafafa",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      backgroundColor: "#71717a",
      cursor: "pointer",
      border: "2px solid #000000",
      boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
      ":hover": {
        border: "2px solid #000000",
        boxShadow: "none",
      },
    }),
    option: (styles) => {
      return {
        ...styles,
        color: "#fafafa",
        fontSize: "0.8rem",
        lineHeight: "1.75rem",
        width: "100%",
        background: "#71717a",
        ":hover": {
          backgroundColor: "rgb(243 244 246)",
          color: "#71717a",
          cursor: "pointer",
        },
      };
    },
    menu: (styles) => {
      return {
        ...styles,
        backgroundColor: "#fff",
        maxWidth: "14rem",
        border: "2px solid #000000",
        borderRadius: "5px",
        boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
      };
    },
  
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#fafafa",
        fontSize: "0.8rem",
        lineHeight: "1.75rem",
      };
    },
  };