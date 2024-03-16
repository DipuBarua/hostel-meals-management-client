import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div>

            <div className="hero min-h-screen bg-slate-400">

                <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl shadow-gray-500 rounded-none my-20">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h2 className=" text-center text-3xl font-bold">Sign Up</h2>

                        {/* Name  */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                            {errors.name && <span className=" text-red-600">Name is required*</span>}
                        </div>

                        {/* Photo  */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="url" {...register("photo", { required: true })} name="photo" placeholder="Your photo URL" className="input input-bordered" />
                            {errors.photo && <span className=" text-red-600">Photo URL is required*</span>}
                        </div>

                        {/* Email  */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className=" text-red-600">Email is required*</span>}
                        </div>

                        {/* Password  */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Create Password</span>
                            </label>
                            <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                            })} name="password" placeholder="password" className="input input-bordered" />

                            {errors.password?.type === "required" && (
                                <span className=" text-red-600">password is required*</span>
                            )}
                            {errors.password?.type === "minLength" && (
                                <span className=" text-red-600">password must have at least 6 characters</span>
                            )}
                            {errors.password?.type === "pattern" && (
                                <span className=" text-red-600">password must have at least 1 upper case, 1 numeric, 1 sepical(#,?,!,@,$,%,^,&,*,-) character.</span>
                            )}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-outline rounded-none hover:bg-blue-600">Sign Up</button>
                        </div>
                        <div className="border border-black p-2">
                            <p>Already have an account? if Yes, please
                                <Link to={"/logIn"}>
                                    <button className="btn-link font-semibold text-blue-600 ml-2">Login</button>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default SignUp;