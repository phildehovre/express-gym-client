import React, { useEffect } from 'react';
import './Form.css';
import { useForm } from 'react-hook-form';

const DetailsForm = ({ details, onSubmit}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({defaultValues: details});

    useEffect(() => {
        if (details) {
            Object.keys(details).forEach((key) => {
                setValue(key, details[key])
            })
        }
    }, [details, setValue])

    return (
        <form className="details_ctn form_ctn" onSubmit={handleSubmit(onSubmit)}>
            <h2>Personal Details</h2>

            {/* Gender Selection */}
            <div className="input_row flex-row">
                {['male', 'female', 'neutral'].map((item) => (
                    <div className="control" key={item}>
                        <label>
                            <input type="radio" {...register("gender", { required: "Gender is required" })} value={item} />
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </label>
                    </div>
                ))}
            </div>

            {errors.gender && <p className="error">{errors.gender.message}</p>}
            {/* Name Fields */}
            <div className="input-row">
                <div className="control">
                    <label>
                        <input type="text" placeholder="Firstname" {...register("firstname", { required: "Firstname is required" })} />
                    </label>
                    {errors.firstname && <p className="error">{errors.firstname.message}</p>}
                </div>

                <div className="control">
                    <label>
                        <input type="text" placeholder="Lastname" {...register("lastname", { required: "Lastname is required" })} />
                    </label>
                    {errors.lastname && <p className="error">{errors.lastname.message}</p>}
                </div>
            </div>

            {/* Birthday & Phone */}
            <div className="input-row">
                <div className="control">
                    <label>
                        <input type="date" {...register("birthday", { required: "Birthday is required" })} />
                    </label>
                    {errors.birthday && <p className="error">{errors.birthday.message}</p>}
                </div>

                <div className="control">
                    <label>
                        <input type="tel" placeholder="Phone" {...register("phone", { required: "Phone is required" })} />
                    </label>
                    {errors.phone && <p className="error">{errors.phone.message}</p>}
                </div>
            </div>

            {/* Email & Confirm Email */}
            <div className="input-row">
                <div className="control flex-row">
                    <label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email format",
                                },
                            })}
                        />
                    </label>
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                <div className="control">
                    <label>
                        <input
                            type="email"
                            placeholder="Confirm your email"
                            {...register("confirm_email", {
                                required: "Please confirm your email",
                                validate: (value, { email }) => value === email || "Emails do not match",
                            })}
                        />
                    </label>
                    {errors.confirm_email && <p className="error">{errors.confirm_email.message}</p>}
                </div>
            </div>

            <h2>Address Information</h2>

            {/* Address Fields */}
            <div className="input-row">
                <div className="control half-size">
                    <label>
                        <input type="text" placeholder="Postcode" {...register("postcode", { required: "Postcode is required" })} />
                    </label>
                    {errors.postcode && <p className="error">{errors.postcode.message}</p>}
                </div>

                <div className="control half-size">
                    <label>
                        <input type="text" placeholder="House Number" {...register("house_number", { required: "House number is required" })} />
                    </label>
                    {errors.house_number && <p className="error">{errors.house_number.message}</p>}
                </div>

                <div className="control">
                    <label>
                        <input type="text" placeholder="Addition" {...register("addition")} />
                    </label>
                </div>
            </div>

            <div className="input-row">
                <div className="control">
                    <label>
                        <input type="text" placeholder="Street Name" {...register("street_name", { required: "Street name is required" })} />
                    </label>
                    {errors.street_name && <p className="error">{errors.street_name.message}</p>}
                </div>

                <div className="control">
                    <label>
                        <input type="text" placeholder="City" {...register("city", { required: "City is required" })} />
                    </label>
                    {errors.city && <p className="error">{errors.city.message}</p>}
                </div>
            </div>

            {/* Submit Button */}
            <button type="submit">Next</button>
        </form>
    );
};

export default DetailsForm;