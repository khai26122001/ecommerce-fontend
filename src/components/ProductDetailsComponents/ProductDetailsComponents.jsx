import { Col, Image, Rate, Row } from "antd"

import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'

// icon hình ngôi sao
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponents from "../ButtonComponents/ButtonComponents"

// link tới trang --UserService--
import * as ProductService from '../../services/ProductService'
import { useEffect, useState } from "react"
// import { useQuery } from "@tanstack/react-query"
import Loading from "../loadingComponents/Loading"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { addOrderProduct } from "../../redux/slides/orderSlide"
import { convertPrice } from "../../utils"

const ProductDetailsComponents = ({ idProduct }) => {
    // chuyển trang
    const navigate = useNavigate()
    // lấy địa chỉ thanh url hiện đang khai báo khi chạy lên
    const location = useLocation()
    // lúc này trong --pathname-- sẽ chứa url tại trang khai báo
    console.log('location', location)
    // dy chuyển đến state order
    const dispatch = useDispatch()

    // cách 1
    const [isPendingProduct, setIsPendingProduct] = useState(false)
    const [numProduct, setNumProduct] = useState(1)

    // lấy token dữ liệu của user khi đăng nhập
    const user = useSelector((state) => state.user)

    // tạo --useState-- để chứa dữ liệu dùng để --update--
    const [stateProductDetail, setStateProductDetail] = useState({
        name: '',
        image: '',
        type: '',
        countInStock: '',
        price: '',
        rating: '',
        description: '',
        id: '',
        discount: '',
        city: '',
    })

    // tạo cái hàm để hiển thị dữ liệu lên khung --tìm kiếm theo id--
    const fetchGetDetailsProduct = async (idProduct) => {
        // nếu tồn tại --_id-- thì thực hiện
        if (idProduct) {
            // --rowSelected-- ở đây là id
            // thực hiện lấy dữ liệu thông qua --id-- rồi gán dữ liệu vào  --setStateProductDetail--
            const res = await ProductService.getDetailProduct(idProduct);
            console.log('res?.data', res)

            // nếu có data thì ta sé --set-- chuyền dữ liệu vào --setStateProductDetail--
            if (res?.data) {
                setStateProductDetail({
                    name: res?.data?.name,
                    image: res?.data?.image,
                    type: res?.data?.type,
                    countInStock: res?.data?.countInStock,
                    price: res?.data?.price,
                    rating: res?.data?.rating,
                    description: res?.data?.description,
                    id: res?.data?._id,
                    discount: res?.data?.discount,
                    city: res?.data?.city,
                });
            }

        }
    }

    // khi phát hiện có --id và
    // mở cái bảng --update-- lên thì gọi tới hàm --fetchGetDetailsProduct(rowSelected)-- và chuyền id vào
    useEffect(() => {
        // khi có --id và isOpenDrawer==true-- thì ta sẽ --loard-- dữ liệu lên bảng --update--
        if (idProduct) {
            setIsPendingProduct(true)
            fetchGetDetailsProduct(idProduct)
        }
        setIsPendingProduct(false)
    }, [idProduct])

    const onchange = (value) => {
        setNumProduct(Number(value))
    }

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1)
        } else if (type === 'decrease') {
            setNumProduct(numProduct - 1)
        }
    }
    

    // bắt đầu qua trang order
    const handleAddOrderProduct = () => {
        // khi chưa đăng nhập thì phải đá tới trang login để đăng nhập mới dx mua hàng
        if (!user?.id) {
            // sau khi có --location?.pathName-- tức là đường link thì ta sẽ chuyền qua trang --homePage--
            navigate('/sign-in', { state: location?.pathname })
        } else {
            // nếu đã có --user id--
            dispatch(addOrderProduct({
                orderItem: {
                    name: stateProductDetail?.name,
                    // số lượng
                    amount: numProduct,
                    // ảnh
                    image: stateProductDetail?.image,
                    price: stateProductDetail?.price,
                    // id
                    product: stateProductDetail?.id,
                    // giảm giá
                    discount: stateProductDetail?.discount,
                    // cái city nữa
                    city: stateProductDetail?.city,
                }
            }))
        }

    }

    return (
        <Loading isPending={isPendingProduct}>
            <Row style={{ padding: '16px', background: '#fff' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px', borderRadius: '4px' }}>
                    <Image src={stateProductDetail?.image} alt="image product" preview={false} style={{ width: '350px', height: '300px', marginLeft: '55px' }} />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={stateProductDetail?.image} alt="image small" preview={false} style={{ width: '64px', height: '64px' }} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={stateProductDetail?.image} alt="image small" preview={false} style={{ width: '64px', height: '64px' }} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={stateProductDetail?.image} alt="image small" preview={false} style={{ width: '64px', height: '64px' }} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={stateProductDetail?.image} alt="image small" preview={false} style={{ width: '64px', height: '64px' }} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={stateProductDetail?.image} alt="image small" preview={false} style={{ width: '64px', height: '64px' }} />
                        </WrapperStyleColImage>

                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={stateProductDetail?.image} alt="image small" preview={false} style={{ width: '64px', height: '64px' }} />
                        </WrapperStyleColImage>
                    </Row>
                </Col>

                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{stateProductDetail?.name}</WrapperStyleNameProduct>
                    <div>
                        {/* dùng cái hàm này để hiển thị số sao */}
                        <Rate allowHalf defaultValue={stateProductDetail?.rating} value={stateProductDetail?.rating} />

                        <WrapperStyleTextSell>| Da ban 1000+</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{convertPrice(stateProductDetail?.price)}</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className='address'><b>{user?.address}</b></span>
                        <span className='change-address'> Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQualityProduct>
                            {/* <ButtonComponents /> */}
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>

                            <WrapperInputNumber onChange={onchange} value={numProduct} size="small" defaultValue={1} />

                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', aliggItem: 'center', gap: '12px' }}>
                        <ButtonComponents
                            bordered={'none'}
                            size={40}
                            styleButon={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                boderRadius: '4px'
                            }}
                            onClick={handleAddOrderProduct}
                            textButton={'Chọn mua'}
                            styleTextButon={{ color: '#fff', fontSize: '15px', fontWeight: '700px' }}
                        ></ButtonComponents>

                        <ButtonComponents
                            bordered={'none'}
                            size={40}
                            styleButon={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid rgb(13, 92, 182)',
                                boderRadius: '4px'
                            }}
                            textButton={'Mua trả sau'}
                            styleTextButon={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                        ></ButtonComponents>
                    </div>
                </Col>
            </Row>



            <Row style={{ padding: '16px', background: '#fff', marginTop: "20px", marginBottom: '-30px' }}>
                {/* dùng này để hiển thị dữ liệu của --ckeditor-- ra */}
                <div dangerouslySetInnerHTML={{ __html: stateProductDetail?.description }} />
            </Row>
        </Loading>
    )
}

export default ProductDetailsComponents