import axiosHelper from "../common/axiosHelper";

export const getAllOderForAdmin = ()=>{
    return axiosHelper.get("http://localhost:8080/admin/order/findAll");
}