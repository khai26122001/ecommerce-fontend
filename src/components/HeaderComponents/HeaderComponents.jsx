// Import React và các thành phần cần thiết từ thư viện Ant Design
import React, { useEffect, useState } from 'react'
// thư viện dùng thanh input search
import Search from 'antd/es/input/Search'
// phân chia chiều ngang thành 24 phần dùng đẻ chia khung từ thư viện --'antd'--
import { Badge, Col, Image, Popover } from 'antd'
// các tên trùng với tên bên phía css lấy qua thông qua --'./style'--
import { WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall, WrapperContentPopup, WrapperHeaderAo } from './style'
// này là các icon lấy trên các trang khác thông qua thư viện --'@ant-design/icons'--
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

// chuyển trang thì phải
import { useNavigate, useParams } from 'react-router-dom';

// thư viện dùng để xuất dữ liệu đã được xử lý từ --UserSlide.js-- ra
import { useDispatch, useSelector } from 'react-redux';
// import { click } from '@testing-library/user-event/dist/click';

// import thu viện userService vào
import * as UserService from '../../services/UserService'

// sau khi --login-- thành công thi add thư viện này zo n
// dùng để lấy thông tin của user
// import { useDispatch } from 'react-redux'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../loadingComponents/Loading';
import { searchProduct } from '../../redux/slides/productSlide';

import logoo from '../../assets/images/LOGOO.webp'

