import { useState } from "react";
import api from "../../Api";
import Address from 'react-daum-postcode';

const RegisterOwner = () => {
    // ✅ useState는 컴포넌트 최상단에서 선언
    const [formData, setFormData] = useState({
        company_name: "",
        company_address: "",
        owner_id: "",
        owner_pw: "",
        owner_name: "",
        owner_phone: "",
    });

    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState({ addressDetail: "", });

    const detailAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressDetail((prevAddressDetail) => ({
            ...prevAddressDetail,
            [name]: value
        }));
    }

    // ✅ input 값 변경 시 formData 업데이트
    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const completeHandler = (data) => {
        const { address, zonecode } = data;
        setAddress(address)
        setPostcode(zonecode)
        setIsPostcode(false)
    };



    const save = async () => {
        formData.company_address = postcode + " " + address + " " + addressDetail.addressDetail;
        try {
            const response = await api.post(
                `/company/register`,
                formData,
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error)
        }
    }


    const [isPostcode, setIsPostcode] = useState(false);


    return (
        <div className="register_owner" style={{ textAlign: "center" }}>
            <h1>서비스 가입 페이지</h1>
            <br></br>
            <h2>회사이름 </h2>
            <input type="text" name="company_name" value={formData.company_name} onChange={inputChange} />

            <h2>회사주소</h2>
            {/* 주소 찾기 버튼 */}
            <button
                onClick={() => setIsPostcode(true)}
                style={{ marginBottom: "10px", width: "300px", height: "40px" }}
            >
                주소 찾기
            </button>

            {/* 주소 검색창 보이게 하기 */}
            {isPostcode && (
                <Address
                    style={{
                        width: "400px",
                        height: "600px",
                        margin: "0 auto",
                    }}
                    onComplete={completeHandler}
                />
            )}
            <br></br>

            우편번호
            <input type="text" placeholder="우편번호를 입력해주세요" readOnly value={postcode} onChange={inputChange} />
            <br></br>
            <br></br>
            주소
            <input type="text" placeholder="주소를 입력해주세요" readOnly value={address} onChange={inputChange} />
            <br></br>
            <br></br>
            상세주소
            <input type="text" name="addressDetail" placeholder="상세주소를 입력해주세요" value={addressDetail.addressDetail} onChange={detailAddressChange} />

            <h2>아이디</h2>
            <input type="text" name="owner_id" value={formData.owner_id} onChange={inputChange} />

            <h2>비밀번호</h2>
            <input type="text" name="owner_pw" value={formData.owner_pw} onChange={inputChange} />

            <h2>대표자 이름</h2>
            <input type="text" name="owner_name" value={formData.owner_name} onChange={inputChange} />

            <h2>대표자 전화번호</h2>
            <input type="text" name="owner_phone" value={formData.owner_phone} onChange={inputChange} />
            <br></br>
            <br></br>
            <button style={{ width: "300px", height: "50px" }} onClick={save}>가입</button>
        </div>
    );
};

export default RegisterOwner;
