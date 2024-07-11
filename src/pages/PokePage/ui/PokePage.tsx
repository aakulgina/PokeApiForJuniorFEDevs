import { useSelector } from 'react-redux'
import './PokePage.scss'
import './PokePage.mobile.scss';
import { pokemonDetailsSelector, savePokemonInfo } from 'src/entities/poke'
import { useLazyGetPokemonCardQuery } from 'src/shared/api'
import { useAppDispatch } from 'src/app/store'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Carousel, Flex, Skeleton } from 'antd'
import * as React from 'react'
import { saveErrorCode } from 'src/entities/global'
import { links } from 'src/shared/utils/global'
import { isNil } from 'lodash-es'
import Title from 'antd/es/typography/Title'
import Text from 'antd/es/typography/Text'
import { capitalize } from 'src/shared/utils/functions'
import { PlayCircleOutlined } from '@ant-design/icons'

export function PokePage() {
    const pokemon = useSelector(pokemonDetailsSelector)
    const [getPokemonCard, { isFetching }] = useLazyGetPokemonCardQuery()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { name: pokemonName } = useParams()

    const getCardRequest = React.useCallback(async (name: string) => {
        try {
            const response = await getPokemonCard(name).unwrap();
            dispatch(savePokemonInfo(response))
        } catch (error: unknown) {
            const code = (error as Record<string, string>).originalStatus
            dispatch(saveErrorCode(code))
            navigate(links.failure(code))
        }
    }, [dispatch, getPokemonCard, navigate])

    React.useEffect(() => {
        void getCardRequest(pokemonName as string)
    }, [pokemonName])

    if (isNil(pokemon)) {
        return null;
    }

    if (isFetching) {
        return <Skeleton />
    }

    const handlePlayCry = () => {
        const a = document.createElement('audio')
        a.src = pokemon.cries
        a.play()
    }

    return (
        <Flex vertical className='pokemon-card'>
            <Flex className='heading'>
                <Title className='pokemon-name'>{capitalize(pokemon.name)}</Title>
                <Button shape='circle' onClick={handlePlayCry} icon={<PlayCircleOutlined />} />
            </Flex>
            <Carousel className='main-carousel' arrows infinite>
                {
                    pokemon.sprites.filter(item => !isNil(item)).map((img) => (
                        <img className='pokemon-picture' src={img as string} />
                    ))
                }
            </Carousel>
            <Flex className='info'>
                <Text className='description'>
                    Hello, I'm {capitalize(pokemon.name)}!
                    My height is {pokemon.height} decimetres and my weight is {pokemon.weight} hectograms.
                    I'm able to do the following things: {pokemon.abilities.join(', ')}.
                    I know {pokemon.moves.length} different way(-s) to move!
                    I'm so strong that my enemy needs to have at least {pokemon.baseExp} of EXP to defeat me!
                    {pokemon.heldItems.length ? ` I have the following items with me: ${pokemon.heldItems.join(', ')}.` : ' And I\'m so cool that I don\'t need any items or weapons!'}
                </Text>
                <Card title="My Stats" className='stats'>
                    <div className="card-content">
                        {pokemon.stats.map((stat) => (
                            <>
                                <Text>{stat.name.replaceAll('-', ' ')}</Text>
                                <Text>{stat.base}</Text>
                            </>
                        ))}
                    </div>
                </Card>
            </Flex>
        </Flex>
    )
}
