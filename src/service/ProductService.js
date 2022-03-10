import axiosHelper from "../common/axiosHelper";

export const findAllProduct = ()=>{
    return axiosHelper.get("http://localhost:8080/product/findAll");
}

export const findById = (id)=>{
    return axiosHelper.get(`http://localhost:8080/product/findById/${id}`);
}

export const finAllSizeForProductId = (id)=>{
    return axiosHelper.get(`http://localhost:8080/size/findByProductId/${id}`);
}

export const finAllColorForProductId = (id)=>{
    return axiosHelper.get(`http://localhost:8080/color/findByProductId/${id}`);
}

export const finByColorSizeProduct = (idColor, idSize, idProduct)=>{
    return axiosHelper.get(`http://localhost:8080/productDetail/finByColorSizeProduct/${idColor}/${idSize}/${idProduct}`);
}
