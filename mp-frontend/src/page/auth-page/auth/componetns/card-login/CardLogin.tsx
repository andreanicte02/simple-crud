import './cardLogin.style.css'
import Input from "../../../../../_util/components/Input/Input.tsx";
import Button from "../../../../../_util/components/Button/Button.tsx";

export const CardLogin = () => {
    return (
        <div className={'card'}>
            <h2>Bienvenido</h2>

            <div className={'card-input'}>
                <label>
                    username
                </label>
                <Input/>
            </div>


            <div className={'card-input'}>
                <label>
                    password
                </label>
                <Input type={'password'}/>
            </div>
            <Button>
                Login
            </Button>


        </div>
    );
};