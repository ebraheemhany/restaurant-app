import { Route, Routes } from "react-router";
import { DashBord } from "./Dashbord/DashBord";
import { DasgbordPage } from "./Dashbord/DasgbordPage/DasgbordPage";
import {MenuPage} from "./Dashbord/MenuPage/MenuPage"
import  {AddItemToMenu} from "./Dashbord/AddItemToMenu/AddItemToMenu"
import { ItemOffers } from "./Dashbord/ItemOffers/ItemOffers";
import { EditItem } from "./Dashbord/EditItem/EditItem";
import { Home } from "./Pages/Home/Home";
import { Sign } from "./Pages/Auth/SignIN/Sign";
import { Login } from "./Pages/Auth/Login/Login";
import { AddItemOffers } from "./Component/AddItemOffers/AddItemOffers";
import { OfferItems } from "./Pages/OfferItems/OfferItems";
import { Orders } from "./Dashbord/Oders/Orders";
import { CartPage } from "./Pages/CartPage/CartPage";
import { UserDetails } from "./Pages/UserDetails/UserDetails";
import { ItemDetails } from "./Pages/ItemDetails/ItemDetails";
import { AllItems } from "./Pages/AllItems/AllItems";
import { PageMenu } from "./Pages/MenuPage/PageMenu";
import { ContactUs } from "./Pages/ContactUs/ContactUs";
import { SearchPage } from "./Pages/SearchPage/SearchPage";
import { TrackVisitor } from "./Component/TrackVisitor/TrackVisitor";
import { BestSelerPage } from "./Pages/BestSelerPage/BestSelerPage";

function App() {

  return (
    <>
  
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="dashbord" element={<DashBord />}>
        <Route path="/dashbord/dash" element= {<DasgbordPage />} />
        <Route path="/dashbord/menu" element= {<MenuPage />} />
        <Route path="/dashbord/addItem" element={<AddItemToMenu />} />
        <Route path="/dashbord/itemOffers" element={<ItemOffers />} />
        <Route path="/dashbord/Orders" element={<Orders />} />
        <Route path="/dashbord/AddItemOffers" element={<AddItemOffers />} />
        <Route path="/dashbord/EditItem/:id" element={<EditItem />} />
        </Route>
       <Route path="/sign" element={<Sign />} />
       <Route path="/login" element={<Login />} />
       <Route path="/offerItems" element={<OfferItems />} />
       <Route path="/allItems" element={<AllItems />} />
       <Route path="/bsetSeler" element={<BestSelerPage />} />
       <Route path="/cartPage" element={<CartPage />} />
       <Route path="/userDetails" element={<UserDetails />} />
       <Route path="/itemDetails/:id" element={<ItemDetails />} />
       <Route path="/menuPage" element={<PageMenu />} />
       <Route path="/search" element={<SearchPage />} />
       <Route path="/contact" element={<ContactUs />} />

      </Routes>
    {/* علشان لما اي مستخدم يخش علي الموقع يتم تسجليه في جدول viitors */}
    <TrackVisitor />

    </>
  )
}

export default App ;