// Functional component cho phần Header
const HeaderComponents = ({ isHiddenSearch = false, isHiddenCart = false }) => {

    // lấy ra cái thằng order hiển thị lên cái thanh giỏ hàng có bao nhiêu sản phẩm
    const order = useSelector((state) => state.order)

    // tạo ra 1 cái function để khi kik vào nó link tới trang đăng nhập
    const navigate = useNavigate()

    // lấy địa chỉ trên thanh url
    const param = useParams()
    console.log('param', param)


    // dùng để xuất dữ liệu đã được xử lý từ --UserSlide.js-- ra
    const user = useSelector((state) => state.user)
    // console.log('user', user)

    // dùng để logout
    const dispatch = useDispatch()

    // dùng để isPending
    const [pending, setPending] = useState(false)

    // --dùng cho cái khi thay đổi tên nó sẽ cập nhật lại--
    const [userName, setUserName] = useState('')

    // --dùng cho cái khi thay đổi ảnh nó sẽ cập nhật lại--
    const [userAvatar, setUserAvatar] = useState('')

    // --dùng cho cái tìm kím
    const [search, setSearch] = useState('')

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    // hàm --handleLogout-- dùng để
    const handleLogout = async () => {
        setPending(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setPending(false)
    }

    //-----------------
    // khi cái --user?.name-- thay đổi thì ta sẽ reloard lại trang để cho cái tên hiển thị trên thanh --header-- thay đổi theo
    useEffect(() => {
        // để nó bằng true
        setPending(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        // sau khi sét xong thì để bằng false
        setPending(false)
    }, [user?.name, user?.avatar])

    //-----------------



    // khi kik vào sẽ hiển thị chữ --đăng xuất và thông tin người dùng--
    const content = (
        <div>
            <WrapperContentPopup onClick={() => hanldeClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>

            {/* nếu --isAdmin-- bằng --true-- thì hiển thị cái này */}
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => hanldeClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => hanldeClickNavigate('my-order')}>Đơn hàng của tôi</WrapperContentPopup>
            <WrapperContentPopup onClick={() => hanldeClickNavigate()}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    // dùng để quản lý các sự kiện link tới trang cho dễ quản lý
    const hanldeClickNavigate = (type) => {
        if (type === 'profile') {
            navigate('/profile-user')
        } else if (type === 'admin') {
            navigate('/system/admin')
        } else if (type === 'my-order') {
            navigate('/my-order', {
                state: {
                    id: user?.id,
                    token: user?.access_token
                }
            })
        } else {
            handleLogout()
        }
    }


    // hàm của thanh tìm kiếm
    const onSearch = (e) => {
        setSearch(e.target.value)
        // ở đay ta sẽ dùng --dispatch()-- để link tới trang --productSlise--
        dispatch(searchProduct(e.target.value))
        // console.log('e', e.target.value)
    }


    return (
        <div style={{ width: '100%', background: 'rgb(26, 148, 255)', justifyContent: 'center' }}>

            {/* nay cho thanh cuốn header có thể duy chuyển dx */}
            <WrapperHeaderAo></WrapperHeaderAo>

            {/* Wrapper chứa các thành phần trong Header */}
            {/* 
                khi --isHiddenSearch && isHiddenCart-- bằng --true-- thì ta dùng thuộc tính --'space-between'--
                ko thì ta dùng --'unset'--
                // cho cái tên --Admin-- bên trang --Admin-- nằm bên góc phải

            */}
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                {/* --chiều ngang col gồm 24 nên mình sẽ chia theo ý muốn miễn là đủ 24 là được-- */}

                {/* Cột chứa logo hoặc text header */}
                <Col span={5}>
                    <WrapperTextHeader onClick={() => navigate('/')} >
                        <div style={{ marginTop: '-50px' }}>
                            <Image key='logoo' src={logoo} alt="logoo" preview={false} width="150px" height="40px" />
                        </div>
                    </WrapperTextHeader>
                </Col>


                {/* nếu bằng false thì hiện còn bằng true thì ẩn đi */}
                {!isHiddenSearch && (
                    // Cột chứa ô tìm kiếm
                    <Col span={13}>
                        {/* trang chỉnh css cho cái tìm kiếm */}
                        <ButtonInputSearch
                            size="large"
                            textButton="Tìm kiếm"
                            placeholder="input search text"
                            bordered={false}
                            onChange={onSearch}
                        />
                    </Col>
                )}


                {/* Cột chứa các thành phần đăng nhập, đăng ký, giỏ hàng */}
                <Col span={6} style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <Loading isPending={pending}>
                        <WrapperHeaderAccout>

                            {/* nếu tồn tại --avatar-- thì hiển thị còn ko thì hiển thị --icon-- */}
                            {userAvatar ? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height: '35px',
                                    width: '35px',
                                    borderRadius: '50%',
                                    objectFit: 'cover', marginLeft: '80px'
                                }} />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px', marginLeft: '40px' }} />
                            )}


                            {/* check nếu --access_token-- không có */}
                            {user?.access_token ? (
                                <>
                                    {/* hiển thị nút --khi bấm vào user name được hiển thị sẽ hiển thị --logout---- */}
                                    <Popover content={content} trigger="click" >
                                        {/* khi đăng nhập vào sẽ có được cái --user(name)-- */}
                                        <div style={{ cursor: 'pointer', color: '#ffff' }}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                // khi kik vào cái --đăng nhập/ đăng ký-- thì sẽ thông qua --onClick-- từ cái hàm --handleNavigateLogin--
                                // mình tạo ở trên để link tới trang đăng nhập
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    {/* Text đăng nhập/đăng ký */}
                                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                                    <div>
                                        {/* Text tài khoản và biểu tượng mũi tên xuống */}
                                        <WrapperTextHeaderSmall>Tài khoảng</WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </WrapperHeaderAccout>
                    </Loading>


                    {!isHiddenCart && (
                        // Thanh giỏ hàng
                        // khi kik vào thì sẽ chuyển đến trang --order--
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                            {/* Badge: dùng để hiển thị số lượng hàn trên icon giỏ hàng */}
                            <Badge count={order?.orderItems?.length >= 1 ? order?.orderItems?.length : "O"} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall style={{ cursor: 'pointer', color: '#ffff' }}>Giỏ hàng</WrapperTextHeaderSmall>
                        </div>
                    )}

                </Col>
            </WrapperHeader>

        </div>
    )
}

export default HeaderComponents