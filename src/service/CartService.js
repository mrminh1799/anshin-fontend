import axiosHelper from "../common/axiosHelper";

export const getCartDetail = (id) =>{
    return axiosHelper.get(`http://localhost:8080/cart/findDetailCartItem/${id}`);
}

export const getCart = (idAcount) =>{
    return axiosHelper.get(`http://localhost:8080/cart/findByIdAcount/${idAcount}`);
}