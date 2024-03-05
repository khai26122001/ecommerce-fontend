import React, { useState } from 'react'
import { WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemOrderInfo } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'

import { useSelector } from 'react-redux';
import { Checkbox } from 'antd';

import Loading from '../../components/loadingComponents/Loading';
import { useLocation } from 'react-router-dom';
import { oderContant } from '../../contant';
import { convertPrice } from '../../utils';


const OrderSuccess = () => {

  // lấy ra cái thằng order hiển thị lên cái thanh giỏ hàng có bao nhiêu sản phẩm
  const order = useSelector((state) => state.order)

  // lấy ra cái thằng user ra để bắt đầu thanh toán
  const user = useSelector((state) => state.user)

  // lấy dữ liệu chuyền qua từ --navigate-- bên phía --PaymentPage.jsx--
  // lúc này nhậc đưỡc dữ liệu gửi qua kèm theo --pathName--
  const location = useLocation()
  console.log('location', location)
  // sau khi kiểm tra có gì rồi lấy dữ liệu ra
  const { state } = location

  // tạo ra để chứa --id--
  const [listChecked, setListChecked] = useState([state?.orders?.product])


  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <Loading isPending={false}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h3>Đớn Hàng Đã Đặt Thành Công</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <label>Phương Thức Giao Hàng</label>
                  <WrapperValue>
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{oderContant.delivery[state?.delivery]}</span> Giao Hàng Tiết Kiệm
                  </WrapperValue>
                </div>
              </WrapperInfo>

              <WrapperInfo>
                <label>Phương Thức Thanh Toán</label>
                <WrapperValue>
                  {oderContant.payment[state?.payment]}
                </WrapperValue>
              </WrapperInfo>

              <WrapperItemOrderInfo >
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder >
                      <div style={{ width: '400px', display: 'flex', alignItems: 'center', gap: 4, marginLeft: '150px' }}>
                        {/* khi clik vào thì sẽ hiển thị ra id thông qua value={order?.product}  */}
                        {/* checked={listChecked.includes(order?.product): hiển thị khi kik vào toàn bộ thì sẽ truyền id zo */}
                        {/* hiển thị bằng hàm --onChange-- từ hàm  */}
                        {/* onChange={onChange}   */}

                        <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover', marginRight: '20px', marginLeft: '20px' }} />
                        <div style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Giá Tiền: &nbsp; {convertPrice(order?.price)}</span>
                        </span>

                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Số Lượng: &nbsp; {order?.amount}</span>
                        </span>

                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>

              <span>
                <span style={{ fontSize: '13px', color: '#242424', color: 'red' }}>Tổng Tiền: &nbsp; {convertPrice(state?.totalPriceMemo)}</span>
              </span>

            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  )
}

export default OrderSuccess