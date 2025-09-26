import { BigCard } from "../../Component/BigCard/BigCard"
import { Heder } from "../../Component/Heder/Heder"
import { AppContext } from "../../Context/Context"
import { useContext } from "react"

export const OfferItems = () => {
const {getData} = useContext(AppContext)
const filterOffers = () => {
return getData.filter((item) => item.discount && item.discount > 0)
}

  return (
  <>
  <Heder />
    <div className="my-40 container mx-auto">
       <div className="content">

      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-amber-500 ml-6">All Offers</h1>
      </div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 ">
        {
            filterOffers().length > 0 ? (
         filterOffers().map((item , idx) => {
            return(
                <BigCard  item={item} idx={idx}/>
            )
         })
            ) : 
            
            (<div>No Items Avalapel Yet</div>) 
        }
       </div>


       </div>
    </div>



  </>
  )
}
