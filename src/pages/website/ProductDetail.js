import { InputLabel, TextField } from "@mui/material";
import { style } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import * as ProductService from "../../service/ProductService"
import styles from '../../style/productStyle.module.css'
import * as toastHelper from "../../common/ToastHelper";
import CartWidget from "src/sections/@dashboard/products/ProductCartWidget";


function ProductDetail() {
  const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const { id } = useParams();
  const [image, setImage] = useState();
  const [product, setProduct] = useState({})
  const [listSize, setListSize] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [productDetail, setProductDetail] = useState(
    {
      id: 0,
      productId: product.id,
      productName: product.name,
      idSize: 0,
      nameSize: "",
      idColor: 0,
      nameColor: "",
      price: 0,
      quantity: 0
    })


  useEffect(() => {
    ProductService.findById(id).then((response) => {

      setProduct(response.data)
      setImage(response.data.image)
      setProductDetail({
      })
    })

    ProductService.finAllColorForProductId(id).then((response) => {
      setListColor(response.data)
    })

    ProductService.finAllSizeForProductId(id).then((response) => {
      setListSize(response.data)
    })




  }, [id])

  const onChangeSize = (id, name) => {
    setProductDetail(
      {
        ...productDetail,
        idSize: id,
        nameSize: name,

      })
  }

  const onChangeColor = (id, name,img) => {
    setProductDetail(
      {
        ...productDetail,
        idColor: id,
        nameColor: name,


      })
      setImage(img)

  }
  const addToCart = (idColor, idSize) => {

    if (idColor === 0 || idSize === 0) {

      if (idColor === 0) {
        toastHelper.toastError("Xin vui lòng chọn màu")
      }

      if (idSize === 0) {
        toastHelper.toastError("Xin vui lòng chọn size")
      }
    } else {
      console.log("response.data1")
       ProductService.finByColorSizeProduct(idColor, idSize, product.id).then((response) => {

        if(response.data.quantity===0 || response.data.length===0){
          toastHelper.toastError("Sản phẩm tạm thời hết hàng")
        }else{
          toastHelper.toastSuccess("Thêm vào giỏ hàng thành công")
          console.log(response.data)
          setProductDetail({
            ...productDetail,
            id: response.data.id
          })

          console.log(productDetail)
          localStorage.setItem("cart", 
          JSON.stringify([... JSON.parse(localStorage.getItem("cart")),
          { idProduct: response.data.id, quantity: productDetail.quantity
         }
         ])
          )
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  const changeQuantity = (e)=>{
    
    setProductDetail({
      ...productDetail,
      quantity: e.target.value
    })
    console.log(productDetail)
  }

  return (


    <div className="container">
     
      <div className={styles.card}>
        <div className="container-fliud">
          <div className="wrapper row">
            <div className="preview col-md-7">
              <div className="preview-pic tab-content">
                <div id="pic-1">
                  <img src={image} /></div>
              </div>

            </div>
            <div className="details col-md-5">
              <h3 className={styles.productTitle}>{product.name}</h3>
              <div className={styles.rating}>

                <span className="review-no">41 reviews</span>
              </div>

              <h4 className={styles.price}>current price: <span>{product.price} $</span></h4>
              <h5 className={styles.sizes}>sizes:
                {
                  listSize === null ? <div>Loi load size</div> :
                    listSize.map(x => (
                      <input key={x.id} onClick={() => onChangeSize(x.id, x.size_name)} className="btn btn-primary ml-1" type="button" value={x.size_name}></input>
                    )
                    )
                }
              </h5>
              <h5 className={styles.colors}>colors:
                {
                  listColor === null ? <div>Loi load size</div> :
                    listColor.map(x => (
                      <img key={uuidv4()} onClick={() => onChangeColor(x.id, x.color_name,x.image)} className={styles.color} height="70px" width="50px" src={x.image}></img>

                    )
                    )
                }
              </h5>

              <br></br>
              <div className="action">
                <div>
                  Size: <span >{productDetail.nameSize}</span>
                  <br />
                  Mau: <span>{productDetail.nameColor}</span>
                  <br />
                  So luong: <input onChange={changeQuantity} type="number" step="1" />


                </div>
                <br />
                <div>
                  <button className="btn btn-primary ml-1" type="button">Mua ngay</button>
                  <button className="btn btn-primary ml-1" type="button" onClick={() => addToCart(productDetail.idColor, productDetail.idSize)} >Thêm vào giỏ hàng</button>
                  <button className='btn btn-primary ml-1' type="button">Thích</button>
                </div>
              </div>

              <br />
              <h2>Description</h2>
              <p className={styles.productDescription}>Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.
                Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.
                Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.
                Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.
              </p>
            </div>
          </div>
        </div>
      </div>
      asdasdsadas
    </div>
  );
}

export default ProductDetail;