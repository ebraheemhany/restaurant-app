import React from 'react'
import { Heder } from '../../Component/Heder/Heder'
import { LandingPage } from '../../Component/LandingPage/LandingPage'
import { Banner } from '../../Component/Banner/Banner'
import { Cards } from '../../Component/Cards/Cards'
import { useContext } from 'react'
import { AppContext } from '../../Context/Context'
import { Footer } from '../../Component/Footer/Footer'


export const Home = () => {
const {getData , topProducts} = useContext(AppContext)

// get Offers items
const GetOffers = () => {
  return getData.filter((item) => item.discount && item.discount > 0)
}


  return (
    <>
   <div className='fixed top-0 left-0 w-full my-auto z-40'>
     <Heder />
   </div>
  
 <LandingPage />
  
    <Banner />

    <Cards title={"Offers"} data={GetOffers()} more={"/offerItems"} />

   


 <Cards title={"Meals"} data={getData} more={"/allItems"} />
    <Footer />
    </>
  )
}
