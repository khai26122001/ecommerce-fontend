import React, { useEffect, useState } from "react";
import ProductDetailsComponents from "../../components/ProductDetailsComponents/ProductDetailsComponents";
import { useNavigate, useParams } from "react-router-dom";

// link tới trang --OrderService--
import * as CommentService from '../../services/CommentService'
// link tới trang dùng để lấy dữ liệu dưới backend lên
import { useMutationHooks } from '../../hooks/useMutationHooks'
import { useSelector } from "react-redux";
import { Image, List } from "antd";
import { WrapperInput, WrapperLabel } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loadingComponents/Loading";

const ProductDetailsPage = () => {
    // sẽ dùng cái thằng này để lấy ra --id của product-- này
    const { id } = useParams()
    // console.log('parasm-id', id)
    // lấy ra cái thằng user ra để bắt đầu thanh toán
    const user = useSelector((state) => state.user)
    // console.log('usercomment', user)

    const [comment, setComment] = useState('')

    // chuyển trang
    const navigate = useNavigate()

    console.log('thong tin', user?.name, user?.id, id, user?.name, user?.avatar)

    const handleOnchangeComment = (value) => {
        // dùng để chuyền dữ liệu mới từ thanh input vào --set-- lại
        setComment(value)
    }

    // bắt đầu làm dữ liệu xuống backend để --update--
    const mutationAddComment = useMutationHooks(
        (data) => {
            const { ...rests } = data;
            const res = CommentService.createComment({ ...rests });
            return res;
        },
        {
            onSuccess: () => {
                setComment('');
            },
            onError: () => {
                // Xử lý lỗi khi thêm comment không thành công
            }
        }
    );


    // bắt đầu chuyển sang trang xác nhận mua hàng và thanh toán ------------------------
    const handleAddComment = () => {
        mutationAddComment.mutate(
            {
                name: user?.name,
                id_user: user?.id,
                id_product: id,
                user_comments: comment,
                image_comments: user?.avatar,
            }
        )
        // Xóa dữ liệu trên thanh input
        setComment('');
    }


    // hàm dùng để loard dữ liệu lên trên client phía admin
    const getAllComment = async (limitTest) => {
        const id_product = limitTest?.queryKey && limitTest?.queryKey[1]
        // console.log('id_user111', id_user)
        // console.log('id_product111', id_product)
        const res = await CommentService.getAllComment({ id_product })
        // console.log('res', res)
        return res

    }

    // dùng để loard dữ liệu lên trên client phía admin
    const queryComment = useQuery({ queryKey: ['comment', id], queryFn: getAllComment })
    const { data: dataComment } = queryComment
    // lúc này đã có dữ liệu thông qua --data: users--
    console.log('data comment', queryComment)


    // Lấy dữ liệu comments từ phản hồi (response)
    const commentsData = dataComment?.data || [];


    useEffect(() => {
        if (mutationAddComment.isSuccess) {
            window.location.reload();
        }
    }, [mutationAddComment.isSuccess]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const formattedMinute = minute < 10 ? '0' + minute : minute;
        const formattedDate = `${formattedHour}:${formattedMinute} ${ampm} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    }

    return (
        <div style={{ height: '100%', width: '100%', background: '#efefef' }}>
            {/* <div style={{ padding: '0 120px', background: '#efefef', height: '1000px' }}> */}
            <div style={{ width: '1270px', height: '100%', margin: '0 auto' }}>
                <h6 style={{ color: "#efefef" }}>-</h6>

                <h3 ><span onClick={() => navigate('/')} style={{ cursor: 'pointer', fontWeight: 'bold' }}>Trang chủ</span> - Chi tiết sản phẩm</h3>
                {/* sau khi có --id-- ta sẽ chuyền vào */}
                <ProductDetailsComponents idProduct={id} />
            </div>
            <div>
                {/* <Image
                width={200}
                src={user?.avatar}
                alt="placeholder"
            />
            <br />
            id của user: {user?.id}
            <br />
            id của sản phẩm: {id}
            <br />
            tên: {user?.name}

            {user?.name} */}

                {/* <CommentList comments={dataComment} /> */}





                {/* Hiển thị danh sách comment */}
                <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginTop: "50px", backgroundColor: "#ffff" }}>
                    <h3 style={{ marginBottom: '20px', color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '10px', textAlign: "center" }}>Danh sách comment</h3>
                    <ul style={{ listStyleType: 'none', padding: '0' }}>
                        {commentsData.map((comment, index) => (


                            <li key={comment?.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                                    <img src={comment?.image_comments} alt="avatar" style={{
                                        height: '35px',
                                        width: '35px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginRight: '10px',
                                        marginTop: '-25px',
                                    }} />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <p style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', marginRight: '10px' }}>{comment.name}</p>
                                            <p style={{ marginBottom: '5px' }}>{formatDate(comment.createdAt)}</p>
                                        </div>
                                        <p style={{ fontSize: '17px', color: '#555' }}>{comment.user_comments}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <WrapperInput>
                    {/* nút button */}
                    <ButtonComponents
                        // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignIn--
                        onClick={handleAddComment}
                        // bordered={false}
                        size={40}
                        styleButon={{
                            height: '30px',
                            width: '10%',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Comment'}
                        styleTextButon={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700px' }}
                    ></ButtonComponents>
                    {/* nơi nhập vào email */}
                    {/* <WrapperLabel htmlFor="comment">comment</WrapperLabel> */}
                    {/* đặt id cho --input-- để tý lấy dữ liệu thông qua id */}
                    <InputForm style={{ width: '100%' }} id="name" value={comment} onChange={handleOnchangeComment} />


                </WrapperInput>



            </div>
        </div>
    )
}

export default ProductDetailsPage