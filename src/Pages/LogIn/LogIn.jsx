import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const LogIn = () => {
    const { logIn } = useAuth();
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);


        logIn(email, password)
            .then(res => {
                console.log(res.user);

                const dest = location.state?.from?.pathname || "/"
                navigate(dest, { replace: true });
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <Helmet>
                <title>
                HostelMeals | LogIn
                </title>
            </Helmet>
            <div className="hero min-h-screen bg-slate-400">

                <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl  bg-base-100 rounded-none my-20">

                    <form onSubmit={handleLogin} className="card-body">
                        <h2 className=" text-center text-3xl font-bold">Log In</h2>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <input type="submit" value="LogIn" className="btn btn-outline hover:bg-blue-600 rounded-none text-xl" />
                        </div>

                        {/* Google signIn  */}

                        <div className=" border border-black p-2">
                            <p>Have an account? if no, please <Link to={'/signUp'}><button className="btn-link font-semibold text-blue-600">Sign Up</button></Link></p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default LogIn;