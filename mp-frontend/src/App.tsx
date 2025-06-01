import Button from "./_util/components/Button/Button.tsx";
import Input from "./_util/components/Input/Input.tsx";
import Sidebar from "./_util/components/SideBar/SideBar.tsx";
import HeadBar from "./_util/components/HeadBar/HeadBar.tsx";
import {useState} from "react";
import {Layout} from "./_util/layout/Layout.tsx";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);


    return (
        <>

            <Layout/>
        </>
    )
}

export default App
