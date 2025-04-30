import ThemeContextProvider from "./Context/Theme-Context";
import Main_Page from "./Components/Main_Page";
import Desktop_StartScreen from "./Components/Desktop_StartScreen";
import WindowContextProvider from "./Context/Window-Context"; 
import FolderContextProvider from "./Context/Folder-Context";
import MenuContextProvider from "./Context/Menu-Context";
import Task_Bar from "./Components/Task_Bar";


function App() {
  
  return (
      <ThemeContextProvider>
        <WindowContextProvider>
          <FolderContextProvider>
            <MenuContextProvider>
              <Main_Page>

                <Task_Bar/> 
                <Desktop_StartScreen />

              </Main_Page>
            </MenuContextProvider>
          </FolderContextProvider>
        </WindowContextProvider>
      </ThemeContextProvider>
  );
}

export default App;
