import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Alert = async ({title , icon , ok , cancel , cancelValue }) => {
    
const result =  await MySwal.fire({
  title: title,
  text: "",
  icon: icon,
  showCancelButton: cancelValue,
  confirmButtonText: ok,
  cancelButtonText: cancel,
  confirmButtonColor:"#11385A",
  cancelButtonColor: "#82181A",
  position: "top-end",
  background: "#212020",
  color: "#FFFFFF",
  width: "400px",   // 👈 عرض البوب أب
});
return result.isConfirmed ; 
}
