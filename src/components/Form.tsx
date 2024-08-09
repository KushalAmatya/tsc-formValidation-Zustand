import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import MailForm from "./MailForm";

type FormValues = {
  name: string;
  age: string;
};

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  age: z
    .string()
    .min(1, { message: "Age is required" })
    .regex(/^\d+$/, { message: "Age must be a number" }),
});

export const Form = () => {
  const [pageCount, setPageCount] = useState(0);
  const [formdata, setFormData] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    const isValid = await trigger();
    if (!isValid) return;
    setFormData(data);
    setPageCount(pageCount + 1);
  };

  useEffect(() => {
    if (formdata) {
      console.log("Form Data updated:", formdata);
    }
  }, [formdata]);

  return (
    <div>
      <form className="">
        {pageCount === 0 && (
          <div className="bg-slate-400 flex-col flex max-w-md mx-auto border-solid border-black border p-4">
            <label htmlFor="">Enter Name</label>
            <input type="text" {...register("name")} />

            <p className="text-red-600">{errors.name?.message}</p>

            <label htmlFor="">Enter Age</label>
            <input type="text" {...register("age")} />
            <p className="text-red-600">{errors.age?.message}</p>

            <button
              onClick={handleSubmit(onSubmit)}
              className="mt-2 bg-slate-600 w-16 hover:bg-slate-700 text-gray-200 items-center"
              type="submit"
            >
              Next
            </button>
          </div>
        )}
        {pageCount === 1 && <MailForm pageCount={pageCount} formdata={formdata}/>}
      </form>
    </div>
  );
};
