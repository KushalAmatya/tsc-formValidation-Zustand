import { useNavigate } from "react-router-dom";
import useStore  from "../store"

export default function List() {
    const data = useStore((state) => state.data);
    console.log(data);
    const navigate = useNavigate();
  return (
    <div className="content-center">
      <h1 className="text-5xl text-center p-4 font-bold">Lists</h1>
      <table className="border text-3xl content-center mx-auto">
        {data.length > 0? 
        <thead>
          <tr className="border border-l-pink-100">
            <th className="border w-10">Name</th>
            <th className="border">Age</th>
            <th className="border">Email</th>
            <th className="border">Password</th>
            <th className="border">Actions</th>
            
       
          </tr>
        </thead>
        :<thead>

        </thead>}
        <tbody>
        {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="border border-solid">
                <td className="border">{item.name}</td>
                <td className="border">{item.age}</td>
                <td className="border">{item.email}</td>
                <td className="border">{item.password}</td>
                <td className="border">
                  <button
                    onClick={() => {
                      useStore.getState().deleteData(index);
                    }}
                    className="bg-red-500 p-2"
                  >
                    Delete
                  </button>
                 
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      
      </table>
      <button onClick={()=>{
        navigate("/")
      }} className="flex mx-auto bg-green-400 p-3 mt-3 text-2xl">Add Data</button>
    </div>
  )
}
