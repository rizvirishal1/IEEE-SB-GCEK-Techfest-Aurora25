import useFetchUserData from "../../hooks/useFetchUserData";
import bgImage from '../../assets/images/user_dash_bg.png';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import { Mosaic } from "react-loading-indicators";


export default function UserDashboard() {

    const { isLoading, userData, logout } = useFetchUserData();

    return (
        <div className="h-[100vh] w-full bg-linear-to-bl from-[#1E201E]/100 to-blue-950/90 ">

            {isLoading && <div className="flex flex-col justify-center items-center gap-1 w-full h-full absolute left-0 top-0">
                <Mosaic color="#32cd32" size="medium" text="" textColor="" />
                <p className="text-white font-semibold text-xl">Loading</p>
            </div>}

            {!isLoading && userData && <div
                className="absolute top-0 left-0 h-screen w-full bg-center bg-cover flex justify-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            >

            </div>}

        </div>
    );
}