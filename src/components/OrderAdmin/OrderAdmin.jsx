import React, { useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Space } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import { SearchOutlined } from '@ant-design/icons'
import InputComponents from '../InputComponents/InputComponents'

// link tới trang --OrderService--
import * as OrderService from '../../services/OrderService'

import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { oderContant } from '../../contant'

const OrderAdmin = () => {

  // lấy token
  const user = useSelector((state) => state.user)

  // hàm dùng để loard dữ liệu lên trên client phía admin
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    // console.log('res', res)
    return res
  }

  // dùng để loard dữ liệu lên trên client phía admin
  const queryOrder = useQuery({ queryKey: ['order'], queryFn: getAllOrder })
  const { isPending: isPendingOrder, data: orders } = queryOrder
  // lúc này đã có dữ liệu thông qua --data: users--
  // console.log('data: users', users)


  // thanh tìm kiếm của --ant thư viện của react--
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponents
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  // dữ liệu trong bảng map với --database-- lấy từ dưới backend
  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.name.length - b.name.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.phone.length - b.phone.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.address.length - b.address.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('address')
    },
    {
      title: 'Items Price',
      dataIndex: 'itemsPrice',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.itemsPrice.length - b.itemsPrice.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('itemsPrice')
    },
    {
      title: 'Shipping Price',
      dataIndex: 'shippingPrice',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.shippingPrice.length - b.shippingPrice.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('shippingPrice')
    },
    {
      title: 'Paided',
      dataIndex: 'isPaid',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('isPaid')
    },
    {
      title: 'Shipped',
      dataIndex: 'isDelivered',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('isDelivered')
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('totalPrice')
    }
  ];

  // chuyển dữ liệu vè dạng rồi cho zo bảng
  const dataTable = orders?.data.length && orders?.data.map((order) => {
    return {
      ...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone,
      address: order?.shippingAddress?.address, paymentMethod: oderContant.payment[order?.paymentMethod],
      isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán', isDelivered: order?.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng',
    }
  })

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>

      <div style={{ marginTop: '20px' }}>
        {/* sau khi đã có dữ liệu thì ta chuyền xuống table */}
        <TableComponent columns={columns} isPending={isPendingOrder} data={dataTable} />
      </div>

    </div>
  )
}

export default OrderAdmin


