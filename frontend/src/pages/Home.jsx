import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            유저 이메일 : {user}
        </div>
    )
}

export default Home;