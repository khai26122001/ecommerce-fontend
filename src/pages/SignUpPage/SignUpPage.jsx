import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import { Image } from "antd";
import imageLogo from '../../assets/images/logo-login.png'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

// link tới trang --UserService--
import * as UserService from '../../services/UserService'

// link tới trang dùng để lấy dữ liệu dưới backend lên
import { useMutationHooks } from '../../hooks/useMutationHooks'
// thông báo lỗi
import Loading from '../../components/loadingComponents/Loading';

// link tới trang làm thông báo cho ta biết đã đăng ký thành công
import * as message from '../../components/Message/Message'


const SignUpPage = () => {

    // tạo ra các --biến và set-- nhằm để truyền dữ liệu vào --thông qua set-- và lấy dữ liệu dùng --thông qua tên còn lại--
    // bằng cách sử dụng thư viện --useState()-- của --react--
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPaswrod] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // này dúng để khi mình link tới trang mình mong muốn
    const navigate = useNavigate()


    // ------------------------------------------------
    // bắt đầu làm lấy dữ liệu dưới backend lên
    // truyền 
    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    )
    const { data, isPending, isError, isSuccess } = mutation

    // sử dụng để gọi tới hàm và in ra thông báo ĐK thành công
    useEffect(() => {
        // nếu isSuccess===true
        if(isSuccess) {
            // thông báo thành công
            message.success()
            // sau đó đá sang trang sign-in
            handleNavigateSignIn()
        }
        else if(isError) {
            message.error()
        }
    }, [isError, isSuccess])


    // console.log('mutation', mutation)
    // ------------------------------------------------



    // tạo hàm này ra dùng để truyền dữ liệu vào --setEmail-- thông qua thanh --input-- phía dưới
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    // tạo hàm này ra dùng để truyền dữ liệu vào --setPaswrod-- thông qua thanh --input-- phía dưới
    const handleOnchangePaswrod = (value) => {
        setPaswrod(value)
    }
    // tạo hàm này ra dùng để truyền dữ liệu vào --setConfirmPassword-- thông qua thanh --input-- phía dưới
    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    // tạo ra 1 cái function để khi kik vào nó link tới trang --đăng ký--
    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }

    // tạo hàm này dùng để in ra thông tin của --email, password, confirmPassword--
    const handleSignUp = () => {
        mutation.mutate({
            email, 
            password,
            confirmPassword
        })
        // console.log('sign-up', email, password, confirmPassword)
    }

    

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height:'445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin Chào</h1>
                    <p style={{ marginBottom: '20px', fontSize: '13px' }}>Đăng Ký Tài Khoảng</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail}/>

                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}
                        >{
                            isShowPassword
                             ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled/>
                            )
                        }
                        </span>
                        <InputForm style={{ marginBottom: '10px' }} placeholder="Password" type={isShowPassword ? "text" : "password"}
                        value={password} onChange={handleOnchangePaswrod}/>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}
                        >{
                            isShowConfirmPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled/>
                            )
                        }
                        </span>
                        <InputForm placeholder="Comfirm Password" type={isShowConfirmPassword ? "text" : "password"}
                        value={confirmPassword} onChange={handleOnchangeConfirmPassword}/>
                    </div>

                    {/* thông báo lỗi khi ko đăng nhập đx */}
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    
                    {/* cái trang khung để thông báo lỗi */}
                    <Loading isPending={isPending}>
                        <ButtonComponents 
                            // khi nhập đủ thông tin --email và password và confirmPassword-- thì ta mới cho bấm --đăng nhập--
                            disabled={!email || !password || !confirmPassword}
                            // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignUp--
                            onClick={ handleSignUp }
                            // bordered={false}
                            size={40}
                            styleButon={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                boderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textButton={'Đăng Ký'}
                            styleTextButon={{ color: '#fff', fontSize: '15px', fontWeight: '700px' }}
                        ></ButtonComponents>
                    </Loading>
                    <p style={{ marginTop: '20px' }}><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>

                    {/* 
                        khi kik vào cái --Tạo tài khoảng-- thì sẽ thông qua --onClick-- từ cái hàm --handleNavigateSignup--
                        mình tạo ở trên để link tới trang --đăng ký--
                    */}
                    <p>Bạn đã có tài khoảng <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px"/>
                    <h4>Mua sắm tại LTDD</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignUpPage