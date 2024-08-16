import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "react";

interface MailFormProps {
  pageCount: number;
  formdata: any;
  prevdata: any;
  setPrevData: Dispatch<any>;
  setPageCount: Dispatch<number>; 
}

type MailFormValues = {
  email: string;
  password: string;
};

const mailSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export default function MailForm({ pageCount, formdata, prevdata, setPrevData, setPageCount }: MailFormProps) {
  const { register, handleSubmit, trigger, formState: { errors } } = useForm<MailFormValues>({
    resolver: zodResolver(mailSchema),
    defaultValues: prevdata, 
  });
  const setData = useStore((state) => state.setData);
  const storedData  = useStore((state) => state.data);
  const navigate = useNavigate();
  const onSubmit = async (data: MailFormValues) => {
    const isValid = await trigger();
    if (!isValid) return;
    const combinedData = { ...formdata, ...data };
    for(let i = 0; i < storedData.length; i++) {
        if(storedData[i].email === combinedData.email) {
            alert("Email already exists");
            return;
        }
        }
    setData(combinedData);
    setPrevData(combinedData); 
    // console.log(combinedData);
    navigate("/list");
    
  };

  const prev = () => {
    setPageCount(pageCount - 1); 
  };

  return (
    <div className="">
      <div className="flex-col flex max-w-md mx-auto border-solid border-black border p-4 bg-slate-400">
        <label htmlFor="">Enter Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        <label htmlFor="">Enter Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}

        <button className="mt-2 bg-slate-600 w-16 hover:bg-slate-700 text-gray-200 items-center" onClick={prev}>
          Prev
        </button>
        <button className="mt-2 bg-slate-600 w-16 hover:bg-slate-700 text-gray-200 items-center" type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </button>
      </div>
    </div>
  );
}
