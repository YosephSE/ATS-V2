"use client"
import React, { useEffect } from 'react'
import { useAppDispatch } from '@/redux/Hooks'
import { resetSuccess as resetUser, fetchuser as userLogin } from '@/redux/slices/UserSlice'
import { fetchuser as adminLogin, resetSuccess as resetAdmin } from '@/redux/slices/AdminSlice'
import { usePathname, useRouter } from 'next/navigation'


const LoginChecker = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
      const userToken = localStorage.getItem('userToken');
      const adminToken = localStorage.getItem('adminToken');
      const fetchUser = async()=>{
        if (userToken) {
            await dispatch(userLogin({ token: userToken })); 
            dispatch(resetUser())
        }
        if (adminToken) {
            await dispatch(adminLogin({ token: adminToken })); 
            dispatch(resetAdmin())
            if (!pathname.startsWith('/admin') && !pathname.startsWith('/superadmin')) {
              router.push('/admin/alljobs')
            }
        }
      }

      fetchUser()
    }, [dispatch, pathname, router])
    return (
        <div>
            {children}
        </div>
    )
    }

export default LoginChecker
