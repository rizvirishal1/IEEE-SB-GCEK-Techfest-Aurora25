import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

async function fetchUserData() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        return new Error('token not found!');
    }
    return await api.get("/user/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

function useFetchUserData() {

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        async function fetchData (){
            try {
                let data = await fetchUserData();
                setUserData(data.data)
            } catch(err) {
                toast.error("Failed to fetch user data. Please try again.");
                localStorage.removeItem('authToken');
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        } 

        fetchData();

    }, [navigate]);

    function logout() {
        localStorage.removeItem('authToken');
        setIsLoading(true)
        setTimeout(() => {
            navigate('/login')
            setIsLoading(false)
        }, 1000)
    }

    return { userData, isLoading, logout }
}

export default useFetchUserData;