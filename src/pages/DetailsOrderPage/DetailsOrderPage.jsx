import React from 'react'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent, WrapperLableText, WrapperContent, WrapperTextPrice } from './style'
import { useLocation, useParams } from 'react-router-dom'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { oderContant } from '../../contant'
import { convertPrice } from '../../utils'
import { useMemo } from 'react'
import Loading from '../../components/loadingComponents/Loading'
import { Col, Row } from 'antd'
import { Checkbox, Rate } from "antd"

const DetailsOrderPage = () => {
    const params = useParams()
    const location = useLocation()
    const { state } = location
    const { id } = params
    console.log('state ---', state)
    console.log('id ---', id)

    const fetchDetailsOrder = async () => {
        const res = await OrderService.getDetailsOrder(id, state?.token)
        return res.data
    }

    const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder, config: { enable: id } })
    const { isPending, data } = queryOrder
    console.log('data11', data)

    const priceMemo = useMemo(() => {
        const result = data?.orderItems?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [data])



    const renderContent = (type, options) => {
        switch (type) {
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px', marginBottom: '15px' }}  >
                        {options.map((option, index) => {
                            return (
                                <Checkbox key={index} style={{ marginLeft: 0 }} value={option.value}>{option.label} Lựa Chọn</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option, index) => {
                    return (
                        <div key={index} style={{ display: 'flex' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span>&emsp; {`từ ${option} sao`} </span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option, index) => {
                    return (
                        <WrapperTextPrice style={{ marginBottom: '-20px' }} key={index}>{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }



    return (
        <Loading isPending={isPending}>
            <Row style={{ flexWrap: 'nowrap', height: 'calc(100% - 20px)', marginBottom: '15px' }}>
                <Col span={4} style={{ borderRight: '1px solid #EDEDED' }}>
                    <div style={{ marginLeft: '20px' }}>
                        <WrapperLableText style={{ marginTop: '25px' }}>Lable</WrapperLableText>

                        <WrapperContent>
                            {renderContent('checkbox', [
                                { value: 'a', lable: 'A' },
                                { value: 'b', lable: 'B' }
                            ])}
                        </WrapperContent>
                        <WrapperContent>
                            {renderContent('star', [3, 4, 5])}
                        </WrapperContent>
                        <WrapperContent>
                            {renderContent('price', ['Dưới 40', 'Trên 50.000'])}
                        </WrapperContent>
                    </div>

                </Col>

                <Col span={20}>
                    <div style={{ width: '100%', height: '100%', background: '#f5f5fa' }} >
                        <div style={{ width: '100%', margin: '0 auto', height: '100%', marginBottom: '15px' }}>
                            <br />
                            <h2 style={{ marginLeft: '20px' }}>Chi tiết đơn hàng</h2>
                            <br />
                            <WrapperHeaderUser>

                                <WrapperInfoUser style={{ marginLeft: '20px' }}>
                                    <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
                                    <WrapperContentInfo>
                                        <div className='name-info'>{data?.shippingAddress?.fullName}</div>
                                        <div className='address-info'><span>Địa chỉ: </span> {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}</div>
                                        <div className='phone-info'><span>Điện thoại: </span> {data?.shippingAddress?.phone}</div>
                                    </WrapperContentInfo>
                                </WrapperInfoUser>

                                <WrapperInfoUser>
                                    <WrapperLabel>Hình thức giao hàng</WrapperLabel>
                                    <WrapperContentInfo>
                                        <div className='delivery-info'><span className='name-delivery'>FAST </span>Giao hàng tiết kiệm</div>
                                        <div className='delivery-fee'><span>Phí giao hàng: </span> {data?.shippingPrice}</div>
                                    </WrapperContentInfo>
                                </WrapperInfoUser>

                                <WrapperInfoUser style={{ marginRight: '40px' }}>
                                    <WrapperLabel>Hình thức thanh toán</WrapperLabel>
                                    <WrapperContentInfo>
                                        <div className='payment-info'>{oderContant.payment[data?.paymentMethod]}</div>
                                        <div className='status-payment'>{data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                                    </WrapperContentInfo>
                                </WrapperInfoUser>

                            </WrapperHeaderUser>
                            <WrapperStyleContent style={{ marginLeft: '20px' }}>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ width: '670px' }}>Sản phẩm</div>
                                    <WrapperItemLabel>Giá</WrapperItemLabel>
                                    <WrapperItemLabel>Số lượng</WrapperItemLabel>
                                    <WrapperItemLabel>Giảm giá</WrapperItemLabel>
                                </div>
                                {data?.orderItems?.map((order, index) => {
                                    return (
                                        <WrapperProduct key={index}>
                                            <WrapperNameProduct>
                                                <img src={order?.image}
                                                    style={{
                                                        width: '70px',
                                                        height: '70px',
                                                        objectFit: 'cover',
                                                        border: '1px solid rgb(238, 238, 238)',
                                                        padding: '2px'
                                                    }}
                                                />
                                                <div style={{
                                                    width: 260,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    marginLeft: '10px',
                                                    height: '70px',
                                                }}>&nbsp; Tên Sản Phẩm: &nbsp;<span style={{ color: 'red' }}>{order?.name}</span></div>
                                            </WrapperNameProduct>
                                            <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                                            <WrapperItem>{order?.amount}</WrapperItem>
                                            <WrapperItem>{order?.discount ? convertPrice(priceMemo * order?.discount / 100) : '0 VND'}</WrapperItem>


                                        </WrapperProduct>
                                    )
                                })}

                                <WrapperAllPrice>
                                    <WrapperItemLabel>Tạm tính</WrapperItemLabel>
                                    <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
                                </WrapperAllPrice>
                                <WrapperAllPrice>
                                    <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
                                    <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
                                </WrapperAllPrice>
                                <WrapperAllPrice>
                                    <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
                                    <WrapperItem><WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem></WrapperItem>
                                </WrapperAllPrice>
                            </WrapperStyleContent>
                        </div>
                    </div>
                </Col>
            </Row>

        </Loading >
    )
}

export default DetailsOrderPage