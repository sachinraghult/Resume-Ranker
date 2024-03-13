import react, { useEffect, useState } from "react";
import LoadingScreen from "react-loading-screen";
import Register from "../../pages/Register/Register";
import spinner from "./load.gif";

export default function LoadScreen() {
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        },3000);
    },[]);

    return (
        <div>
            {isLoading?(
                <LoadingScreen
                    loading = {true}
                    bgcolor = "#f1f1f1"
                    // spinnerColor="#9ee5f8"
        //   textColor="#676767"
          logoSrc={spinner}
        //   text="Loading..."
                />
            ):(
                <Register/>
            )}
        </div>
    );
}