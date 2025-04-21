import { useState, createContext } from "react"

export const ThemeContext = createContext({
    theme: "light",
    toogleTheme: () => {}
});

export default function ThemeContextProvider({children}) {

    const [theme, setTheme] = useState("light");

    const toogleTheme = () => {
        setTheme((previousTheme) => (previousTheme === "light" ? "dark" : "light"));
      };

    return(
        <ThemeContext.Provider value = {{theme, toogleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}


