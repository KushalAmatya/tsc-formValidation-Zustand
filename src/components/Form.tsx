import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import MailForm from "./MailForm";

type FormValues = {
  name: string;
  age: string;
  email: string;
  password: string;
};

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  age: z
    .string()
    .min(1, { message: "Age is required" })
    .regex(/^\d+$/, { message: "Age must be a number" }),
});

const defaultValues = {
  name: "",
  age: "",
  email: "",
  password: "",
};

export const Form = () => {
  const [pageCount, setPageCount] = useState(0);
  const [formdata, setFormData] = useState<FormValues | null>(null);
  const [prevdata, setPrevData] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset, // <-- Import reset from useForm
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: prevdata || defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    const isValid = await trigger();
    if (!isValid) return;
    setFormData(data);
    setPrevData(data);
    console.log(prevdata);

    setPageCount(pageCount + 1);
  };

  useEffect(() => {
    if (prevdata) {
      console.log("Prev Data updated:", prevdata);
      reset(prevdata); // <-- Reset the form with prevdata when it updates
    }
    if (formdata) {
      console.log("Form Data updated:", formdata);
    }
  }, [formdata, prevdata, reset]); // <-- Include reset in dependency array

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
        {pageCount === 1 && (
          <MailForm
            pageCount={pageCount}
            formdata={formdata}
            prevdata={prevdata}
            setPrevData={setPrevData}
            setPageCount={setPageCount} // Assuming this is passed down for "prev" button
          />
        )}
      </form>
    </div>
  );
};
