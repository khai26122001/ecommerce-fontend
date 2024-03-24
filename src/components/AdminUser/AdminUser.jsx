import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import InputComponents from '../InputComponents/InputComponents'
import { getBase64 } from '../../utils'

// link tới trang --UserService--
import * as UserService from '../../services/UserService'

// link tới trang dùng để lấy dữ liệu dưới backend lên
import { useMutationHooks } from '../../hooks/useMutationHooks'

// lỏa lại trang thì phải
import Loading from '../loadingComponents/Loading'
// link tới trang làm thông báo cho ta biết đã đăng ký thành công
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminUser = () => {

  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenDeleteMany, setIsModalOpenDeleteMany] = useState(false);

  // hiển thị cái lọc --admin hay user--
  const [AA, seta] = useState("TRUE");
  const [BB, setb] = useState("FALSE");

  // thanh tìm kiếm
  const searchInput = useRef(null);

  // lấy token
  const user = useSelector((state) => state.user)

  // tạo --useState-- để chứa dữ liệu dùng để --update--
  const [stateUserDetail, setstateUserDetail] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    avatar: '',
    address: ''
  })

  // này dùng để khi tắt cái khung thêm đi thì dữ liệu thêm trên khung trước đó sẽ mất đi để ta thêm lại cái khác
  const [form] = Form.useForm();


  // bắt đầu làm dữ liệu xuống backend để --update--
  const mutationUpdate = useMutationHooks(
    (data) => {
      // console.log('data1', data)
      const { id, token, ...rests } = data
      const res = UserService.updateUser(id, { ...rests }, token)
      // trả về cái data
      return res
    }
  )

  // bắt đầu làm dữ liệu xuống backend để delete
  const mutationDelete = useMutationHooks(
    (data) => {
      // console.log('data1', data)
      const { id, token } = data
      const res = UserService.deleteUser(id, token)
      // trả về cái data
      return res
    }
  )

  // bắt đầu làm dữ liệu xuống backend để --delete many--
  const mutationDeleteMany = useMutationHooks(
    (data) => {
      // console.log('data1', data)
      // lúc này --ids-- là 1 cái ofject nên ta sẽ ghi như này --...ids--
      const { token, ...ids } = data
      const res = UserService.deleteUserMany(ids, token)
      // trả về cái data
      return res
    }
  )

  // hàm dùng để loard dữ liệu lên trên client phía admin
  const getAllUser = async () => {
    const res = await UserService.getAllUser()
    // console.log('res', res)
    return res
  }

  // lấy dữ liệu --mảng ids-- cần --xóa-- chuyển đến --mutationDeleteMany--
  const handleDeleteManyProduct = (ids) => {
    // console.log('ids', { ids })
    // sau khi nhận được --_id-- thì ta tiến hánh xóa
    mutationDeleteMany.mutate({ ids: ids, token: user?.access_token }, {
      // dùng để loard lại trang khi update----------------
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }

  // tạo cái hàm để hiển thị dữ liệu lên khung để update --tìm kiếm theo id--
  const fetchGetDetailsUser = async () => {
    if (rowSelected) {
      // --rowSelected-- ở đây là id 
      const res = await UserService.getDetailsUser(rowSelected);
      // console.log('res?.data', res)

      // nếu có data thì ta sé --set-- chuyền dữ liệu vào --setstateUserDetail--
      if (res?.data) {
        setstateUserDetail({
          name: res?.data?.name,
          email: res?.data?.email,
          phone: res?.data?.phone,
          isAdmin: res?.data?.isAdmin,
          avatar: res?.data?.avatar,
          address: res?.data?.address,
        });
      }
    }
    setIsPendingUpdate(false)
  }

  // tiến hành --gán-- dữ liệu lên thanh --input-- để -update-- 
  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail]);

  // khi phát hiện có --id và
  // mở cái bảng --update-- lên thì gọi tới hàm --fetchGetDetailsProduct(rowSelected)-- và chuyền id vào
  useEffect(() => {
    // khi có --id và isOpenDrawer==true-- thì ta sẽ --loard-- dữ liệu lên bảng --update--
    if (rowSelected && isOpenDrawer) {
      setIsPendingUpdate(true)
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  // hàm này để hiển thị khi nhấn zo nút xóa hoặc update
  const handleDetailsUser = () => {
    // khi kik vào update thì ta sẽ sét --setIsOpenDrawer-- bằng true
    setIsOpenDrawer(true)
    // console.log('rowSelected', rowSelected)
  }

  // đây là những dữ liệu nhận được từ bên phía --beckend-- thông qua --mutation-- ta đã tạo ở trên
  const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
  const { data: dataDeletedMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany

  // dùng để loard dữ liệu lên trên client phía admin
  const queryUser = useQuery({ queryKey: ['user'], queryFn: getAllUser })
  const { isPending: isPendingUser, data: users } = queryUser
  // lúc này đã có dữ liệu thông qua --data: users--
  // console.log('data: users', users)

  // tạo ra cái biểu tượng --icon-- để xóa và update , khi kik vào sẽ tiền hành xóa và update 
  // thông qua 2 hàm đã tạo : --handleDetailsProduct và setIsModalOpenDelete--
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer', marginRight: '30px' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsUser} />
      </div>
    )
  }

  // nút tìm kiếm
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  // nút reset lại thanh tìm kiếm
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };
  // thanh tìm kiếm của --ant thư viện của react--
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponents
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    // searchedColumn === dataIndex ? (
    //     <Highlighter
    //     highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //     }}
    //     searchWords={[searchText]}
    //     autoEscape
    //     textToHighlight={text ? text.toString() : ''}
    //     />
    // ) : (
    //     text
    // ),
  });
  // dữ liệu trong bảng map với --database-- lấy từ dưới backend
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.name.length - b.name.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.email.length - b.email.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('email')
    },
    {
      title: 'IsAdmin',
      dataIndex: 'isAdmin',

      // Tìm kiếm theo kiểu bằng, hiển thị khi giá trị trùng khớp
      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        }
      ],
      onFilter: (value, record) => {
        // Kiểm tra nếu giá trị bộ lọc là true, trả về true nếu record.isAdmin cũng là true
        if (value === true) {
          return record.isAdmin === AA;
        }
        // Kiểm tra nếu giá trị bộ lọc là false, trả về true nếu record.isAdmin là false
        if (value === false) {
          return record.isAdmin === BB;
        }
      },
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
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];

  // chuyển dữ liệu vè dạng rồi cho zo bảng
  const dataTable = users?.data.length && users?.data.map((user) => {
    return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' }
  })

  // sau khi --update-- thành công phải --xóa-- đi dữ liệu củ đã --update-- để cho nó thành rỗng hết để --update-- lại cái mới
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    // sau khi tạo thành công thì phải xóa đi cái dữ liệu đã thêm để cho nó thành rỗng hết để thêm lại cái mới
    setstateUserDetail({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
      avatar: '',
      address: ''
    });
    // này dùng để khi tắt cái khung thêm đi thì dữ liệu thêm trên khung trước đó sẽ mất đi để ta thêm lại cái khác
    form.resetFields();
  };

  // dùng để hiển thị dòng chữ --bạn có chắc muốn xóa hay không
  // nếu muốn chắn chắn xóa thì nhắn --OK-- để xóa và tắt cái bảng đi
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleCancelDeleteMany = () => {
    setIsModalOpenDeleteMany(false);
  };

  // lấy dữ liệu cần --xóa-- chuyển đến --mutationDelete--
  const handleDeleteUser = () => {
    mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
      // dùng để loard lại trang khi update----------------
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }

  const handleDeleteUserMany = () => {

  }

  // sử dụng để gọi tới hàm và in ra thông báo --update-- thành công hay thất bại
  useEffect(() => {
    // nếu isSuccess===true
    // console.log('isSuccessUpdated', isSuccessUpdated)
    // console.log('dataUpdated?.status', dataUpdated?.status)
    // console.log('dataUpdated', dataUpdated)
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      // thông báo thành công
      message.success()
      // rồi đóng cái khung thêm lại
      handleCloseDrawer()
    }
    else if (isErrorUpdated) {
      message.error()
    }
  }, [isErrorUpdated, isSuccessUpdated])

  // sử dụng để gọi tới hàm và in ra thông báo --xóa-- thành công hoặc thấ bại
  useEffect(() => {
    // nếu isSuccess===true
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      // thông báo thành công
      message.success()
      // rồi đóng cái khung thêm lại
      handleCancelDelete()
    }
    else if (isErrorDeleted) {
      message.error()
    }
  }, [isErrorDeleted, isSuccessDeleted])

  // sử dụng để gọi tới hàm và in ra thông báo --delete many-- thành công hay thấ bại
  useEffect(() => {
    // nếu isSuccess===true
    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      // thông báo thành công
      message.success()
    }
    else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isErrorDeletedMany, isSuccessDeletedMany])

  // hàm này dùng để --gán-- dữ liệu từ --thanh input-- vào các biến --của stateUserDetail--
  const handleOnchangeDetail = (e) => {
    // console.log('e.target.name', e.target, e.target.value)
    setstateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value
    })
  }

  // hàm này dùng để chuyển image sang dạng --base64--
  // và --gán-- dữ liệu --image-- vào biến -- image của stateUserDetail --
  const handleOnchangeAvatarDetail = async ({ fileList }) => {
    // nó sẽ là 1 cái --array--
    const file = fileList[0]
    // giờ ta phải chuyển sang dạng --base64-- để lưu lên --mongo--
    // ta sẽ check cái chuyển đổi sang --base64-- bên phía --util--
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    // sau khi đã chuyển đổi thì ta sẽ chuyển dữ liệu ảnh --base64-- vào --setAvatar--
    setstateUserDetail({
      // giữ lại những thằng của --stateUser-- 
      ...stateUserDetail,
      // và chỉ thay đổi
      avatar: file.preview
    })
  }

  // bắt đầu update ------------------
  const onUpdateUser = () => {
    mutationUpdate.mutate({ id: rowSelected, ...stateUserDetail, token: user?.access_token }, {
      // dùng để loard lại trang khi update----------------
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }
  // console.log('user11', user)
  // console.log('stateUserDetail', stateUserDetail)
  // console.log('rowSelected', rowSelected)


  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>

      <div style={{ marginTop: '20px' }}>
        {/* sau khi đã có dữ liệu thì ta chuyền xuống table */}
        <TableComponent columns={columns} handleDeleteManyProduct={handleDeleteManyProduct} isPending={isPendingUser} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id)
            },
          };
        }} />
      </div>

      {/* onOk={handleOk} ----forceRender--- thêm vào cho khỏi bị lỗi   */}
      <DrawerComponent title='Chi Tiết Người Dùng' forceRender isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isPending={isPendingUpdate || isPendingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateUser}
            autoComplete="on"
            // này dùng để khi tắt cái khung thêm đi thì dữ liệu thêm trên khung trước đó sẽ mất đi để ta thêm lại cái khác
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input yor Name' }]}
            >
              <InputComponents value={stateUserDetail['name']} onChange={handleOnchangeDetail} name="name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input yor email' }]}
            >
              <InputComponents value={stateUserDetail['email']} onChange={handleOnchangeDetail} name="email" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input yor phone' }]}
            >
              <InputComponents value={stateUserDetail.phone} onChange={handleOnchangeDetail} name="phone" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input yor address' }]}
            >
              <InputComponents value={stateUserDetail.address} onChange={handleOnchangeDetail} name="address" />
            </Form.Item>

            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[{ required: true, message: 'Please input yor Image' }]}
            >

              <WrapperUploadFile fileList={stateUserDetail.avatar ? [{ uid: '-1', url: stateUserDetail.avatar }] : []} onChange={handleOnchangeAvatarDetail} maxCount={1}>
                <Button>Select File</Button>

                {stateUserDetail?.avatar && (
                  <img src={stateUserDetail?.avatar} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="image" />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>

          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent title="Xóa Người Dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
        <Loading isPending={isPendingDeleted}>
          <div>Bạn có chắc muốn xóa tài khoản này hay không</div>
        </Loading>
      </ModalComponent>

      <ModalComponent title="Xóa Nhiều Người Dùng" open={isModalOpenDeleteMany} onCancel={handleCancelDeleteMany} onOk={handleDeleteUserMany}>
        <Loading isPending={isPendingDeleted}>
          <div>Bạn có chắc muốn xóa tài khoản này hay không</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminUser


