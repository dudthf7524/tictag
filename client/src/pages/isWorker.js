import { useEffect, useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const IsWorker = () => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();



    return (
        <div className="login">
            <h1>관리자, 근로자 모두 OK!!!</h1>
        </div>
    )
}

export default IsWorker;