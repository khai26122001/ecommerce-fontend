import React, { useEffect, useState } from 'react'
// gọi tới --TypeProduct-- để in ra các những sản phẩm của web
import TypeProduct from '../../components/TypeProduct/TypeProduct'
// gán cái tên --WrapperTypeProduct-- là cái css --'./style'--
import { WrapperTypeProduct, WrapperButtonMore, WrapperProducts } from './style'
// gọi tới --SliderComponent-- để in ra cái slider
import SliderComponent from '../../components/SliderComponents/SliderComponents'

// import từng cái ảnh lên rồi gán vào từng cái tên lần lượt là --slider1, slider2, slider3--
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.webp'
import slider5 from '../../assets/images/slider5.webp'
import CardComponents from '../../components/CardComponents/CardComponents'

// add zo để hiển thị tất cả sản phẩm
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import Loading from '../../components/loadingComponents/Loading'
import { useDebounce } from '../../hooks/useDebounce'
import { Image } from 'antd'
import { useNavigate } from 'react-router-dom'



const HomePage = () => {
    const navigate = useNavigate()

    // ở đây ta sẽ dùng --useSelector-- để lấy dữ liệu trong --ProductSlide từ store.js--
    const searchProduct = useSelector((state) => state.product?.search)
    // này dùng để gọi tới --hooks-- để điều chỉnh thời gian --delay-- cho thanh tìm kím
    const searchDebounce = useDebounce(searchProduct, 1000)
    // const refSearch = useRef()
    // const [stateProducts, setStateProducts] = useState([])

    // const [loading, isLoading] = useState(false)
    // sét để khi vừa vào nó sẽ hiện 8 sản phẩm
    const [limit, setLimit] = useState(8)

    // hiển thị ra cái type của products
    const [typeProducts, setTypeProducts] = useState([])


    // getAllTypeProduct
    // dùng để hiển thị type sản phẩm
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    // gọi tới hàm --fetchAllTypeProduct()-- để hiển thị type
    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    // những tên của các trang sản phẩm cho vào mảng
    // sau này sẽ lấy dữ liệu phía mongoDB lên
    const arr = typeProducts

    console.log('typeProducts', typeProducts)


    // dùng để hiển thị sản phẩm
    const fetchProductAll = async (limitTest) => {
        // console.log("limitTest", limitTest)
        const limit = limitTest?.queryKey && limitTest?.queryKey[1]
        const search = limitTest?.queryKey && limitTest?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit);
        return res;
    }


    // queryKey: là mảng chứa các khóa query.
    // queryFn: là hàm thực hiện truy vấn.
    // config: là một đối tượng chứa các cấu hình bổ sung, trong trường hợp này là cấu hình liên quan đến việc thử lại.
    // console.log('data', product);
    const { isPending, data: products } = useQuery({
        queryKey: ['products', limit, searchDebounce],
        queryFn: fetchProductAll,
        config: { retry: 3, retryDelay: 1000 },
        // giữ lại dữ liệu trước đó khi có một lần gọi mới, giúp cải thiện trải nghiệm người dùng trong một số trường hợp
        keepPreviousData: true
    });
    // console.log('isPreviousData', products)


    const handleNavigateType = (type) => {
        // normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_'): dùng để bỏ đi cái tiếng việt khi kik vào --type--
        // {state: type}: nhận cái --type-- tiếng việt để tìm kiếm --type--
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
    }



    return (
        <Loading isPending={isPending}>
            <div style={{ padding: '0 120px', margin: '0 auto' }}>
                {/* WrapperTypeProduct: là css của cái bên trong --style.js-- */}
                <WrapperTypeProduct>
                    {/* arr.map((item): map các thành phần có trong mảng bỏ vào biến --item-- */}
                    {arr.map((item) => {
                        return (
                            // in ra các thành phần của trang web như là các loại sản phẩm 
                            // gọi đến trang --TypeProduct.jsx-- rồi truyền biến --name={item}-- vào để bên kia xử lý in ra
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: '#efefef' }}>
                <div id="container" style={{ height: '100%', width: '100%', margin: '0 auto' }}>
                    {/* cho 3 cái ảnh vào mảng | rồi hiển thị ra cái slider */}
                    {/* gọi tới trang --SliderComponents.jsx--  */}
                    <SliderComponent arrImage={[slider1, slider2, slider3, slider4, slider5]} />

                    <div>
                        <Image onClick={() => handleNavigateType(arr[2])} key={slider2} src={slider2} alt="slider3" preview={false} width="32.4%" height="230px" style={{ marginTop: '5%', cursor: 'pointer' }} />
                        <Image onClick={() => handleNavigateType(arr[3])} key={slider3} src={slider3} alt="slider3" preview={false} width="32.5%" height="230px" style={{ marginLeft: '4%', marginTop: '5%', cursor: 'pointer' }} />
                        <Image onClick={() => handleNavigateType(arr[5])} key={slider4} src={slider4} alt="slider3" preview={false} width="32.4%" height="230px" style={{ marginLeft: '8%', marginTop: '5%', cursor: 'pointer' }} />
                    </div><br /><br />

                    {/* gọi tới trang làm khung hình ảnh bán hàng --CardComponents.jsx-- rồi in ra màng hình trang HomePage.jsx */}
                    <WrapperProducts style={{ padding: '0 120px', }}>
                        {products?.data?.map((product) => {
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
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>

                        <WrapperButtonMore
                            textButton="Xem Thêm" type="outline" styleButon={{
                                border: '1px solid rgb(11, 116, 229)', color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11, 116, 229)'}`,
                                width: '240px', height: '38px', borderRadius: '4px', marginBottom: '50px', marginTop: '30px'
                            }}

                            styleTextButon={{ fontWeight: 500 }}
                            // khi mà hết sản phẩm thì ko cho bấm nút xem thêm nữa
                            disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                            // cái nút xem thêm sẽ hiển thị thêm 5 sản phẩm nữa
                            onClick={() => setLimit((prev) => prev + 5)}
                        />
                    </div>
                    {/* <ButtonComponents textButton="Xem Thêm" type="outline"/> */}

                    {/* gọi tới trang --NvaBatComponents.jsx-- làm --nvabar-- in ra màng hình trang HomePage.jsx */}
                    {/* <NvaBarComponents/>     */}

                </div>
            </div>
        </Loading>
    )
}

export default HomePage