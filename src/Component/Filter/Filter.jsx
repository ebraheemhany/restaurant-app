import React, { useEffect, useState } from 'react'
import { CiFilter } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

export const Filter = ({data , setFiltered}) => {

  const [selectedFilters, setSelectedFilters] = useState([]);
   const[showFilter , setShowFilter] = useState(false)
  const filters = ["Beef Sandwich", "Chicken Sandwich", "Meals", "Extras", "Drinks", "Desserts"];

// handel ChecBox change 
const handelChange = (filter) => {
if(selectedFilters.includes(filter)) {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter))
}
else {
    setSelectedFilters([...selectedFilters, filter])
}
}
useEffect(() => {

let filteredData = data;

if(selectedFilters.length > 0) {
    // هنا هيجيب كل العناصر اللي لها نفس ال كاتوجري اللي انا مختارهاا
    filteredData = data.filter((item) => selectedFilters.includes(item.category))
}
  setFiltered(filteredData);

}, [selectedFilters , data ])

  return (
    <div className='fixed top-40 right-5 w-45 '>
      {/* filter Icon */}
          <div onClick={() => setShowFilter((prev) => !prev)}  className='absolute -top-10 right-0 cursor-pointer'>
            <span className='text-white font-bold'>filter</span>
          <span className='text-3xl text-white cursor-pointer'><CiFilter /></span>
         </div>
        <div className={`filter_content flex flex-col gap-4 p-4  bg-white text-black rounded-2xl shadowlg relative ${showFilter ? "block" :"hidden"} duration-700`}>
              <div onClick={() => setShowFilter(false)} className='absolute top-1.5 right-2 cursor-pointer text-2xl'>
                <IoClose />
              </div>
        {
            filters.map((filter) => {
                return(
                         
            <div key={filter} className='flex gap-4 items-center'>
                <label htmlFor= {filter}>{filter}</label>
                <input type='checkbox' id={filter}
                onChange={() => handelChange(filter)}
                checked={selectedFilters.includes(filter)}
                
                />
            </div>
                )
            })
        }
            
        </div>
    </div>
  )
}
