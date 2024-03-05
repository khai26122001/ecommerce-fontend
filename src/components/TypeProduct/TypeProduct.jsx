import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// nơi để show ra các trang
// TypeProduct = ({name}): nhận biến name từ phía HomePage.jsx
const TypeProduct = ({ name }) => {
    const navigate = useNavigate()
    const [hovered, setHovered] = useState(false);
    // tạo ra cái hàm để nhận type
    const handleNavigateType = (type) => {
        // normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_'): dùng để bỏ đi cái tiếng việt khi kik vào --type--
        // {state: type}: nhận cái --type-- tiếng việt để tìm kiếm --type--
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
    }
    

    return (
        // in tất cả thành phần trong --name-- ra
        <div style={{
            fontSize: 15,
            padding: '10px 10px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'color 0.3s ease-in-out'
        }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)} onClick={() => handleNavigateType(name)}>
            <span style={{ color: hovered ? '#c48c46' : 'black', transition: 'color 0.01s #c48c46' }}>{name}</span>
            {hovered && (
                <div style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#c48c46',
                    animation: 'run 0.1s linear forwards'
                }}></div>
            )}
        </div>
    )
}

export default TypeProduct