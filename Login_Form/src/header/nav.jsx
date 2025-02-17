import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const backgroundColorList = [
    {
        bg_color: 'Red',
        text_color: 'Black'
    },
    {
        bg_color: 'Yellow',
        text_color: 'Black'

    },
    {
        bg_color: 'Pink',
        text_color: 'White'
    },
    {
        bg_color: 'Black',
        text_color: 'White'
    },
    {
        bg_color: 'Blue',
        text_color: 'White'
    }
]

function ChangeBackgroundColor({ color, setColor, setTxColor, txColor }) {
    return (
        <li><a className="dropdown-item" href="#" onClick={() => {
            setColor(color);
            setTxColor(txColor);
        }}>{color}</a></li>
    )
}

function Nav({ user, setUser }) {

    const [users, setUsers] = useState([])
    const [color, setColor] = useState('Blue');
    const [txColor, setTxColor] = useState('White');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://fakestoreapi.com/users')
            .then(res => res.json())
            .then(users => setUsers(users))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: color }}>
                <div className="container-fluid">
                    <Link to="/"><img src="src/assets/logo_nav.webp" alt="" className=' mx-5' style={{ width: '100px', height: '100px' }} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/" style={{ color: txColor }}>Trang chủ</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="colorDropdown" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false" style={{ color: txColor }}>
                                    Đổi màu nền thanh Nav
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="colorDropdown" >
                                    {backgroundColorList.map((colorObj, index) => (
                                        <ChangeBackgroundColor key={index}
                                            color={colorObj.bg_color}
                                            txColor={colorObj.text_color}
                                            setColor={setColor}
                                            setTxColor={setTxColor} />
                                    ))}
                                </ul>
                            </li>
                            {Boolean(user) ? <><span className="nav-link" style={{ color: txColor }}>
                                Xin chào, {user.user.name}!
                            </span>
                                <button onClick={handleLogout}>
                                    Đăng xuất
                                </button>
                            </>
                                :
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="accountDropdown" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false" style={{ color: txColor }}>
                                        Tài khoản
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                                        <li><Link className="dropdown-item" to="/signIn">
                                            Đăng nhập
                                        </Link></li>
                                        <li><Link className="dropdown-item" to="/signUp">Đăng ký</Link></li>
                                    </ul>
                                </li>}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false" style={{ color: txColor }}>
                                    Danh sách user
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="userDropdown" >
                                    {users.map(user => (
                                        <li key={user.id}>{user.email + ' Username: ' + user.username}<hr className="dropdown-divider" /></li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/product" style={{ color: txColor }}>Sản phẩm</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/addToCart" style={{ color: txColor }}>Giỏ hàng</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit" style={{ color: txColor }}>Tìm kiếm</button>
                        </form>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Nav