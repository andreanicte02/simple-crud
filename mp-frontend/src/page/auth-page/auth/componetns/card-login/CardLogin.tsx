import './cardLogin.style.css'
import Input from "../../../../../_util/components/Input/Input.tsx";
import Button from "../../../../../_util/components/Button/Button.tsx";
import type {AuthRequest} from "../../../../../store/service/model/auth.model.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, type SubmitHandler} from 'react-hook-form';
import {useAuthMutation} from "../../../../../store/service/service/auth.service.ts";
import {yupAuth} from "../../core/_models.ts";
import {getRTKError} from "../../../../../_util/functions.ts";
import Alert from "../../../../../_util/components/Alert/Alert.tsx";

export const CardLogin = () => {
    const formLogin = useForm({
        resolver: yupResolver(yupAuth)
    });

    const [auth, authStatus] = useAuthMutation();

    const onSubmit: SubmitHandler<AuthRequest> = (data) => {
        auth({
            username: data.username,
            password_hash: data.password_hash
        });
    };

    return (
        <form onSubmit={formLogin.handleSubmit(onSubmit)} className={'card'}>

                <h2>Bienvenido</h2>

                <div className={'card-input'}>
                    <label>username</label>
                    <Input
                        {...formLogin.register("username")}
                    />
                </div>

                <div className={'card-input'}>
                    <label>password</label>
                    <Input
                        type={'password'}
                        {...formLogin.register("password_hash")}
                    />
                </div>

                {authStatus.isError && (
                    <Alert message={getRTKError(authStatus.error)} type={'danger'}></Alert>
                )}


                <Button type="submit" disabled={!formLogin.formState.isValid || authStatus.isLoading}>
                    {authStatus.isLoading ? "Cargando..." : "Login"}
                </Button>

        </form>
    )
        ;
};