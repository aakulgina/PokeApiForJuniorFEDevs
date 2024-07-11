import { Link, Outlet } from 'react-router-dom'
import './RootLayout.scss'
import './RootLayout.mobile.scss'
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout'
import Text from 'antd/es/typography/Text'
import { Flex, Skeleton } from 'antd'
import * as React from 'react'
import { links } from 'src/shared/utils/global'
import { useSelector } from 'react-redux'
import { errorCodeSelector, saveErrorCode } from 'src/entities/global'
import { useAppDispatch } from 'src/app/store'

export function RootLayout() {
    const errorCode = useSelector(errorCodeSelector)
    const dispatch = useAppDispatch()

    const handleResetErrorState = React.useCallback(() => {
        if (errorCode) {
            dispatch(saveErrorCode(null))
        }
    }, [errorCode, dispatch])

    return (
        <Layout className='app'>
            <Header>
                <Link onClick={handleResetErrorState} to={links.base} reloadDocument>
                    <Text className='header__text'>Almighty Pokemon Database</Text>
                </Link>
            </Header>
            <Content className='main__root'>
                <React.Suspense fallback={<Skeleton />} >
                    <Outlet />
                </React.Suspense>
            </Content>
            <Footer className='footer'>
                <Flex justify='space-between'>
                    <Text>Know your Pokemon better, than yourself</Text>
                    <Text>&copy; 2024 geek_cactus</Text>
                </Flex>
            </Footer>
        </Layout>
    )
}
