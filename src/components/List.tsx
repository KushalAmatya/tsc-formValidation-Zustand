import { useNavigate } from "react-router-dom";
import useStore  from "../store"

export default function List() {
    const data = useStore((state) => state.data);
    // console.log(data);
    const navigate = useNavigate();
    const edit = (index: number) => {
      const editData = data[index];
      useStore.getState().deleteData(index);
      navigate("/", { state: { editData } });
    }
  return (
    <div className="content-center">
      <h1 className="text-5xl text-center p-4 font-bold">Lists</h1>
      <table className="border text-3xl content-center mx-auto">
        {data.length > 0? 
        <thead className="bg-blue-800">
          <tr className="border border-l-black">
            <th className="text-gray-400 w-10 ">Name</th>
            <th className="text-gray-400 ">Age</th>
            <th className="text-gray-400 ">Email</th>
            <th className="text-gray-400 ">Password</th>
            <th className="text-gray-400 ">Actions</th>
            
       
          </tr>
        </thead>
        :<thead>

        </thead>}
        <tbody>
        {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="border border-black ">
                <td className="border border-black">{item.name}</td>
                <td className="border border-black">{item.age}</td>
                <td className="border border-black">{item.email}</td>
                <td className="border border-black">{item.password}</td>
                <td className="border border-black">
                  <button
                    onClick={() => {
                      useStore.getState().deleteData(index);
                    }}
                    className="bg-red-500 p-1 hover:bg-red-600"
                  >
                    Delete
                  </button>
                 <button onClick={()=>{
                  edit(index)
                 }} className="bg-yellow-300 p-1">Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border border-black text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      
      </table>
      <button onClick={()=>{
        navigate("/")
      }} className="flex mx-auto bg-blue-800 p-3 mt-3 text-2xl hover:bg-blue-500 text-slate-300">Add Data</button>
    </div>
  )
}
