import useAuth from "../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogle = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user);

                const googleUser = {
                    name: res?.user?.displayName,
                    email: res?.user?.email,
                    image: res?.user?.photoURL,
                }

                axiosPublic.post("/users", googleUser)
                    .then(res => {
                        console.log('googleuser:', res.data);

                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your account has been created",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate("/");
                        }
                    })
                    .catch(err => console.log(err));

                const dest = location.state?.from?.pathname || "/"
                navigate(dest, { replace: true });
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <button onClick={handleGoogle} className="btn rounded-none border border-black p-2 flex justify-center w-full">
                <button className="text-3xl"><FcGoogle></FcGoogle></button>
            </button>
        </div>
    );
};

export default GoogleSignIn;