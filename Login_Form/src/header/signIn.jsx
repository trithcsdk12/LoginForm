import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom'


const userList = [
    { name: "Nguyễn Văn A", email: "anv@gmail.com", password: "123" },
    { name: "Trần Thị B", email: "btt@gmail.com", password: "234" },
    { name: "Lê Văn C", email: "cvl@gmail.com", password: "345" },
    { name: "Phạm Thị D", email: "dtp@gmail.com", password: "456" },
    { name: "Hoàng Văn E", email: "evh@gmail.com", password: "567" },
    { name: "Đặng Thị F", email: "ftd@gmail.com", password: "678" },
    { name: "Bùi Văn G", email: "gvb@gmail.com", password: "789" },
    { name: "Ngô Thị H", email: "htn@gmail.com", password: "890" },
    { name: "Vũ Văn I", email: "ivv@gmail.com", password: "901" },
    { name: "Dương Thị J", email: "jtd@gmail.com", password: "1234" },
    { name: "Lý Văn K", email: "kvl@gmail.com", password: "2345" },
    { name: "Tô Thị L", email: "ltt@gmail.com", password: "3456" },
    { name: "Châu Văn M", email: "mvc@gmail.com", password: "4567" },
    { name: "Đoàn Thị N", email: "ntd@gmail.com", password: "5678" },
    { name: "Cao Văn O", email: "ovc@gmail.com", password: "6789" }
];

const userStorage = JSON.parse(localStorage.getItem("userRegister")) || [];
const updatedUsers = Array.isArray(userStorage) ? userStorage : [userStorage];


function SignIn({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleValidate = (event) => {
        event.preventDefault();

        const user =
            userList.find(user => user.email === email && user.password === password)
            ||
            updatedUsers.find(user => user.email === email && user.password === password);

        if (user) {
            const userData = { user };
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            alert("Đăng nhập thành công!");
            navigate("/");
        } else {
            alert("Sai email hoặc mật khẩu!");
        }
    };

    return (
        <>
            <form action="" className="position-absolute top-50 start-50 translate-middle" onSubmit={handleValidate}>
                <h1>Đăng nhập</h1>
                <div className='inputEmail my-3'>
                    <h3>Nhập email: </h3>
                    <input className='d-flex m-2' placeholder='Nhập email' type='email' id='email' onChange={e => {
                        setEmail(e.target.value);;
                    }} />
                </div>
                <div className='inputPassword my-3'>
                    <h3>Nhập mật khẩu:</h3>
                    <input className='d-flex m-2' type="password" id="password" onChange={e => { setPassword(e.target.value) }} />
                </div>
                <button className='d-flex m-2' type='submit'>Đăng nhập</button>
            </form>
        </>
    )
}

export default SignIn