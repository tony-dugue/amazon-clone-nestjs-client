import React, {useEffect} from 'react'
import { Navigate } from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks/redux/hook";
import {verifyJwt} from "../authSlice";

const PrivateRoute = ({ page }: { page: JSX.Element }) => {

  const dispatch = useAppDispatch();

  const { isSuccess, isAuthenticated, jwt } = useAppSelector( (state) => state.auth);

  useEffect(() => {
    if (!jwt || !jwt?.token) return;

    dispatch(verifyJwt(jwt.token))

  }, [jwt, isSuccess]);

  return isAuthenticated ? page : <Navigate replace to='signin' />

}

export default PrivateRoute
