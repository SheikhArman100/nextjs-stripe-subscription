import React from "react";
import ThemeProvider from "./ThemeProvider.js";
import QueryProvider from "./QueryProvider.js";

const Provider = ({ children }) => {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system" //can use "light" or "dark" if your website has only one theme
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
};

export default Provider;
