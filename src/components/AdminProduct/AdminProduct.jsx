import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Select, Space } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import InputComponents from '../InputComponents/InputComponents'
import { getBase64, renderOption } from '../../utils'

// ckeditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


// link tới trang --UserService--
import * as ProductService from '../../services/ProductService'

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

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

    // dùng cho cái type của create
    const [typeSelect, setTypeSelect] = useState('');

    // thanh tìm kiếm
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    // lấy token
    const user = useSelector((state) => state.user)

    // tạo ra cái này nhắm tránh cho khi update mình bấm zo lại create thì dữ liệu nó vẫn còn đổ lên create
    const inittial = () => (
        {
            name: '',
            image: '',
            type: '',
            countInStock: '',
            price: '',
            rating: '',
            description: '',
            newType: '',
            discount: ''
        }
    )

    // ----củ
    // tạo --useState-- để chứa dữ liệu dùng để --create--
    // const [stateProduct, setStateProduct] = useState({
    //     name: '',
    //     image: '',
    //     type: '',
    //     countInStock: '',
    //     price: '',
    //     rating: '',
    //     description: '',
    //     newType: '',
    //     discount: ''
    // })

    //---mới
    // tạo ra cái này nhắm tránh cho khi update mình bấm zo lại create thì dữ liệu nó vẫn còn đổ lên create
    const [stateProduct, setStateProduct] = useState(inittial())


    // tạo --useState-- để chứa dữ liệu dùng để --update--
    const [stateProductDetail, setStateProductDetail] = useState({
        name: '',
        image: '',
        type: '',
        countInStock: '',
        price: '',
        rating: '',
        description: '',
        discount: ''

    })

    // này dùng để khi tắt cái khung thêm đi thì dữ liệu thêm trên khung trước đó sẽ mất đi để ta thêm lại cái khác
    const [form] = Form.useForm();

    // bắt đầu làm dữ liệu xuống backend để --create--
    const mutation = useMutationHooks(
        (data) => {
            const { name, image, type, countInStock, price, rating, description, discount } = data
            const res = ProductService.createProduct({ name, image, type, countInStock, price, rating, description, discount })
            // trả về cái data
            return res
        }
    )

    // bắt đầu làm dữ liệu xuống backend để --update--
    const mutationUpdate = useMutationHooks(
        (data) => {
            // console.log('data1', data)
            const { id, token, ...rests } = data
            const res = ProductService.updateProduct(id, token, { ...rests })
            // trả về cái data
            return res
        }
    )

    // bắt đầu làm dữ liệu xuống backend để --delete--
    const mutationDelete = useMutationHooks(
        (data) => {
            // console.log('data1', data)
            const { id, token } = data
            const res = ProductService.deleteProduct(id, token)
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
            const res = ProductService.deleteProductMany(ids, token)
            // trả về cái data
            return res
        }
    )

    // hàm dùng để loard dữ liệu lên trên client phía admin
    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        // console.log('res', res)
        return res
    }

    // lấy dữ liệu --mảng ids-- cần --xóa-- chuyển đến --mutationDeleteMany--
    const handleDeleteManyProduct = (ids) => {
        // console.log('ids', { ids })
        mutationDeleteMany.mutate({ ids: ids, token: user?.access_token }, {
            // dùng để loard lại trang khi --delete many-- thành công
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    // tạo cái hàm để hiển thị dữ liệu lên khung để update --tìm kiếm theo id--
    const fetchGetDetailsProduct = async (rowSelected) => {
        // nếu tồn tại --_id-- thì thực hiện
        if (rowSelected) {
            // --rowSelected-- ở đây là id
            // thực hiện lấy dữ liệu thông qua --id-- rồi gán dữ liệu vào  --setStateProductDetail--
            const res = await ProductService.getDetailProduct(rowSelected);
            // console.log('res?.data', res)

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
                    discount: res?.data?.discount,
                });
            }
        }
        setIsPendingUpdate(false)
    }

    // tiến hành --gán-- dữ liệu lên thanh --input-- để -update--  
    useEffect(() => {
        // khi đóng thì reset nó
        if (!isModalOpen) {
            form.setFieldsValue(stateProductDetail);
        } else {
            //  còn khi mở ra tức bằng true
            form.setFieldsValue(inittial());
        }
    }, [form, stateProductDetail, isModalOpen]);

    // khi phát hiện có --id và
    // mở cái bảng --update-- lên thì gọi tới hàm --fetchGetDetailsProduct(rowSelected)-- và chuyền id vào
    useEffect(() => {
        // khi có --id và isOpenDrawer==true-- thì ta sẽ --loard-- dữ liệu lên bảng --update--
        if (rowSelected && isOpenDrawer) {
            setIsPendingUpdate(true)
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    // hàm này dùng để hiển thị cái bảng update lên
    const handleDetailsProduct = () => {
        // khi kik vào --icon-- update thì ta sẽ sét --setIsOpenDrawer(true)-- tương đương với việc mở cái bảng update lên
        setIsOpenDrawer(true)
        // console.log('rowSelected', rowSelected)
    }


    // hiển thị cái type của product
    // getAllTypeProduct
    // dùng để hiển thị type sản phẩm
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        return res
    }

    // đây là những dữ liệu nhận được từ bên phía --beckend-- thông qua --mutation-- ta đã tạo ở trên
    const { data, isPending, isSuccess, isError } = mutation
    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const { data: dataDeletedMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany


    // dùng để load dữ liệu type
    const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })
    console.log('typeProduct', typeProduct)

    // dùng để loard dữ liệu lên trên client phía admin
    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    const { isPending: isPendingProduct, data: products } = queryProduct
    // lúc này đã có dữ liệu thông qua --data: products--
    // console.log('data: products', products)


    // tạo ra cái biểu tượng --icon-- để xóa và update , khi kik vào sẽ tiền hành xóa và update 
    // thông qua 2 hàm đã tạo : --handleDetailsProduct và setIsModalOpenDelete--
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer', marginRight: '30px' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
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
            title: 'Price',
            dataIndex: 'price',
            // dùng để sắp xếp theo Price
            sorter: (a, b) => a.price - b.price,

            // tìm kiếm theo kiểu bẳng khi kik zo cái nào thì hiển thị cái đó
            filters:
                [
                    {
                        text: '>= 50',
                        value: '>=',
                    },
                    {
                        text: '<= 50',
                        value: '<=',
                    }
                ],
            onFilter: (value, record) => {
                console.log('vlaue11', { value, record })
                if (value === '>=') {
                    return record.price >= 50
                }
                return record.price <= 50
            },

        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            // dùng để sắp xếp theo rating
            sorter: (a, b) => a.rating - b.rating,

            // tìm kiếm theo kiểu bẳng khi kik zo cái nào thì hiển thị cái đó
            filters:
                [
                    {
                        text: '>= 3',
                        value: '>=',
                    },
                    {
                        text: '<= 3',
                        value: '<=',
                    }
                ],
            onFilter: (value, record) => {
                // console.log ('vlaue', {value, record})
                if (value === '>=') {
                    return record.rating >= 3
                }
                return record.rating <= 3
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];

    // chuyển dữ liệu vào bảng và  --key: product._id-- nghĩa là khi kik vào thì sẽ có --_id--
    const dataTable = products?.data.length && products?.data.map((product) => {
        return { ...product, key: product._id }
    })

    // sau khi --update-- thành công phải --xóa-- đi dữ liệu củ đã --update-- để cho nó thành rỗng hết để --update-- lại cái mới
    const handleCloseDrawer = () => {
        // tắt đi cái bảng --update--
        setIsOpenDrawer(false);
        // cho dữ liệu trong bảng thành rổng
        setStateProductDetail({
            name: '',
            image: '',
            type: '',
            countInStock: '',
            price: '',
            rating: '',
            description: '',
            discount: '',
        });
        // reset lại bảng --update-- lúc này bảng đã rổng
        form.resetFields();
    };

    // dùng để hiển thị dòng chữ --bạn có chắc muốn xóa hay không
    // nếu muốn chắn chắn xóa thì nhắn --OK-- để xóa và tắt cái bảng đi
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };



    // lấy dữ liệu cần --xóa-- chuyển đến --mutationDelete--
    const handleDeleteProduct = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            // dùng để loard lại trang khi --delete-- thành công
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    // // sau khi --create-- thành công phải --xóa-- đi dữ liệu củ đã --create-- để cho nó thành rỗng hết để --create-- lại cái mới
    const handleCancel = () => {
        // tắt đi cái bảng --create--
        setIsModalOpen(false);
        // cho dữ liệu trong bảng thành rổng
        setStateProduct({
            name: '',
            image: '',
            type: '',
            countInStock: '',
            price: '',
            rating: '',
            description: '',
            discount: '',
        });
        // reset lại có form khi này dữ liệu đã chống
        form.resetFields();
    };

    // sử dụng để gọi tới hàm và in ra thông báo --create-- thành công hay thất bại
    useEffect(() => {
        // nếu isSuccess===true
        if (isSuccess && data?.status === 'OK') {
            // thông báo thành công
            message.success()
            // rồi đóng cái khung thêm lại
            handleCancel()
        }
        else if (isError) {
            message.error()
        }
    }, [isError, isSuccess])


    // sử dụng để gọi tới hàm và in ra thông báo --delete-- thành công hay thất bại
    useEffect(() => {
        // nếu bằng --true và OK--
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            // thông báo thành công
            message.success()
            // rồi đóng cái khung thêm lại
            handleCancelDelete()
        }
        else if (isError) {
            // thông báo thất bại
            message.error()
        }
    }, [isErrorDeleted, isSuccessDeleted])


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


    // sử dụng để gọi tới hàm và in ra thông báo --delete many-- thành công hay thấ bại
    useEffect(() => {
        // nếu bằng --true và OK--
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            // thông báo thành công
            message.success()
        }
        else if (isErrorDeletedMany) {
            // thông báo thất bại
            message.error()
        }
    }, [isErrorDeletedMany, isSuccessDeletedMany])


    // lấy dữ liệu cần --thêm-- chuyển đến --mutation--
    const onFinish = () => {
        // này cho thêm type
        const params = {
            name: stateProduct.name,
            image: stateProduct.image,
            type: stateProduct.type === 'Add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
            price: stateProduct.price,
            rating: stateProduct.rating,
            description: stateProduct.description,
            discount: stateProduct.discount,
        }

        mutation.mutate(params, {
            // dùng để loard lại trang khi --create-- thành công
            onSettled: () => {
                queryProduct.refetch()
            }
        })
        // console.log('Finish', stateProduct)
    }

    // hàm này dùng để --gán-- dữ liệu từ --thanh input-- vào các biến --của stateProduct--
    const handleOnchange = (e) => {
        // console.log('e.target.name', e.target, e.target.value)
        setStateProduct({
            // giữ lại những thằng của --stateProduct-- 
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    // hàm này dùng để --gán-- dữ liệu từ --thanh input-- vào các biến --của stateProductDetail--
    const handleOnchangeDetail = (e) => {
        // console.log('e.target.name', e.target, e.target.value)
        setStateProductDetail({
            // giữ lại những thằng của --stateProductDetail-- 
            ...stateProductDetail,
            [e.target.name]: e.target.value
        })
    }

    // hàm này dùng để chuyển image sang dạng --base64--
    // và --gán-- dữ liệu --image-- vào biến -- image của stateProduct --
    const handleOnchangeAvatar = async ({ fileList }) => {
        // nó sẽ là 1 cái --array--
        const file = fileList[0]
        // giờ ta phải chuyển sang dạng --base64-- để lưu lên --mongo--
        // ta sẽ check cái chuyển đổi sang --base64-- bên phía --util--
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        // sau khi đã chuyển đổi thì ta sẽ chuyển dữ liệu ảnh --base64-- vào --setAvatar--
        setStateProduct({
            // giữ lại những thằng của --stateProduct-- 
            ...stateProduct,
            // và chỉ thay đổi
            image: file.preview
        })
    }

    // hàm này dùng để chuyển image sang dạng --base64--
    // và --gán-- dữ liệu --image-- vào biến -- image của stateProductDetail --
    const handleOnchangeAvatarDetail = async ({ fileList }) => {
        // nó sẽ là 1 cái --array--
        const file = fileList[0]
        // giờ ta phải chuyển sang dạng --base64-- để lưu lên --mongo--
        // ta sẽ check cái chuyển đổi sang --base64-- bên phía --util--
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        // sau khi đã chuyển đổi thì ta sẽ chuyển dữ liệu ảnh --base64-- vào --setAvatar--
        setStateProductDetail({
            // giữ lại những thằng của --stateProductDetail-- 
            ...stateProductDetail,
            // và chỉ thay đổi
            image: file.preview
        })
    }

    // lấy dữ liệu cần --update-- chuyển đến --mutationUpdate--
    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetail }, {
            // dùng để loard lại trang khi --update-- thành công
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    // console.log('user11', user)
    // console.log('stateProductDetail', stateProductDetail)
    // console.log('rowSelected', rowSelected)

    // hàm xử lý type trong create
    const handleChangeSelect = (value) => {
        setStateProduct({
            // giữ nguyên cái stateProduct
            ...stateProduct,
            // và chỉ thay đổi
            type: value
        })
    }


    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
            </div>

            <div style={{ marginTop: '20px' }}>
                {/* sau khi đã có dữ liệu thì ta chuyền xuống table */}
                {/* --data={dataTable}-- để gán --_id-- cho từng cái khi mình kik zo sẽ có dx id của nó */}
                <TableComponent handleDeleteManyProduct={handleDeleteManyProduct} columns={columns} isPending={isPending} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        },
                    };
                }} />
            </div>

            {/* onOk={handleOk} ----forceRender--- thêm vào cho khỏi bị lỗi   */}
            <ModalComponent title="Tạo sản phẩm" forceRender open={isModalOpen} onCancel={handleCancel} footer={null} >
                <Loading isPending={isPending}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        autoComplete="on"

                        // này dùng để khi tắt cái khung thêm đi thì dữ liệu thêm trên khung trước đó sẽ mất đi để ta thêm lại cái khác
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input yor Name' }]}
                        >
                            <InputComponents value={stateProduct['name']} onChange={handleOnchange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input yor Type' }]}
                        >

                            <Select
                                name="type"
                                value={stateProduct.type}
                                onChange={handleChangeSelect}
                                options={renderOption(typeProduct?.data?.data)}
                            />
                        </Form.Item>

                        {/* khi ta muốn thêm --type-- thì sẽ có add_type lúc này sẽ hiện --InputComponents-- để thêm */}
                        {stateProduct.type === 'Add_type' && (
                            <Form.Item
                                label="New type"
                                name="newType"
                                rules={[{ required: true, message: 'Please input yor Type' }]}
                            >
                                {/* khi ta muốn thêm --type-- thì sẽ có add_type lúc này sẽ hiện --InputComponents-- để thêm */}
                                <InputComponents value={stateProduct.newType} onChange={handleOnchange} name="newType" />
                            </Form.Item>
                        )}



                        <Form.Item
                            label="Count InStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input yor Count InStock' }]}
                        >
                            <InputComponents value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input yor Price' }]}
                        >
                            <InputComponents value={stateProduct.price} onChange={handleOnchange} name="price" />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input yor Rating' }]}
                        >
                            <InputComponents value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                        </Form.Item>

                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input yor discount' }]}
                        >
                            <InputComponents value={stateProduct.discount} onChange={handleOnchange} name="discount" />
                        </Form.Item>

                        {/* <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input yor Description' }]}
                        >
                            <InputComponents value={stateProduct.description} onChange={handleOnchange} name="description" />
                        </Form.Item> */}


                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your Description' }]}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                data={stateProduct.description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setStateProduct(prevState => ({
                                        ...prevState,
                                        description: data
                                    }));
                                }}
                                value={stateProduct.description}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input yor Image' }]}
                        >
                            {/* này dùng để xử lý --hình ảnh-- */}
                            {/* maxCount={1}: dùng để hiển thị 1 hình ảnh lên thôi */}
                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                <Button>Select File</Button>

                                {/* mình sẽ check nếu nó có --avatar-- thì ta sẽ hiển thị ra */}
                                {stateProduct?.image && (
                                    <img src={stateProduct?.image} style={{
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
                                Create
                            </Button>
                        </Form.Item>

                    </Form>
                </Loading>
            </ModalComponent>

            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <Loading isPending={isPendingUpdate || isPendingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateProduct}
                        autoComplete="on"
                        // này dùng để khi tắt cái khung thêm đi thì dữ liệu thêm trên khung trước đó sẽ mất đi để ta thêm lại cái khác
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input yor Name' }]}
                        >
                            <InputComponents value={stateProductDetail['name']} onChange={handleOnchangeDetail} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input yor Type' }]}
                        >
                            <InputComponents value={stateProductDetail.type} onChange={handleOnchangeDetail} name="type" />
                        </Form.Item>

                        <Form.Item
                            label="Count InStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input yor Count InStock' }]}
                        >
                            <InputComponents value={stateProductDetail.countInStock} onChange={handleOnchangeDetail} name="countInStock" />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input yor Price' }]}
                        >
                            <InputComponents value={stateProductDetail.price} onChange={handleOnchangeDetail} name="price" />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input yor Rating' }]}
                        >
                            <InputComponents value={stateProductDetail.rating} onChange={handleOnchangeDetail} name="rating" />
                        </Form.Item>

                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input yor discount' }]}
                        >
                            <InputComponents value={stateProductDetail.discount} onChange={handleOnchangeDetail} name="discount" />
                        </Form.Item>

                        {/* <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input yor Description' }]}
                        >
                            <InputComponents value={stateProductDetail.description} onChange={handleOnchangeDetail} name="description" />
                        </Form.Item> */}

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your Description' }]}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                data={stateProductDetail.description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setStateProductDetail(prevState => ({
                                        ...prevState,
                                        description: data
                                    }));
                                }}
                                
                            />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input yor Image' }]}
                        >
                            {/* này dùng để xử lý --hình ảnh-- */}
                            {/* maxCount={1}: dùng để hiển thị 1 hình ảnh lên thôi */}
                            <WrapperUploadFile fileList={stateProductDetail.image ? [{ uid: '-1', url: stateProduct.image }] : []} onChange={handleOnchangeAvatarDetail} maxCount={1}>
                                <Button>Select File</Button>

                                {/* mình sec check nếu nó có --avatar-- thì ta sẽ hiển thị ra */}
                                {stateProductDetail?.image && (
                                    <img src={stateProductDetail?.image} style={{
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

            <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
                <Loading isPending={isPendingDeleted}>
                    <div>Bạn có chắc muốn xóa sản phầm này hay không</div>
                </Loading>
            </ModalComponent>

        </div>
    )
}

export default AdminProduct
