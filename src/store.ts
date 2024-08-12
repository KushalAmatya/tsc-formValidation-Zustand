import { create } from "zustand";

interface DataType{
    name: string;
    age: number;
    email: string;
    password: string;
}
interface Store {
    data: DataType[];
    setData: (newData: DataType) => void;
    deleteData: (index: number) => void;
    editData: (index: number, newData: DataType) => void;
}

const initialData = JSON.parse(localStorage.getItem("data") || "[]");

const useStore = create<Store>((set, get) => ({
    data: initialData,  
    setData: (newData) => {
   
        const currentData = get().data;

      
        const updatedData = [...currentData, newData];

    
        localStorage.setItem("data", JSON.stringify(updatedData));

      
        set({ data: updatedData });
    },
    deleteData: (index) => {
        const currentData = get().data;
        const updatedData = currentData.filter((_, i) => i !== index);
        localStorage.setItem("data", JSON.stringify(updatedData));
        set({ data: updatedData });
    },
    editData: (index, newData) => {
        const currentData = get().data;
        const updatedData = currentData.map((item, i) => (i === index ? newData : item));
        localStorage.setItem("data", JSON.stringify(updatedData));
        set({ data: updatedData });
    }
}));

export default useStore;
