import React, { useEffect, useState } from 'react'
import { CiFilter } from "react-icons/ci";


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
    <div className='fixed top-40 right-5 w-35 '>
      {/* filter Icon */}
          <div onClick={() => setShowFilter((prev) => !prev)}  className='absolute -top-10 right-0 cursor-pointer'>
            <span className='text-amber-600'>filter</span>
          <span className='text-3xl text-amber-600 cursor-pointer'><CiFilter /></span>
         </div>
        <div className={`filter_content flex flex-col gap-4 p-4  bg-black/80 text-amber-600 rounded-2xl shadowlg relative ${showFilter ? "block" :"hidden"} duration-700`}>
  
        {
            filters.map((filter) => {
                return(
                        
            <div key={filter} className='flex gap-4'>
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
