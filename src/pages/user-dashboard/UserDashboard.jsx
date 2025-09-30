import useFetchUserData from "../../hooks/useFetchUserData";
import bgImage from '../../assets/images/bg-img-user.png';
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
                className="absolute top-0 left-0 h-screen w-full bg-center bg-cover flex justify-center pt-[100px] px-[30px] backdrop-blur-xl"
                style={{ backgroundImage: `url(${bgImage})` }}
            >

                <div className="w-full flex flex-col gap-4 border-lime-500 rounded-2xl p-4 border-1 h-fit">
                    <div className="flex md:flex-row flex-col gap-2 md:justify-between">
                        <div>
                            <h1 className="text-3xl lg:text-5xl mb-2 font-extrabold text-white">{userData.name}</h1>
                            <div className="flex gap-1 items-center text-lg lg:text-2xl ">
                                <LocalPhoneIcon className="text-gray-400" />
                                <h2 className="text-gray-400 font-medium">{userData.mobile}</h2>
                            </div>
                        </div>

                        <button onClick={logout} className="self-start px-4 py-1 transition-colors hover:bg-lime-500 cursor-pointer text-black bg-lime-600 rounded-sm">
                            <h2 className="text-md lg:text-lg font-medium">Logout</h2>
                        </button>

                    </div>
                    {!userData.IEEEMemberId ? <div
                        className="text-gray-500 font-medium"
                    >
                        <h1>Not IEEE Member</h1>
                    </div>: <div>
                        <h1><span className="text-gray-300">IEE Member ID: </span> <span className="text-lime-400">{userData.IEEEMemberId}</span></h1>
                    </div>
                    }
                </div>

            </div>}

        </div>
    );
}