import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
interface MailFormProps {
    pageCount: number;
    formdata: any
    }

type mailFormValues = {
    email: string;
    password: string;
}

const mailSchema = z.object({
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"})    
});



export default function MailForm({pageCount,formdata}: MailFormProps) {
    const {register, handleSubmit, trigger, formState: {errors}} = useForm<mailFormValues>({
        resolver: zodResolver(mailSchema)
    });
    const onSubmit = async(data: any) => {
        
        const isValid = await trigger();
        if (!isValid) return;
        const combinedData = {...formdata, ...data};
        console.log(combinedData);
    }

    const prev = () => {
        pageCount - 1;
    }

  return (
    <div>

    <div className="flex-col flex max-w-md mx-auto border-solid border-black border p-4">
        <label htmlFor="">Enter Email</label>
        <input type="email" {...register("email")}/>
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        <label htmlFor="">Enter Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        <button  className="mt-2 bg-slate-600 w-16 hover:bg-slate-700 text-gray-200 items-center" onClick={()=>(prev)}>Prev</button>
        <button
            className="mt-2 bg-slate-600 w-16 hover:bg-slate-700 text-gray-200 items-center"
            type="submit" onClick={handleSubmit(onSubmit)
            }
        >
            Submit
        </button>
    </div>
    </div>
  )
}
