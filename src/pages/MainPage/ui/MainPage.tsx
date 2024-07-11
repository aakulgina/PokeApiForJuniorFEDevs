import { useSelector } from 'react-redux'
import './MainPage.scss'
import { pokemonsListSelector, saveList, savePagination } from 'src/entities/pokeList'
import { useLazyGetPokemonListQuery } from 'src/shared/api'
import * as React from 'react'
import { useAppDispatch } from 'src/app/store'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Flex, List, Pagination, Skeleton } from 'antd'
import { links } from 'src/shared/utils/global'
import { saveErrorCode } from 'src/entities/global'
import Text from 'antd/es/typography/Text'
import './MainPage.scss'
import { capitalize, pickExistingAsNumber } from 'src/shared/utils/functions'

export function MainPage() {
    const { page, pageSize, data: { count, results } } = useSelector(pokemonsListSelector)
    const [getPokemonsList, { isFetching }] = useLazyGetPokemonListQuery()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { number: pageFromUrl } = useParams()

    const doListRequest = React.useCallback(async (pageSize: number, pageNumber: string | number) => {
        try {
            const response = await getPokemonsList({ pageSize, pageNumber }).unwrap();
            
            if (response.count &&  (Number(pageNumber) * pageSize) - response.count > 10) {
                dispatch(saveErrorCode(404))
                navigate(links.failure(404))
            } else {
                dispatch(saveList(response))
            }
        } catch (error: unknown) {
            const code = (error as Record<string, string>).originalStatus ?? 500
            dispatch(saveErrorCode(code))
            navigate(links.failure(code))
        }
    }, [dispatch, getPokemonsList, navigate])

    const handlePaginationChange = React.useCallback((page: number, pageSize: number) => {
        dispatch(savePagination({ page, pageSize }))

        if (pageFromUrl) {
            navigate(links.list(page.toString()))
        } else {
            doListRequest(pageSize, page)
        }
    }, [dispatch, doListRequest, navigate, pageFromUrl])

    React.useEffect(() => {
        const page = pickExistingAsNumber(pageFromUrl, 1) 
        void doListRequest(pageSize, page)
    }, [pageFromUrl])

    if (isFetching) {
        return <Skeleton />
    }

    return (
        <Flex vertical justify='space-between' className='page__list'>
            { results && results.length && (
                <>
                    <List
                        className='list__container'
                        bordered
                        dataSource={results}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
                                <Link className='list__item' to={links.card(item.name)}>
                                    <Text>{capitalize(item.name)}</Text>
                                </Link>
                            </List.Item>
                        )}
                    />
                    <Pagination
                        className='list__pagination'
                        current={pickExistingAsNumber(pageFromUrl, page)}
                        pageSize={pageSize}
                        pageSizeOptions={[10, 20]}
                        responsive
                        showSizeChanger
                        simple={window.matchMedia('(max-width: 786px)').matches}
                        showTotal={(total) => `Total ${total} pokemons`}
                        total={count ?? 0}
                        onChange={handlePaginationChange}
                    />
                </>
            ) }
        </Flex>
    )
}
