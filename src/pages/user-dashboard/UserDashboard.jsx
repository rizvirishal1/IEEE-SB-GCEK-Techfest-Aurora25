import useFetchUserData from "../../hooks/useFetchUserData";
import bgImage from '../../assets/images/BGfromPoster.png';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import { Mosaic } from "react-loading-indicators";


export default function UserDashboard() {

    const { isLoading, userData, logout, getEarlyBirdTicket } = useFetchUserData();

    return (
        <div className="h-[100vh] w-full bg-linear-to-bl from-[#1E201E]/100 to-blue-950/90 ">

            {isLoading && <div className="flex flex-col justify-center items-center gap-1 w-full h-full absolute left-0 top-0">
                <Mosaic color="#32cd32" size="medium" text="" textColor="" />
                <p className="text-white font-semibold text-xl">Loading</p>
            </div>}

            {!isLoading && userData && <div
                className="absolute top-0 left-0 h-screen w-full bg-center bg-cover flex flex-col items-center gap-4 pt-[100px] px-2"
                style={{ backgroundImage: `url(${bgImage})` }}
            >

                <div className="bg-black/40 backdrop-blur-md  w-full lg:w-[60vw] py-4 px-4 lg:px-10 rounded-xl">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-white font-semibold text-2xl md:text-3xl">{userData.name}</h1>
                        <div className="text-lime-500 flex items-center">
                            <LocalPhoneIcon className="text-md" fontSize="10" />
                            {userData.mobile}
                        </div>

                        {userData.IEEEMemberId ? <div className="flex gap-1">
                            <h1 className="text-white">IEEE Member ID: </h1>
                            <h2 className="text-lime-500">{userData.IEEEMemberId}</h2>
                        </div> : <div>
                            <h2 className="text-gray-500">Not IEEE Member</h2>
                        </div>}

                        <button className="w-fit mt-4 px-3 py-1 hover:bg-red-500/50 bg-red-500 rounded-sm text-white cursor-pointer" onClick={logout}>
                            <h2>Logout</h2>
                        </button>


                        <div className="w-full border-2 border-lime-500 bg-blue-400/10 rounded-lg border-dashed mt-10 py-3 px-2">
                            {!userData.festTicket.isPurchased && <div>
                                <h1 className="text-center text-4xl text-white font-bold"><span className="text-pink-400">Early Bird</span> Tickets Are Live!</h1>
                                <p className="px-2 md:px-4 text-center m-4 text-xl font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quas, nemo consequatur pariatur consequuntur a in iusto vero porro alias odit saepe culpa asperiores. Atque facere fuga quia explicabo voluptas!</p>
                                <div className="flex justify-center">
                                    <button onClick={getEarlyBirdTicket} className="py-3 px-4 w-fit bg-lime-500 font-bold text-2xl transition-colors hover:bg-lime-500/70">Get Ticket!</button>
                                </div>
                            </div>}

                            {userData.festTicket.isPurchased && <div className="flex items-center gap-4 flex-col">
                                <h1 className="text-center text-4xl text-white font-bold"><span className="text-pink-400">Early Bird</span> Tickets Are Live!</h1>
                                    <button className="py-3 px-4 w-fit bg-pink-500 font-bold text-2xl transition-colors text-white">Purchased!</button>
                                </div>
                            }
                        </div>


                    </div>
                </div>



            </div>}

        </div>
    );
}