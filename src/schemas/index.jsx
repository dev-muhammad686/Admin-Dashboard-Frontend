import * as Yup from "yup";

export const logInSchema = Yup.object({
    username: Yup.string().min(4).max(25).required("Please enter your name"),
    password: Yup.string().required("Password is required")
})