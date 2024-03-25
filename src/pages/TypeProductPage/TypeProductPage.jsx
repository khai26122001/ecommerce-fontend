import React, { useEffect, useState } from 'react'
import { Col, Pagination, Row } from 'antd'
import NvaBarComponents from '../../components/NvaBarComponents/NvaBarComponents'
import CardComponents from '../../components/CardComponents/CardComponents'
import { WrapperProducts, WrapperNavbar } from './style'
import { useLocation } from 'react-router-dom'

// link tới trang --UserService--
import * as ProductService from '../../services/ProductService'
import Loading from '../../components/loadingComponents/Loading'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'

const TypeProductPage = () => {
    // để có thể search đx
    // ở đây ta sẽ dùng --useSelector-- để lấy dữ liệu trong --ProductSlide từ store.js--
    const searchProduct = useSelector((state) => state.product?.search)
    // này dùng để gọi tới --hooks-- để điều chỉnh thời gian --delay-- cho thanh tìm kím
    const searchDebounce = useDebounce(searchProduct, 1000)


    // dùng để lấy địa chỉ truy cập trên thanh --url--
    // ở đây ta sẽ lấy cái --type-- có trên thanh --url--
    // pathname: "/product/Lac_Chan"
    // ---const location = useLocation()
    // --console.log('location', location)

    // nhận --state-- tức là cái --type-- từ --typeProduct.jsx--
    const { state } = useLocation()

    // tạo ra cái nhận dữ liệu
    const [products, setProducts] = useState([])
    const [isPending, setIsPending] = useState(false)

    // xử lý phần phân trang trong type
    const [panigate, setPanigate] = useState({
        // số trang đang đứng
        page: 0,
        // tổng số sản phẩm hiện trên 1 trang
        limit: 2,
        total: 1,
    })


    //----------------------------------------------------------
    // hiển thị ra cái type của products
    const [typeProducts, setTypeProducts] = useState([])

    // getAllTypeProduct
    // dùng để hiển thị type sản phẩm
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
        // console.log('ressssss', res)
    }

    // gọi tới hàm --fetchAllTypeProduct()-- để hiển thị type
    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    // những tên của các trang sản phẩm cho vào mảng
    // sau này sẽ lấy dữ liệu phía mongoDB lên
    const arr = typeProducts

    console.log('arr', arr)
    //----------------------------------------------------------


    // tạo ra cái hàm để lấy dữ liệu
    const fetchProductType = async (state, page, limit) => {
        setIsPending(true)
        const res = await ProductService.getProductType(state, page, limit)
        if (res?.status === 'OK') {
            setIsPending(false)
            setProducts(res?.data)
            // bắt đầu làm phân trang
            setPanigate({ ...panigate, total: res?.totalPage, limit: panigate.limit })
        } else {
            setIsPending(false)
            console.log("lỗi ở trang TypeProductPage.jsx ")
        }
        console.log('res', res)
    }

    useEffect(() => {
        if (state) {
            // ta sẽ chuyền --state là type--, 
            fetchProductType(state, panigate.page, panigate.limit)
        }
    }, [state, panigate.page, panigate.limit])


    // current: là trang hiện đang đứng
    // pageSize: là cái --limit--
    const onChange = (current, pageSize) => {
        // console.log({ current, pageSize })
        setPanigate({ ...panigate, page: current - 1 })
    }

    const onChange1 = () => {
        // console.log({ current, pageSize })
        setPanigate({ page: 0, limit: 2, total: 1, })
    }


    useEffect(() => {
        // Reset page to 0 when type changes
        setPanigate(prevPanigate => ({ ...prevPanigate, page: 0 }));
    
        if (state) {
            fetchProductType(state, 0, panigate.limit); // Reset page to 0 when type changes
        }
    }, [state]); // Only trigger when state changes




    return (
        <Loading isPending={isPending}>
            <div style={{ padding: '0 120px', background: '#efefef', height: 'calc(100vh - 64px' }}>
                <div style={{ width: '1270px', margin: '0 auto', height: '70%' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% - 20px)' }}>
                        <WrapperNavbar span={4}>
                            <NvaBarComponents typeProducts={arr} key={arr} />
                        </WrapperNavbar>
                        <Col span={24} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts >
                                {products?.filter((pro) => {
                                    // làm thanh tìm kiếm
                                    if (searchDebounce === '') {
                                        return pro
                                    } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLocaleLowerCase())) {
                                        return pro
                                    }
                                }).map((product) => {
                                    return (
                                        <CardComponents
                                            key={product._id}
                                            countInStock={product.countInStock}
                                            description={product.description}
                                            image={product.image}
                                            name={product.name}
                                            price={product.price}
                                            rating={product.rating}
                                            type={product.type}
                                            discount={product.discount}
                                            selled={product.selled}
                                            // cái id dùng để phân biệt sản phẩm nào
                                            id={product._id}
                                        />

                                    )
                                })}
                            </WrapperProducts>

                            {/* 
                                thanh chuyển trang
                                total={panigate?.total}: bắt đầu truyền --total-- vào để phân trang 
                                defaultCurrent: khi zo sẽ ở trang 1
                                onChange: hàm xử lý việc phân trang
                            */}


                            <Pagination defaultCurrent={panigate?.page + 1} total={panigate?.total} pageSize={1} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />

                        </Col>

                    </Row>
                </div>
            </div>
        </Loading>
    )
}

export default TypeProductPage