import { TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import TableHeaderComponet from "src/components/Table/TableHearComponent";
import * as CartService from "../../service/CartService"

function CartDetail() {

    const [listCart, setListCart] = useState([])


    const getListCart =  (id, quantity) => {
        CartService.getCartDetail(id).then(res => {
            console.log(res.data)
            setListCart(pre => {
                return [
                    ...pre,
                    {
                        id: res.data.idProduct,
                        name: res.data.productName,
                        sizeName: res.data.sizeName,
                        colorName: res.data.colorName,
                        quantity: quantity,
                        price: res.data.price,
                        colorImage: res.data.colorImage
                    }
                ]
            })


        })
    }

    const [orderDTO, setOrderDTO] = useState({listOrderProductDetailDTO:[]})

    useEffect(() => {
        (async () => {
            const listCart1 = JSON.parse(localStorage.getItem("cart"));
            
            if (listCart1 !== null) {
                listCart1.map(x => {
                    getListCart(x.idProduct, x.quantity)
                })

            
            }
        })();

    }, [])

    const headerTable = [{ id: '1', label: 'Tên sản phẩm' }, { id: '2', label: 'Màu' },
    { id: '3', label: 'Ảnh' }, { id: '4', label: 'Size' }, { id: '5', label: 'Số lượng' }, { id: '6', label: 'Giá' },
    { id: '7', label: 'Tổng tiền' }]

console.log(listCart)

const onChageName=(e)=>{
    setOrderDTO({
        ...orderDTO,
      fullname: e.target.value
    })  
}


const onChangeAdress=(e)=>{
    setOrderDTO({
        ...orderDTO,
        address: e.target.value
    })  
}


const onChangeAdressDetail=(e)=>{
    setOrderDTO({
        ...orderDTO,
        detailAddress: e.target.value
    })  
}

const onChangePhonenumber=(e)=>{
    setOrderDTO({
        ...orderDTO,
        phoneNumber: e.target.value
    })  
    
    console.log(orderDTO)
}

const showInfor =()=>{

    listCart.map((x) => {
        setOrderDTO({
            ...orderDTO,
            listOrderProductDetailDTO: [
            
                ... orderDTO.listOrderProductDetailDTO,
                {
                    id: x.id,
                    quantity: x.quantity
                }
            ]
        })  

    })
    
}

const newOdrer=() =>{

}





    return (
        <div>


            <TableHeaderComponet headLabel={headerTable}> </TableHeaderComponet>
            {listCart.map((x)=>{
                return(
                    <TableRow>
                        <TableCell>{x.name}</TableCell>
                        <TableCell>{x.colorName}</TableCell>
                        <TableCell> 
                            <img height="50" src={x.colorImage}></img>
                        </TableCell>
                        <TableCell>{x.sizeName}</TableCell>
                        <TableCell>{x.quantity}</TableCell>
                        <TableCell>{x.price}</TableCell>
                        <TableCell>{x.price*x.quantity}</TableCell>
                    </TableRow>
                )
            }
            )  
            }
<div>
        <button onClick={()=>showInfor()} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Đặt hàng</button>
        <div className="mt-190 modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Thông tin khách hàng</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">Tên :</label>
                    <input  onChange={onChageName}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">Số điện thoại :</label>
                    <input onChange={onChangePhonenumber} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">Địa chỉ :</label>
                    <input onChange={onChangeAdress} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label">Địa chỉ chi tiết:</label>
                    <textarea onChange={onChangeAdressDetail} className="form-control" id="message-text" defaultValue={""} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={()=>newOdrer()} className="btn btn-primary">Đặt hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
            

        </div>
    );
}

export default CartDetail;