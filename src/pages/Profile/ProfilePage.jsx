import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents'
import { useDispatch, useSelector } from 'react-redux'

// import thu viện userService vào
import * as UserService from '../../services/UserService'
import Loading from '../../components/loadingComponents/Loading'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'

// import thư viện để xử lý hình ảnh
import { UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { getBase64 } from '../../utils'

const ProfilePage = () => {
  // dùng để xuất dữ liệu đã được xử lý từ --UserSlide.js-- ra
  const user = useSelector((state) => state.user)

  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[phone, setPhone] = useState('')
  const[address, setAddress] = useState('')
  const[avatar, setAvatar] = useState('')

  // ------------------------------------------------
  // bắt đầu làm lấy dữ liệu dưới backend lên
  // truyền 
  const mutation = useMutationHooks(
    // --data =>-- nhận cái dữ liệu email,password từ client từ hàm --handleSignIn--
    data => {
      // lấy id ra
      // rồi hiển thị tất cả cái còn lại ra
      const { id, access_token, ...rests } = data
      UserService.updateUser(id, rests, access_token)
    }
  )
      
  // dùng để lấy thông tin của user
  const dispatch = useDispatch()

  // sau khi --login-- thì đã có dữ liệu 
  // --data-- nhận từ --mutation-- lúc này là --access_token--
  const { data, isPending, isSuccess, isError } = mutation
  console.log('mutation', mutation)
  // ------------------------------------------------


  // khi thằng --user-- nó thay đổi thì ta sẽ bắt đầu --setUser--
  useEffect(() => {
      setName(user?.name)
      setEmail(user?.email)
      setPhone(user?.phone)
      setAddress(user?.address)
      setAvatar(user?.avatar)
  },[user])

  // khi thằng --isSuccess, isError-- nó thay đổi thì ta sẽ bắt đầu
  // hàm này dùng để xử lý việc call API bên phía backend
  useEffect(() => {
    // nếu isSuccess===true
    if(isSuccess) {
        message.success()
        handleGetDetailsUser(user?.id, user?.access_token)
    } else if(isError) {
        message.error()
    }
  }, [isSuccess, isError])

  // tạo ra 1 cái function để chuyền vào --id và token-- nhằm --call API đến server--
  // lúc này ta sẽ nhận được --id và access_token--
  const handleGetDetailsUser = async (id, token) => {
    // sau khi truyền --id và access_token-- vào thì ta lấy được thông tin của --user-- 
    // gồm có --_id, mail, password, isAdmin--
    const res = await UserService.getDetailsUser(id, token)
    console.log('res', res)
    // ta sẽ chuyền thông tin --_id, mail, password, isAdmin-- và --access_token-- cho updateUser
    // để lấy ra sử dụng bên phía --client-- thì phải
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }


  const handleOnchangeName = (value) => {
    // dùng để chuyền dữ liệu mới từ thanh input vào --set-- lại
    setName(value)
  }

  const handleOnchangeEmail = (value) => {
    // dùng để chuyền dữ liệu mới từ thanh input vào --set-- lại
    setEmail(value)
  }

  const handleOnchangePhone = (value) => {
    // dùng để chuyền dữ liệu mới từ thanh input vào --set-- lại
    setPhone(value)
  }

  const handleOnchangeAddress = (value) => {
    // dùng để chuyền dữ liệu mới từ thanh input vào --set-- lại
    setAddress(value)
  }

  const handleOnchangeAvatar = async ({fileList}) => {
    // nó sẽ là 1 cái --array--
    const file = fileList[0]
    // giờ ta phải chuyển sang dạng --base64-- để lưu lên --mongo--
    // ta sẽ check cái chuyển đổi sang --base64-- bên phía --util--
    if(!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    // sau khi đã chuyển đổi thì ta sẽ chuyển dữ liệu ảnh --base64-- vào --setAvatar--
    setAvatar(file.preview)
  }

  const handleUpdate = () => {
    mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
    // console.log('update: ', email, name, phone, address, avatar)
  }

  return (
    <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isPending={isPending}>
        <WrapperContentProfile>

          <WrapperInput>
            {/* nơi nhập vào email */}
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            {/* đặt id cho --input-- để tý lấy dữ liệu thông qua id */}
            <InputForm style={{ width: '300px' }} id="name" value={name} onChange={handleOnchangeName}/>  

            {/* nút button */}
            <ButtonComponents 
                // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignIn--
                onClick={ handleUpdate }
                // bordered={false}
                size={40}
                styleButon={{
                    height: '30px',
                    width: 'fit-content',
                    borderRadius: '4px',
                    padding: '2px 6px 6px'
                }}
                textButton={'Cập nhật'}
                styleTextButon={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700px' }}
            ></ButtonComponents>
          </WrapperInput>

          <WrapperInput>
            {/* nơi nhập vào email */}
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            {/* đặt id cho --input-- để tý lấy dữ liệu thông qua id */}
            <InputForm style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail}/>  

            {/* nút button */}
            <ButtonComponents 
                // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignIn--
                onClick={ handleUpdate }
                // bordered={false}
                size={40}
                styleButon={{
                    height: '30px',
                    width: 'fit-content',
                    borderRadius: '4px',
                    padding: '2px 6px 6px'
                }}
                textButton={'Cập nhật'}
                styleTextButon={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700px' }}
            ></ButtonComponents>
          </WrapperInput>

          <WrapperInput>
            {/* nơi nhập vào email */}
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            {/* đặt id cho --input-- để tý lấy dữ liệu thông qua id */}
            <InputForm style={{ width: '300px' }} id="phone" value={phone} onChange={handleOnchangePhone}/>  

            {/* nút button */}
            <ButtonComponents 
                // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignIn--
                onClick={ handleUpdate }
                // bordered={false}
                size={40}
                styleButon={{
                    height: '30px',
                    width: 'fit-content',
                    borderRadius: '4px',
                    padding: '2px 6px 6px'
                }}
                textButton={'Cập nhật'}
                styleTextButon={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700px' }}
            ></ButtonComponents>
          </WrapperInput>

          <WrapperInput>
            {/* nơi nhập vào email */}
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            {/* đặt id cho --input-- để tý lấy dữ liệu thông qua id */}
            <InputForm style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress}/>  

            {/* nút button */}
            <ButtonComponents 
                // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignIn--
                onClick={ handleUpdate }
                // bordered={false}
                size={40}
                styleButon={{
                    height: '30px',
                    width: 'fit-content',
                    borderRadius: '4px',
                    padding: '2px 6px 6px'
                }}
                textButton={'Cập nhật'}
                styleTextButon={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700px' }}
            ></ButtonComponents>
          </WrapperInput>

          <WrapperInput>
            {/* nơi nhập vào email */}
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>

            {/* này dùng để xử lý --hình ảnh-- */}
            {/* maxCount={1}: dùng để hiển thị 1 hình ảnh lên thôi */}
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </WrapperUploadFile>

            {/* mình sec check nếu nó có --avatar-- thì ta sẽ hiển thị ra */}
            {avatar && (
              <img src={avatar} style={{
                height: '60px',
                width: '60px',
                borderRadius: '50%',
                objectFit: 'cover'
              }} alt="avatar"/>
            )}

            {/* nút button */}
            <ButtonComponents 
                // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignIn--
                onClick={ handleUpdate }
                // bordered={false}
                size={40}
                styleButon={{
                    height: '30px',
                    width: 'fit-content',
                    borderRadius: '4px',
                    padding: '2px 6px 6px'
                }}
                textButton={'Cập nhật'}
                styleTextButon={{ color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700px' }}
            ></ButtonComponents>
          </WrapperInput>

        </WrapperContentProfile>
      </Loading>
    </div>
  )
}

export default ProfilePage
